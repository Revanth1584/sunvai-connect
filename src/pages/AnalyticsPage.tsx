import { motion } from 'framer-motion';
import { DEPARTMENT_STATS, MONTHLY_STATS, MOCK_STATS } from '@/lib/mock-data';
import AnimatedCounter from '@/components/AnimatedCounter';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const AnalyticsPage = () => {
  const resolutionRate = Math.round((MOCK_STATS.resolved / MOCK_STATS.total) * 100);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Resolution Rate', value: resolutionRate, suffix: '%' },
          { label: 'Avg Response Time', value: 3, suffix: ' days' },
          { label: 'Active Departments', value: 7, suffix: '' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-5 text-center"
          >
            <p className="text-3xl font-bold font-display text-gradient">
              <AnimatedCounter end={s.value} suffix={s.suffix} />
            </p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-5"
        >
          <h3 className="font-semibold font-display text-foreground mb-4">Department-wise Complaints</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={DEPARTMENT_STATS}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200 18% 90%)" />
              <XAxis dataKey="department" tick={{ fontSize: 12 }} stroke="hsl(215 16% 47%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 16% 47%)" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="complaints" fill="hsl(174 42% 45%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill="hsl(152 60% 42%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-5"
        >
          <h3 className="font-semibold font-display text-foreground mb-4">Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={MONTHLY_STATS}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200 18% 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215 16% 47%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 16% 47%)" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Legend />
              <Line type="monotone" dataKey="submitted" stroke="hsl(174 42% 45%)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="resolved" stroke="hsl(152 60% 42%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
