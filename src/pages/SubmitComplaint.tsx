import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { DEPARTMENTS, ComplaintCategory, UrgencyLevel, RoutingLevel } from '@/lib/types';
import { CheckCircle, Upload, Send, Wand2, Loader2, ArrowUpRight, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const categories: ComplaintCategory[] = [
  'Academic Issue', 'Faculty Misconduct', 'Harassment', 'Infrastructure',
  'Exam/Marks Issue', 'Administration Delay', 'Others',
];

const routingDescriptions: Record<RoutingLevel, string> = {
  'HoD': 'Routed to Head of Department. Auto-escalates in 7 days if unresolved.',
  'Principal': 'Routed directly to Principal. Auto-escalates in 15 days if unresolved.',
  'Director': 'Routed to Director level. Highest priority — immediate attention.',
};

const SubmitComplaint = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [correcting, setCorrecting] = useState(false);
  const [corrected, setCorrected] = useState(false);
  const [form, setForm] = useState({
    department: user?.department || '',
    year: '3rd',
    category: '' as ComplaintCategory | '',
    title: '',
    description: '',
    anonymous: false,
    urgency: 'Medium' as UrgencyLevel,
    routingLevel: 'HoD' as RoutingLevel,
  });

  const wordCount = form.description.trim().split(/\s+/).filter(Boolean).length;

  // Auto-suggest routing based on category and urgency
  const suggestRouting = (category: string, urgency: UrgencyLevel): RoutingLevel => {
    if (category === 'Harassment' || urgency === 'High') return 'Principal';
    return 'HoD';
  };

  const handleCategoryChange = (category: ComplaintCategory) => {
    const suggested = suggestRouting(category, form.urgency);
    setForm({ ...form, category, routingLevel: suggested });
  };

  const handleUrgencyChange = (urgency: UrgencyLevel) => {
    const suggested = suggestRouting(form.category, urgency);
    setForm({ ...form, urgency, routingLevel: suggested });
  };

  const handleAutoCorrect = async () => {
    if (!form.description.trim() || wordCount < 5) {
      toast({ title: 'Not enough text', description: 'Write at least a few sentences first.', variant: 'destructive' });
      return;
    }
    setCorrecting(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-autocorrect', {
        body: { text: form.description, type: 'correct' },
      });
      if (error) throw error;
      if (data?.result) {
        setForm({ ...form, description: data.result });
        setCorrected(true);
        toast({ title: '✨ AI Auto-Corrected', description: 'Grammar and spelling improved!' });
      }
    } catch (err) {
      console.error('Auto-correct error:', err);
      toast({ title: 'Auto-correction failed', description: 'Please try again.', variant: 'destructive' });
    } finally {
      setCorrecting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wordCount < 20) {
      toast({ title: 'Description too short', description: 'Please provide at least 20 words.', variant: 'destructive' });
      return;
    }
    const id = `SUN-2026-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
    setTicketId(id);
    setSubmitted(true);
    toast({ title: 'Complaint Submitted!', description: `Ticket ID: ${id}` });
  };

  if (submitted) {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center py-20">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-success flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10 text-success-foreground" />
        </motion.div>
        <h2 className="text-2xl font-bold font-display text-foreground mb-2">Complaint Submitted Successfully!</h2>
        <p className="text-muted-foreground mb-4">Routed to <strong>{form.routingLevel}</strong> level. {form.anonymous ? 'Your identity is confidential.' : ''}</p>
        <div className="glass-card rounded-xl px-6 py-4 text-center">
          <p className="text-sm text-muted-foreground">Ticket ID</p>
          <p className="text-2xl font-mono font-bold text-primary">{ticketId}</p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Auto-escalation: {form.routingLevel === 'HoD' ? '7 days' : form.routingLevel === 'Principal' ? '15 days' : 'Immediate attention'}
          </p>
        </div>
        <button
          onClick={() => { setSubmitted(false); setCorrected(false); setForm({ ...form, title: '', description: '', category: '' }); }}
          className="mt-6 gradient-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover-glow"
        >
          Submit Another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" /> Raise a Complaint
          </h2>

          {/* Auto-filled info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <div className="mt-1 px-3 py-2 bg-muted rounded-lg text-sm text-foreground">{user?.name}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Roll Number</label>
              <div className="mt-1 px-3 py-2 bg-muted rounded-lg text-sm text-foreground">{user?.rollNumber || 'N/A'}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Department</label>
              <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}
                className="mt-1 w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground">
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Year</label>
              <select value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}
                className="mt-1 w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground">
                {['1st', '2nd', '3rd', '4th'].map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Category *</label>
            <select required value={form.category}
              onChange={e => handleCategoryChange(e.target.value as ComplaintCategory)}
              className="mt-1 w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground">
              <option value="">Select a category...</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Title *</label>
            <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Brief summary of your complaint"
              className="mt-1 w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">Description *</label>
              <div className="flex items-center gap-3">
                {corrected && <span className="text-xs text-success flex items-center gap-1"><Wand2 className="h-3 w-3" /> AI Corrected</span>}
                <span className={`text-xs ${wordCount >= 20 ? 'text-success' : 'text-warning'}`}>
                  {wordCount} words (min 20)
                </span>
              </div>
            </div>
            <textarea required rows={6} value={form.description}
              onChange={e => { setForm({ ...form, description: e.target.value }); setCorrected(false); }}
              placeholder="Describe your complaint in detail..."
              className="mt-1 w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground resize-none" />
            <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={handleAutoCorrect} disabled={correcting || wordCount < 5}
              className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {correcting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="h-3.5 w-3.5" />}
              {correcting ? 'Correcting...' : 'AI Auto-Correct Grammar & Spelling'}
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Urgency</label>
              <div className="mt-2 flex gap-2">
                {(['Low', 'Medium', 'High'] as UrgencyLevel[]).map(u => (
                  <button key={u} type="button" onClick={() => handleUrgencyChange(u)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      form.urgency === u
                        ? u === 'High' ? 'bg-destructive text-destructive-foreground'
                          : u === 'Medium' ? 'bg-warning text-warning-foreground'
                          : 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}>
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Evidence</label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Upload files (demo)</p>
              </div>
            </div>
          </div>

          {/* Multi-Level Routing */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4" /> Routing Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['HoD', 'Principal', 'Director'] as RoutingLevel[]).map(level => (
                <button key={level} type="button" onClick={() => setForm({ ...form, routingLevel: level })}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all border ${
                    form.routingLevel === level
                      ? level === 'Director' ? 'bg-destructive/10 border-destructive/30 text-destructive'
                        : level === 'Principal' ? 'bg-warning/10 border-warning/30 text-warning'
                        : 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-muted/50 border-border text-muted-foreground hover:bg-muted'
                  }`}>
                  {level}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{routingDescriptions[form.routingLevel]}</p>
          </div>

          {/* Anonymous Toggle */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <button type="button" onClick={() => setForm({ ...form, anonymous: !form.anonymous })}
              className={`w-10 h-6 rounded-full transition-colors relative ${form.anonymous ? 'bg-primary' : 'bg-border'}`}>
              <div className={`w-4 h-4 rounded-full bg-card absolute top-1 transition-transform ${form.anonymous ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                {form.anonymous ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                Submit Anonymously
              </p>
              <p className="text-xs text-muted-foreground">
                {form.anonymous
                  ? '🔒 Your identity will be completely hidden from all administrators and reviewers.'
                  : 'Your identity will be visible to administrators handling your complaint.'}
              </p>
            </div>
          </div>
        </div>

        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit"
          className="w-full gradient-primary text-primary-foreground py-3 rounded-xl font-semibold hover-glow text-sm">
          Submit Complaint
        </motion.button>
      </form>
    </div>
  );
};

export default SubmitComplaint;
