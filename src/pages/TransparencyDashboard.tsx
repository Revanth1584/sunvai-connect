import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import { DEPARTMENT_STATS, MOCK_STATS, MONTHLY_STATS } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, Clock, TrendingUp, Building2, Eye, Shield } from 'lucide-react';

const COLORS = ['hsl(152, 60%, 42%)', 'hsl(38, 92%, 50%)', 'hsl(0, 72%, 50%)', 'hsl(210, 80%, 55%)', 'hsl(174, 42%, 45%)'];

const pieData = [
  { name: 'Resolved', value: MOCK_STATS.resolved },
  { name: 'Pending', value: MOCK_STATS.pending },
  { name: 'Escalated', value: MOCK_STATS.escalated },
  { name: 'Under Review', value: MOCK_STATS.underReview },
];

const TransparencyDashboard = () => {
  const resolutionRate = Math.round((MOCK_STATS.resolved / MOCK_STATS.total) * 100);
  const avgResolutionDays = 4.2;

  return (
    <div className="space-y-6">
      {/* Public Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-5 w-5" />
            <span className="text-sm font-medium text-white/80">Public Accountability</span>
          </div>
          <h2 className="text-2xl font-bold font-display">Transparency Dashboard</h2>
          <p className="text-white/70 mt-1 text-sm">
            Real-time grievance resolution metrics — promoting accountability and trust.
          </p>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Resolution Rate', value: resolutionRate, suffix: '%', icon: CheckCircle, color: 'text-success bg-success/10' },
          { label: 'Avg Resolution Time', value: avgResolutionDays, suffix: ' days', icon: Clock, color: 'text-warning bg-warning/10' },
          { label: 'Total Complaints', value: MOCK_STATS.total, suffix: '', icon: TrendingUp, color: 'text-info bg-info/10' },
          { label: 'Departments Active', value: 7, suffix: '', icon: Building2, color: 'text-primary bg-primary/10' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-5 text-center">
            <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-3`}>
              <s.icon className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold font-display text-foreground">
              <AnimatedCounter end={s.value} suffix={s.suffix} />
            </p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Resolution Breakdown Pie */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-5">
          <h3 className="font-semibold font-display text-foreground mb-4">Complaint Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {pieData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                {d.name} ({d.value})
              </span>
            ))}
          </div>
        </motion.div>

        {/* Department Performance */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-5">
          <h3 className="font-semibold font-display text-foreground mb-4">Department Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={DEPARTMENT_STATS}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200 18% 90%)" />
              <XAxis dataKey="department" tick={{ fontSize: 11 }} stroke="hsl(215 16% 47%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 16% 47%)" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="complaints" fill="hsl(174 42% 45%)" radius={[4, 4, 0, 0]} name="Total" />
              <Bar dataKey="resolved" fill="hsl(152 60% 42%)" radius={[4, 4, 0, 0]} name="Resolved" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Department Ranking */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="font-semibold font-display text-foreground">Department Accountability Ranking</h3>
        </div>
        <div className="space-y-3">
          {[...DEPARTMENT_STATS].sort((a, b) => (b.resolved / b.complaints) - (a.resolved / a.complaints)).map((dept, i) => {
            const rate = Math.round((dept.resolved / dept.complaints) * 100);
            return (
              <div key={dept.department} className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                  i === 0 ? 'bg-success/20 text-success' : i === 1 ? 'bg-primary/20 text-primary' : 'bg-muted/30 text-muted-foreground'
                }`}>#{i + 1}</span>
                <span className="text-sm text-foreground w-28 flex-shrink-0 font-medium">{dept.department}</span>
                <div className="flex-1 h-3 bg-muted/20 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${rate}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full rounded-full ${rate >= 70 ? 'bg-success' : rate >= 50 ? 'bg-warning' : 'bg-destructive'}`} />
                </div>
                <span className="text-sm font-mono text-muted-foreground w-12 text-right">{rate}%</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground">Data updated in real-time · SUNVAI Governance System · © 2026 KGRCET</p>
      </div>
    </div>
  );
};

export default TransparencyDashboard;
