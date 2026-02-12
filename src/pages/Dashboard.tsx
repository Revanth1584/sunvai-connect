import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { MOCK_COMPLAINTS, MOCK_STATS } from '@/lib/mock-data';
import AnimatedCounter from '@/components/AnimatedCounter';
import { StatusBadge, UrgencyBadge, AIRiskMeter } from '@/components/StatusBadges';
import { FileText, Clock, CheckCircle, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const statCards = [
  { label: 'Total Complaints', key: 'total' as const, icon: FileText, color: 'gradient-primary' },
  { label: 'Pending Review', key: 'pending' as const, icon: Clock, color: 'bg-warning' },
  { label: 'Resolved', key: 'resolved' as const, icon: CheckCircle, color: 'bg-success' },
  { label: 'Escalated', key: 'escalated' as const, icon: AlertTriangle, color: 'bg-destructive' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'committee' || user?.role === 'hod' || user?.role === 'ombudsman';

  const complaints = isAdmin ? MOCK_COMPLAINTS : MOCK_COMPLAINTS.filter(c =>
    user?.role === 'student' ? c.rollNumber === user.rollNumber || true : true
  );

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-2xl font-bold font-display text-foreground">
          Welcome back, <span className="text-gradient">{user?.name?.split(' ')[0]}</span>
        </h2>
        <p className="text-muted-foreground mt-1">
          {isAdmin ? 'Here\'s an overview of the grievance portal activity.' : 'Track your complaints and participate in community voting.'}
        </p>
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
          <h3 className="font-semibold font-display text-foreground">Recent Complaints</h3>
          <Link to={isAdmin ? '/all-complaints' : '/my-complaints'} className="text-sm text-primary font-medium hover:underline">
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
              className="p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{c.ticketId}</span>
                    <StatusBadge status={c.status} />
                    <UrgencyBadge urgency={c.urgency} />
                  </div>
                  <p className="font-medium text-foreground text-sm truncate">{c.title}</p>
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
    </div>
  );
};

export default Dashboard;
