import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { MOCK_COMPLAINTS, MOCK_STATS, FACULTY_COMPLAINTS, HOD_COMPLAINTS, ALL_COMPLAINTS, OMBUDSMAN_COMPLAINTS, DEPARTMENT_STATS } from '@/lib/mock-data';
import AnimatedCounter from '@/components/AnimatedCounter';
import { StatusBadge, UrgencyBadge, AIRiskMeter } from '@/components/StatusBadges';
import { FileText, Clock, CheckCircle, AlertTriangle, TrendingUp, Users, Shield, Eye, Send, BarChart3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Complaint } from '@/lib/types';

const statCards = [
  { label: 'Total Complaints', key: 'total' as const, icon: FileText, color: 'gradient-primary' },
  { label: 'Pending Review', key: 'pending' as const, icon: Clock, color: 'bg-warning' },
  { label: 'Resolved', key: 'resolved' as const, icon: CheckCircle, color: 'bg-success' },
  { label: 'Escalated', key: 'escalated' as const, icon: AlertTriangle, color: 'bg-destructive' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin' || user?.role === 'committee' || user?.role === 'hod' || user?.role === 'ombudsman';
  const isFaculty = user?.role === 'faculty';
  const isOmbudsman = user?.role === 'ombudsman';

  const getComplaints = (): Complaint[] => {
    if (isFaculty) return FACULTY_COMPLAINTS;
    if (user?.role === 'hod') return HOD_COMPLAINTS;
    if (isOmbudsman) return OMBUDSMAN_COMPLAINTS;
    if (user?.role === 'admin' || user?.role === 'committee') return ALL_COMPLAINTS;
    return MOCK_COMPLAINTS;
  };

  const complaints = getComplaints();

  const getRoleDescription = () => {
    switch (user?.role) {
      case 'student': return 'Track your complaints and participate in community voting.';
      case 'faculty': return 'Review complaints assigned to you and submit responses.';
      case 'hod': return 'Oversee departmental complaints and manage resolutions.';
      case 'committee': return 'Review escalated cases and make committee decisions.';
      case 'admin': return 'Full system oversight — manage all complaints, analytics, and governance.';
      case 'ombudsman': return 'Independent oversight of major grievances flagged for external review.';
      default: return '';
    }
  };

  const getQuickActions = () => {
    switch (user?.role) {
      case 'student': return [
        { label: 'Submit Complaint', to: '/submit', icon: Send, color: 'gradient-primary' },
        { label: 'My Complaints', to: '/my-complaints', icon: FileText, color: 'bg-info' },
        { label: 'Community Voting', to: '/voting', icon: Users, color: 'bg-warning' },
      ];
      case 'faculty': return [
        { label: 'Pending Responses', to: '/my-complaints', icon: Send, color: 'bg-warning' },
        { label: 'View All', to: '/my-complaints', icon: FileText, color: 'bg-info' },
      ];
      case 'hod': return [
        { label: 'Dept. Complaints', to: '/all-complaints', icon: FileText, color: 'gradient-primary' },
        { label: 'Committee', to: '/committee', icon: Shield, color: 'bg-info' },
        { label: 'Analytics', to: '/analytics', icon: BarChart3, color: 'bg-warning' },
      ];
      case 'committee': return [
        { label: 'Review Cases', to: '/all-complaints', icon: Shield, color: 'bg-destructive' },
        { label: 'Committee', to: '/committee', icon: Users, color: 'gradient-primary' },
        { label: 'Analytics', to: '/analytics', icon: BarChart3, color: 'bg-info' },
      ];
      case 'admin': return [
        { label: 'All Complaints', to: '/all-complaints', icon: FileText, color: 'gradient-primary' },
        { label: 'Committee', to: '/committee', icon: Shield, color: 'bg-info' },
        { label: 'Analytics', to: '/analytics', icon: BarChart3, color: 'bg-warning' },
      ];
      case 'ombudsman': return [
        { label: 'Major Cases', to: '/all-complaints', icon: Eye, color: 'bg-destructive' },
        { label: 'Analytics', to: '/analytics', icon: BarChart3, color: 'bg-info' },
      ];
      default: return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-display text-foreground">
              Welcome back, <span className="text-gradient">{user?.name?.split(' ')[0]}</span>
            </h2>
            <p className="text-muted-foreground mt-1">{getRoleDescription()}</p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-primary capitalize">{user?.role}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {getQuickActions().map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={action.to}
              className="glass-card rounded-xl p-4 flex items-center gap-3 hover-glow transition-all group block"
            >
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center text-primary-foreground`}>
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{action.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-5 hover-glow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center text-primary-foreground`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-bold font-display text-foreground">
              <AnimatedCounter end={MOCK_STATS[card.key]} />
            </p>
            <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Complaints */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold font-display text-foreground">
            {isOmbudsman ? 'Major Complaints' : isFaculty ? 'Complaints Assigned to You' : 'Recent Complaints'}
          </h3>
          <Link
            to={user?.role === 'student' ? '/my-complaints' : '/all-complaints'}
            className="text-sm text-primary font-medium hover:underline"
          >
            View All →
          </Link>
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
                  <div className="flex items-center gap-2 mb-1">
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

      {/* Department Breakdown for Admin/HOD */}
      {(user?.role === 'admin' || user?.role === 'hod') && (
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold font-display text-foreground mb-4">Department Overview</h3>
          <div className="space-y-3">
            {DEPARTMENT_STATS.map((dept, i) => {
              const rate = Math.round((dept.resolved / dept.complaints) * 100);
              return (
                <motion.div
                  key={dept.department}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <span className="text-sm text-foreground w-24 flex-shrink-0">{dept.department}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${rate}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full bg-success rounded-full"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-20 text-right">{dept.resolved}/{dept.complaints} resolved</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
