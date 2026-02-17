import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { ALL_COMPLAINTS, MOCK_COMPLAINTS, FACULTY_COMPLAINTS, HOD_COMPLAINTS, OMBUDSMAN_COMPLAINTS } from '@/lib/mock-data';
import { StatusBadge, UrgencyBadge, AIRiskMeter } from '@/components/StatusBadges';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft, Clock, User, Building2, Calendar, FileText, ThumbsUp, ThumbsDown,
  Users, AlertTriangle, Shield, MessageSquare, CheckCircle, XCircle, Send, Eye,
  ArrowUpRight, Zap, Lightbulb, Loader2,
} from 'lucide-react';
import { Complaint } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  // Find complaint from all sources
  const complaint = ALL_COMPLAINTS.find(c => c.id === id);
  const [voted, setVoted] = useState<'support' | 'reject' | null>(null);
  const [facultyResponse, setFacultyResponse] = useState('');
  const [committeeDecision, setCommitteeDecision] = useState('');
  const [committeeNotes, setCommitteeNotes] = useState('');
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [localComplaint, setLocalComplaint] = useState<Complaint | null>(complaint || null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  if (!complaint || !localComplaint) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Complaint Not Found</h2>
        <p className="text-muted-foreground mb-4">The complaint you're looking for doesn't exist.</p>
        <button onClick={() => navigate(-1)} className="gradient-primary text-primary-foreground px-6 py-2 rounded-lg font-medium">
          Go Back
        </button>
      </div>
    );
  }

  const totalVotes = localComplaint.supportVotes + localComplaint.rejectVotes;
  const supportPercent = totalVotes > 0 ? (localComplaint.supportVotes / totalVotes) * 100 : 0;
  const rejectPercent = totalVotes > 0 ? (localComplaint.rejectVotes / totalVotes) * 100 : 0;
  const participation = totalVotes > 0 ? ((totalVotes / localComplaint.totalEligibleVoters) * 100).toFixed(1) : '0';

  const handleVote = (type: 'support' | 'reject') => {
    setVoted(type);
    setLocalComplaint(prev => prev ? {
      ...prev,
      supportVotes: type === 'support' ? prev.supportVotes + 1 : prev.supportVotes,
      rejectVotes: type === 'reject' ? prev.rejectVotes + 1 : prev.rejectVotes,
    } : prev);
    toast({ title: `Vote Recorded`, description: `You voted to ${type} this complaint.` });
  };

  const handleFacultyResponse = () => {
    if (!facultyResponse.trim()) return;
    setLocalComplaint(prev => prev ? {
      ...prev,
      facultyResponse,
      timeline: [...prev.timeline, {
        id: `t${prev.timeline.length + 1}`,
        action: 'Faculty Response Submitted',
        actor: user?.name || 'Faculty',
        timestamp: new Date().toISOString(),
        note: facultyResponse,
      }],
    } : prev);
    setShowResponseForm(false);
    toast({ title: 'Response Submitted', description: 'Your response has been recorded.' });
  };

  const handleCommitteeDecision = (decision: string) => {
    setLocalComplaint(prev => prev ? {
      ...prev,
      committeeDecision: decision,
      committeeNotes,
      status: decision === 'Escalate to Principal' ? 'Escalated' : decision === 'Case Dismissed' ? 'Dismissed' : prev.status,
      timeline: [...prev.timeline, {
        id: `t${prev.timeline.length + 1}`,
        action: `Committee Decision: ${decision}`,
        actor: user?.name || 'Committee',
        timestamp: new Date().toISOString(),
        note: committeeNotes,
      }],
    } : prev);
    toast({ title: 'Decision Recorded', description: `Decision: ${decision}` });
  };

  const getTimeRemaining = (deadline?: string) => {
    if (!deadline) return 'N/A';
    const diff = new Date(deadline).getTime() - Date.now();
    if (diff <= 0) return 'Expired';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h remaining`;
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'committee' || user?.role === 'hod';
  const isFaculty = user?.role === 'faculty' || user?.role === 'hod';
  const isCommittee = user?.role === 'committee' || user?.role === 'admin';
  const isStudent = user?.role === 'student';



  const getEscalationStatus = () => {
    if (!localComplaint.escalationDeadline) return null;
    const deadline = new Date(localComplaint.escalationDeadline).getTime();
    const now = Date.now();
    if (localComplaint.autoEscalated) return { label: 'Auto-Escalated', color: 'text-destructive', bg: 'bg-destructive/10 border-destructive/30' };
    const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 0) return { label: 'Overdue – Escalation Pending', color: 'text-destructive', bg: 'bg-destructive/10 border-destructive/30' };
    if (daysLeft <= 2) return { label: `${daysLeft}d until auto-escalation`, color: 'text-warning', bg: 'bg-warning/10 border-warning/30' };
    return { label: `${daysLeft}d until auto-escalation`, color: 'text-muted-foreground', bg: 'bg-muted/30 border-border' };
  };

  const fetchRecommendations = async () => {
    setLoadingRecommendations(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-autocorrect', {
        body: { text: `Title: ${localComplaint.title}\nCategory: ${localComplaint.category}\nUrgency: ${localComplaint.urgency}\nDescription: ${localComplaint.description}`, type: 'recommend' },
      });
      if (error) throw error;
      const parsed = JSON.parse(data.result);
      setLocalComplaint(prev => prev ? { ...prev, aiRecommendations: parsed } : prev);
    } catch {
      // fallback
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const escalation = getEscalationStatus();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to List
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-sm font-mono text-primary font-bold">{localComplaint.ticketId}</span>
              <StatusBadge status={localComplaint.status} />
              <UrgencyBadge urgency={localComplaint.urgency} />
              {localComplaint.anonymous && (
                <span className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full flex items-center gap-1">
                  <Eye className="h-3 w-3" /> Anonymous
                </span>
              )}
              <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                localComplaint.routingLevel === 'Director' ? 'bg-destructive/10 text-destructive' :
                localComplaint.routingLevel === 'Principal' ? 'bg-warning/10 text-warning' :
                'bg-primary/10 text-primary'
              }`}>
                <ArrowUpRight className="h-3 w-3" /> {localComplaint.routingLevel}
              </span>
            </div>
            <h1 className="text-xl font-bold font-display text-foreground">{localComplaint.title}</h1>
          </div>
          <AIRiskMeter score={localComplaint.aiRiskScore || 0} />
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            { icon: User, label: 'Submitted By', value: localComplaint.anonymous ? 'Anonymous' : localComplaint.studentName },
            { icon: Building2, label: 'Department', value: localComplaint.department },
            { icon: Calendar, label: 'Submitted', value: new Date(localComplaint.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
            { icon: FileText, label: 'Category', value: localComplaint.category },
          ].map((item, i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <item.icon className="h-3 w-3" /> {item.label}
              </div>
              <p className="text-sm font-medium text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Routing & Escalation Info */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
        className="glass-card rounded-xl p-6">
        <h3 className="font-semibold font-display text-foreground mb-4 flex items-center gap-2">
          <ArrowUpRight className="h-4 w-4 text-primary" /> Routing & Auto-Escalation
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Routing Level</p>
            <p className="text-sm font-bold text-foreground">{localComplaint.routingLevel}</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Escalation Deadline</p>
            <p className="text-sm font-medium text-foreground">
              {localComplaint.escalationDeadline ? new Date(localComplaint.escalationDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
            </p>
          </div>
          <div className={`rounded-lg p-3 border ${escalation?.bg || 'bg-muted/30 border-border'}`}>
            <p className="text-xs text-muted-foreground mb-1">Escalation Status</p>
            <p className={`text-sm font-bold flex items-center gap-1 ${escalation?.color || 'text-foreground'}`}>
              {localComplaint.autoEscalated && <Zap className="h-3.5 w-3.5" />}
              {escalation?.label || 'On Track'}
            </p>
          </div>
        </div>
        {localComplaint.autoEscalated && (
          <div className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-destructive flex-shrink-0" />
            <p className="text-xs text-foreground">This complaint was <strong>auto-escalated</strong> because it remained unresolved past the {localComplaint.routingLevel === 'HoD' ? '7-day' : '15-day'} deadline.</p>
          </div>
        )}
      </motion.div>

      {/* AI Recommendations (admin/committee/hod only) */}
      {isAdmin && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 }}
          className="glass-card rounded-xl p-6">
          <h3 className="font-semibold font-display text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-warning" /> AI Resolution Recommendations
          </h3>
          {localComplaint.aiRecommendations && localComplaint.aiRecommendations.length > 0 ? (
            <div className="space-y-3">
              {localComplaint.aiRecommendations.map((rec, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="bg-warning/5 border border-warning/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-warning/20 text-warning flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    {rec.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 ml-8">{rec.description}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.button whileTap={{ scale: 0.97 }} onClick={fetchRecommendations} disabled={loadingRecommendations}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-warning/10 text-warning hover:bg-warning/20 transition-colors disabled:opacity-50">
              {loadingRecommendations ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lightbulb className="h-4 w-4" />}
              {loadingRecommendations ? 'Generating...' : 'Get AI Recommendations'}
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="font-semibold font-display text-foreground mb-3 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" /> Complaint Details
        </h3>
        <p className="text-sm text-foreground leading-relaxed">{localComplaint.description}</p>

        {/* AI Analysis */}
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">AI Analysis</h4>
          <div className="flex flex-wrap gap-3">
            <div className="bg-muted/30 rounded-lg px-3 py-2 text-xs">
              <span className="text-muted-foreground">Sentiment: </span>
              <span className={`font-semibold ${localComplaint.aiSentiment === 'High Risk' ? 'text-destructive' : localComplaint.aiSentiment === 'Moderate' ? 'text-warning' : 'text-success'}`}>
                {localComplaint.aiSentiment}
              </span>
            </div>
            <div className="bg-muted/30 rounded-lg px-3 py-2 text-xs">
              <span className="text-muted-foreground">Toxicity: </span>
              <span className={`font-semibold ${localComplaint.aiToxicity ? 'text-destructive' : 'text-success'}`}>
                {localComplaint.aiToxicity ? 'Detected' : 'Clean'}
              </span>
            </div>
            <div className="bg-muted/30 rounded-lg px-3 py-2 text-xs">
              <span className="text-muted-foreground">Duplicate: </span>
              <span className={`font-semibold ${localComplaint.aiDuplicate ? 'text-warning' : 'text-success'}`}>
                {localComplaint.aiDuplicate ? 'Possible Match' : 'Unique'}
              </span>
            </div>
            <div className="bg-muted/30 rounded-lg px-3 py-2 text-xs">
              <span className="text-muted-foreground">Risk Score: </span>
              <span className="font-semibold text-foreground">{localComplaint.aiRiskScore}/100</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Voting Section (visible for community review) */}
      {localComplaint.status === 'Community Review' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="font-semibold font-display text-foreground mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> Community Voting
          </h3>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3 text-success" /> {localComplaint.supportVotes} Support ({supportPercent.toFixed(0)}%)</span>
            <span className="flex items-center gap-1 text-warning"><Clock className="h-3 w-3" /> {getTimeRemaining(localComplaint.votingDeadline)}</span>
            <span className="flex items-center gap-1">{localComplaint.rejectVotes} Reject ({rejectPercent.toFixed(0)}%) <ThumbsDown className="h-3 w-3 text-destructive" /></span>
          </div>

          <div className="w-full h-4 bg-muted rounded-full overflow-hidden flex mb-3">
            <motion.div initial={{ width: 0 }} animate={{ width: `${supportPercent}%` }} transition={{ duration: 1 }} className="bg-success h-full" />
            <motion.div initial={{ width: 0 }} animate={{ width: `${rejectPercent}%` }} transition={{ duration: 1, delay: 0.2 }} className="bg-destructive h-full" />
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> {participation}% participation ({totalVotes}/{localComplaint.totalEligibleVoters})</span>
            {supportPercent >= 60 && (
              <span className="text-xs text-warning flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Auto-escalation threshold met</span>
            )}
          </div>

          {isStudent && !voted ? (
            <div className="flex gap-3">
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleVote('support')}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-success text-success-foreground rounded-lg font-medium hover-glow">
                <ThumbsUp className="h-4 w-4" /> Support
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleVote('reject')}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-destructive text-destructive-foreground rounded-lg font-medium hover-glow">
                <ThumbsDown className="h-4 w-4" /> Reject
              </motion.button>
            </div>
          ) : voted ? (
            <div className="text-center py-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary font-medium">✓ You voted: {voted}</p>
            </div>
          ) : null}
        </motion.div>
      )}

      {/* Faculty Response Section */}
      {isFaculty && (localComplaint.status === 'Under Investigation' || localComplaint.status === 'Pending Review') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="font-semibold font-display text-foreground mb-4 flex items-center gap-2">
            <Send className="h-4 w-4 text-primary" /> Faculty Response
          </h3>
          {localComplaint.facultyResponse ? (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <p className="text-sm text-foreground">{localComplaint.facultyResponse}</p>
              <p className="text-xs text-muted-foreground mt-2">Response submitted</p>
            </div>
          ) : showResponseForm ? (
            <div className="space-y-3">
              <textarea
                value={facultyResponse}
                onChange={e => setFacultyResponse(e.target.value)}
                placeholder="Enter your response to this complaint..."
                rows={4}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground resize-none"
              />
              <div className="flex gap-2">
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleFacultyResponse}
                  className="gradient-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-medium">
                  Submit Response
                </motion.button>
                <button onClick={() => setShowResponseForm(false)}
                  className="px-6 py-2 bg-muted text-muted-foreground rounded-lg text-sm">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowResponseForm(true)}
              className="gradient-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-medium hover-glow">
              Write Response
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Committee Decision Panel */}
      {isCommittee && (localComplaint.status === 'Escalated' || localComplaint.status === 'Under Investigation') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="font-semibold font-display text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" /> Committee Decision Panel
          </h3>
          {localComplaint.committeeDecision ? (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground">Decision: {localComplaint.committeeDecision}</p>
              {localComplaint.committeeNotes && (
                <p className="text-sm text-muted-foreground mt-2">{localComplaint.committeeNotes}</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Justification Notes *</label>
                <textarea
                  value={committeeNotes}
                  onChange={e => setCommitteeNotes(e.target.value)}
                  placeholder="Provide justification for your decision..."
                  rows={3}
                  className="mt-1 w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Warning Issued', 'Formal Inquiry', 'Case Dismissed', 'Escalate to Principal'].map(decision => (
                  <motion.button
                    key={decision}
                    whileTap={{ scale: 0.95 }}
                    disabled={!committeeNotes.trim()}
                    onClick={() => handleCommitteeDecision(decision)}
                    className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      decision === 'Case Dismissed' ? 'bg-muted text-muted-foreground hover:bg-muted/80' :
                      decision === 'Escalate to Principal' ? 'bg-destructive text-destructive-foreground' :
                      decision === 'Warning Issued' ? 'bg-warning text-warning-foreground' :
                      'gradient-primary text-primary-foreground'
                    }`}
                  >
                    {decision}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="font-semibold font-display text-foreground mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" /> Complaint Timeline
        </h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-4">
            {localComplaint.timeline.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="relative pl-10"
              >
                <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 ${
                  i === localComplaint.timeline.length - 1 ? 'bg-primary border-primary' : 'bg-card border-muted-foreground/30'
                }`} />
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm font-medium text-foreground">{event.action}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{event.actor}</span>
                    <span>·</span>
                    <span>{new Date(event.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  {event.note && <p className="text-xs text-muted-foreground mt-1 italic">"{event.note}"</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComplaintDetail;
