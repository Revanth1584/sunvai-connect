import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { MOCK_COMPLAINTS, MOCK_STATS, FACULTY_COMPLAINTS, HOD_COMPLAINTS, ALL_COMPLAINTS, OMBUDSMAN_COMPLAINTS, DEPARTMENT_STATS } from '@/lib/mock-data';
import AnimatedCounter from '@/components/AnimatedCounter';
import { StatusBadge, UrgencyBadge, AIRiskMeter } from '@/components/StatusBadges';
import {
  FileText, Clock, CheckCircle, AlertTriangle, TrendingUp, Users, Shield, Eye, Send,
  BarChart3, GraduationCap, Building2, UserCheck, Vote, Scale, MessageSquarePlus,
  Activity, Zap, Target, Award, Gavel, BookOpen, Bell,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Complaint } from '@/lib/types';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getComplaints = (): Complaint[] => {
    if (user?.role === 'faculty') return FACULTY_COMPLAINTS;
    if (user?.role === 'hod') return HOD_COMPLAINTS;
    if (user?.role === 'ombudsman') return OMBUDSMAN_COMPLAINTS;
    if (user?.role === 'admin' || user?.role === 'committee') return ALL_COMPLAINTS;
    return MOCK_COMPLAINTS;
  };

  const complaints = getComplaints();

  if (user?.role === 'student') return <StudentDashboard complaints={complaints} navigate={navigate} user={user} />;
  if (user?.role === 'faculty') return <FacultyDashboard complaints={complaints} navigate={navigate} user={user} />;
  if (user?.role === 'hod') return <HODDashboard complaints={complaints} navigate={navigate} user={user} />;
  if (user?.role === 'committee') return <CommitteeDashboard complaints={complaints} navigate={navigate} user={user} />;
  if (user?.role === 'admin') return <AdminDashboard complaints={complaints} navigate={navigate} user={user} />;
  if (user?.role === 'ombudsman') return <OmbudsmanDashboard complaints={complaints} navigate={navigate} user={user} />;

  return null;
};

// ========== STUDENT DASHBOARD ==========
const StudentDashboard = ({ complaints, navigate, user }: any) => (
  <div className="space-y-6">
    {/* Welcome Banner */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-10 -translate-x-10" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="h-5 w-5" />
          <span className="text-sm font-medium text-white/80">Student Portal</span>
        </div>
        <h2 className="text-2xl font-bold font-display">Welcome, {user?.name}!</h2>
        <p className="text-white/80 mt-1 text-sm">{user?.rollNumber} · {user?.department}</p>
        <p className="text-white/70 mt-2 text-sm">Track your grievances, vote on issues, and make your voice heard.</p>
      </div>
    </motion.div>

    {/* Quick Actions */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {[
        { label: 'Submit Complaint', to: '/submit', icon: MessageSquarePlus, gradient: 'from-emerald-500 to-teal-600' },
        { label: 'My Complaints', to: '/my-complaints', icon: FileText, gradient: 'from-blue-500 to-indigo-600' },
        { label: 'Community Voting', to: '/voting', icon: Vote, gradient: 'from-amber-500 to-orange-600' },
        { label: 'Know Your Rights', to: '/know-your-rights', icon: Scale, gradient: 'from-violet-500 to-purple-600' },
      ].map((action, i) => (
        <motion.div key={action.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <Link to={action.to} className="glass-card rounded-xl p-4 flex flex-col items-center gap-2 hover-glow transition-all group block text-center">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white shadow-lg`}>
              <action.icon className="h-6 w-6" />
            </div>
            <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{action.label}</span>
          </Link>
        </motion.div>
      ))}
    </div>

    {/* Stats Row */}
    <div className="grid grid-cols-3 gap-4">
      {[
        { label: 'My Complaints', value: complaints.length, icon: FileText, color: 'text-emerald-500' },
        { label: 'Resolved', value: complaints.filter((c: Complaint) => c.status === 'Resolved').length, icon: CheckCircle, color: 'text-green-500' },
        { label: 'Pending', value: complaints.filter((c: Complaint) => c.status === 'Pending Review').length, icon: Clock, color: 'text-amber-500' },
      ].map((stat, i) => (
        <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
          className="glass-card rounded-xl p-4 text-center">
          <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
          <p className="text-2xl font-bold font-display text-foreground"><AnimatedCounter end={stat.value} /></p>
          <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>

    <ComplaintList title="My Recent Complaints" complaints={complaints} navigate={navigate} />
  </div>
);

// ========== FACULTY DASHBOARD ==========
const FacultyDashboard = ({ complaints, navigate, user }: any) => (
  <div className="space-y-6">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <Users className="h-5 w-5" />
          <span className="text-sm font-medium text-white/80">Faculty Portal</span>
        </div>
        <h2 className="text-2xl font-bold font-display">Welcome, {user?.name}</h2>
        <p className="text-white/80 mt-1 text-sm">{user?.employeeId} · {user?.department}</p>
        <p className="text-white/70 mt-2 text-sm">Review and respond to complaints assigned to you.</p>
      </div>
    </motion.div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Assigned', value: complaints.length, icon: FileText, color: 'bg-blue-500/10 text-blue-500' },
        { label: 'Pending Response', value: complaints.filter((c: Complaint) => c.status === 'Pending Review' || c.status === 'Under Investigation').length, icon: Clock, color: 'bg-amber-500/10 text-amber-500' },
        { label: 'Community Review', value: complaints.filter((c: Complaint) => c.status === 'Community Review').length, icon: Users, color: 'bg-violet-500/10 text-violet-500' },
        { label: 'Resolved', value: complaints.filter((c: Complaint) => c.status === 'Resolved').length, icon: CheckCircle, color: 'bg-green-500/10 text-green-500' },
      ].map((stat, i) => (
        <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          className="glass-card rounded-xl p-5">
          <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
            <stat.icon className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold font-display text-foreground"><AnimatedCounter end={stat.value} /></p>
          <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Priority Alert */}
    {complaints.filter((c: Complaint) => c.urgency === 'High').length > 0 && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="rounded-xl border-2 border-destructive/30 bg-destructive/5 p-4 flex items-center gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
        <p className="text-sm text-foreground">
          <span className="font-bold">{complaints.filter((c: Complaint) => c.urgency === 'High').length} high-urgency</span> complaint(s) require your immediate attention
        </p>
      </motion.div>
    )}

    <ComplaintList title="Complaints Assigned to You" complaints={complaints} navigate={navigate} />
  </div>
);

// ========== HOD DASHBOARD ==========
const HODDashboard = ({ complaints, navigate, user }: any) => (
  <div className="space-y-6">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 p-6 text-white">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="h-5 w-5" />
          <span className="text-sm font-medium text-white/80">HOD Portal</span>
        </div>
        <h2 className="text-2xl font-bold font-display">Welcome, {user?.name}</h2>
        <p className="text-white/80 mt-1 text-sm">{user?.department}</p>
        <p className="text-white/70 mt-2 text-sm">Manage departmental complaints and oversee resolutions.</p>
      </div>
    </motion.div>

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {[
        { label: 'Dept. Complaints', to: '/all-complaints', icon: FileText, gradient: 'from-violet-500 to-purple-600' },
        { label: 'Committee', to: '/committee', icon: Shield, gradient: 'from-amber-500 to-orange-600' },
        { label: 'Analytics', to: '/analytics', icon: BarChart3, gradient: 'from-blue-500 to-indigo-600' },
      ].map((action, i) => (
        <motion.div key={action.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <Link to={action.to} className="glass-card rounded-xl p-4 flex items-center gap-3 hover-glow transition-all group block">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white`}>
              <action.icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{action.label}</span>
          </Link>
        </motion.div>
      ))}
    </div>

    {/* Department Stats */}
    <div className="glass-card rounded-xl p-5">
      <h3 className="font-semibold font-display text-foreground mb-4">Department Resolution Rate</h3>
      <div className="space-y-3">
        {DEPARTMENT_STATS.slice(0, 4).map((dept, i) => {
          const rate = Math.round((dept.resolved / dept.complaints) * 100);
          return (
            <motion.div key={dept.department} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4">
              <span className="text-sm text-foreground w-24 flex-shrink-0">{dept.department}</span>
              <div className="flex-1 h-3 bg-muted/30 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${rate}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full" />
              </div>
              <span className="text-xs font-mono text-muted-foreground w-12 text-right">{rate}%</span>
            </motion.div>
          );
        })}
      </div>
    </div>

    <ComplaintList title="Departmental Complaints" complaints={complaints} navigate={navigate} />
  </div>
);

// ========== COMMITTEE DASHBOARD ==========
const CommitteeDashboard = ({ complaints, navigate, user }: any) => (
  <div className="space-y-6">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <Gavel className="h-5 w-5" />
          <span className="text-sm font-medium text-white/80">Committee Portal</span>
        </div>
        <h2 className="text-2xl font-bold font-display">Welcome, {user?.name}</h2>
        <p className="text-white/70 mt-2 text-sm">Review escalated cases and make governance decisions.</p>
      </div>
    </motion.div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Total Cases', value: complaints.length, icon: FileText, color: 'bg-amber-500/10 text-amber-500' },
        { label: 'Escalated', value: complaints.filter((c: Complaint) => c.status === 'Escalated').length, icon: AlertTriangle, color: 'bg-red-500/10 text-red-500' },
        { label: 'Under Review', value: complaints.filter((c: Complaint) => c.status === 'Community Review' || c.status === 'Under Investigation').length, icon: Activity, color: 'bg-blue-500/10 text-blue-500' },
        { label: 'Resolved', value: complaints.filter((c: Complaint) => c.status === 'Resolved').length, icon: CheckCircle, color: 'bg-green-500/10 text-green-500' },
      ].map((stat, i) => (
        <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          className="glass-card rounded-xl p-5">
          <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
            <stat.icon className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold font-display text-foreground"><AnimatedCounter end={stat.value} /></p>
          <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>

    <ComplaintList title="Cases for Review" complaints={complaints} navigate={navigate} />
  </div>
);

// ========== ADMIN/PRINCIPAL DASHBOARD ==========
const AdminDashboard = ({ complaints, navigate, user }: any) => (
  <div className="space-y-6">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 p-6 text-white">
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="h-5 w-5" />
          <span className="text-sm font-medium text-white/80">Principal / Admin Portal</span>
        </div>
        <h2 className="text-2xl font-bold font-display">Welcome, {user?.name}</h2>
        <p className="text-white/70 mt-2 text-sm">Full system oversight — governance, analytics, and decision-making.</p>
      </div>
    </motion.div>

    {/* Full Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {[
        { label: 'Total', value: MOCK_STATS.total, icon: FileText, color: 'bg-rose-500/10 text-rose-500' },
        { label: 'Pending', value: MOCK_STATS.pending, icon: Clock, color: 'bg-amber-500/10 text-amber-500' },
        { label: 'Resolved', value: MOCK_STATS.resolved, icon: CheckCircle, color: 'bg-green-500/10 text-green-500' },
        { label: 'Escalated', value: MOCK_STATS.escalated, icon: AlertTriangle, color: 'bg-red-500/10 text-red-500' },
        { label: 'Under Review', value: MOCK_STATS.underReview, icon: Activity, color: 'bg-blue-500/10 text-blue-500' },
      ].map((stat, i) => (
        <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          className="glass-card rounded-xl p-4">
          <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center mb-2`}>
            <stat.icon className="h-4 w-4" />
          </div>
          <p className="text-2xl font-bold font-display text-foreground"><AnimatedCounter end={stat.value} /></p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {[
        { label: 'All Complaints', to: '/all-complaints', icon: FileText, gradient: 'from-rose-500 to-red-600' },
        { label: 'Committee', to: '/committee', icon: Users, gradient: 'from-amber-500 to-orange-600' },
        { label: 'Analytics', to: '/analytics', icon: BarChart3, gradient: 'from-blue-500 to-indigo-600' },
        { label: 'Know Your Rights', to: '/know-your-rights', icon: Scale, gradient: 'from-violet-500 to-purple-600' },
      ].map((action, i) => (
        <motion.div key={action.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <Link to={action.to} className="glass-card rounded-xl p-3 flex items-center gap-3 hover-glow transition-all group block">
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white`}>
              <action.icon className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{action.label}</span>
          </Link>
        </motion.div>
      ))}
    </div>

    {/* Department Overview */}
    <div className="glass-card rounded-xl p-5">
      <h3 className="font-semibold font-display text-foreground mb-4">Department Overview</h3>
      <div className="space-y-3">
        {DEPARTMENT_STATS.map((dept, i) => {
          const rate = Math.round((dept.resolved / dept.complaints) * 100);
          return (
            <motion.div key={dept.department} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4">
              <span className="text-sm text-foreground w-24 flex-shrink-0">{dept.department}</span>
              <div className="flex-1 h-2.5 bg-muted/30 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${rate}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full bg-gradient-to-r from-rose-500 to-red-500 rounded-full" />
              </div>
              <span className="text-xs text-muted-foreground w-20 text-right">{dept.resolved}/{dept.complaints}</span>
            </motion.div>
          );
        })}
      </div>
    </div>

    <ComplaintList title="All Complaints" complaints={complaints} navigate={navigate} />
  </div>
);

// ========== OMBUDSMAN DASHBOARD ==========
const OmbudsmanDashboard = ({ complaints, navigate, user }: any) => (
  <div className="space-y-6">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 p-6 text-white">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <Eye className="h-5 w-5" />
          <span className="text-sm font-medium text-white/80">Ombudsman Portal — Read Only</span>
        </div>
        <h2 className="text-2xl font-bold font-display">Independent Oversight</h2>
        <p className="text-white/70 mt-2 text-sm">Monitor major grievances flagged for external review. You have observation-only access.</p>
      </div>
    </motion.div>

    <div className="grid grid-cols-3 gap-4">
      {[
        { label: 'Major Cases', value: complaints.length, icon: AlertTriangle, color: 'bg-cyan-500/10 text-cyan-500' },
        { label: 'High Risk', value: complaints.filter((c: Complaint) => c.aiSentiment === 'High Risk').length, icon: Zap, color: 'bg-red-500/10 text-red-500' },
        { label: 'Escalated', value: complaints.filter((c: Complaint) => c.status === 'Escalated').length, icon: Target, color: 'bg-amber-500/10 text-amber-500' },
      ].map((stat, i) => (
        <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          className="glass-card rounded-xl p-5 text-center">
          <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-3`}>
            <stat.icon className="h-6 w-6" />
          </div>
          <p className="text-2xl font-bold font-display text-foreground"><AnimatedCounter end={stat.value} /></p>
          <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Observation Notice */}
    <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4 flex items-center gap-3">
      <Eye className="h-5 w-5 text-cyan-500 flex-shrink-0" />
      <p className="text-sm text-foreground">This portal is <span className="font-bold">read-only</span>. You can observe and audit but cannot modify complaint statuses or decisions.</p>
    </div>

    <ComplaintList title="Major Cases Under Observation" complaints={complaints} navigate={navigate} />
  </div>
);

// ========== SHARED COMPLAINT LIST ==========
const ComplaintList = ({ title, complaints, navigate }: { title: string; complaints: Complaint[]; navigate: any }) => (
  <div className="glass-card rounded-xl overflow-hidden">
    <div className="p-5 border-b border-border">
      <h3 className="font-semibold font-display text-foreground">{title}</h3>
    </div>
    <div className="divide-y divide-border">
      {complaints.slice(0, 5).map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => navigate(`/complaint/${c.id}`)}
          className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-mono text-muted-foreground">{c.ticketId}</span>
                <StatusBadge status={c.status} />
                <UrgencyBadge urgency={c.urgency} />
              </div>
              <p className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">{c.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {c.anonymous ? 'Anonymous' : c.studentName} · {c.department} · {c.category}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <AIRiskMeter score={c.aiRiskScore || 0} />
              <p className="text-xs text-muted-foreground mt-1">AI Risk</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Dashboard;
