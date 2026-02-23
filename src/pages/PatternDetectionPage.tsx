import { motion } from 'framer-motion';
import { PATTERN_ALERTS } from '@/lib/mock-data';
import { Brain, AlertTriangle, TrendingUp, Building2, Repeat, Zap, Bell, Shield } from 'lucide-react';

const PatternDetectionPage = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-6 text-white">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-5 w-5" />
            <span className="text-sm font-medium text-white/80">AI-Powered Preventive System</span>
          </div>
          <h2 className="text-2xl font-bold font-display">Complaint Pattern Detection</h2>
          <p className="text-white/70 mt-1 text-sm">
            AI detects repeated complaints from same department and alerts management automatically.
          </p>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Patterns', value: PATTERN_ALERTS.filter(p => p.severity === 'critical').length, icon: AlertTriangle, color: 'text-destructive bg-destructive/10' },
          { label: 'Departments Flagged', value: new Set(PATTERN_ALERTS.map(p => p.department)).size, icon: Building2, color: 'text-warning bg-warning/10' },
          { label: 'Total Alerts', value: PATTERN_ALERTS.length, icon: Bell, color: 'text-info bg-info/10' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-4 text-center">
            <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center mx-auto mb-2`}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold font-display text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Pattern Alerts */}
      <div className="space-y-4">
        {PATTERN_ALERTS.map((pattern, i) => (
          <motion.div key={pattern.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            className={`glass-card rounded-xl p-5 border-l-4 ${
              pattern.severity === 'critical' ? 'border-l-destructive' :
              pattern.severity === 'warning' ? 'border-l-warning' :
              'border-l-info'
            }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    pattern.severity === 'critical' ? 'bg-destructive/10 text-destructive' :
                    pattern.severity === 'warning' ? 'bg-warning/10 text-warning' :
                    'bg-info/10 text-info'
                  }`}>{pattern.severity.toUpperCase()}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Building2 className="h-3 w-3" /> {pattern.department}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Repeat className="h-3 w-3" /> {pattern.occurrences} complaints
                  </span>
                </div>
                <h3 className="font-semibold text-foreground">{pattern.pattern}</h3>
                <p className="text-sm text-muted-foreground mt-1">{pattern.description}</p>
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <span className="text-xs bg-muted/30 rounded-lg px-2 py-1 text-muted-foreground">
                    Category: {pattern.category}
                  </span>
                  <span className="text-xs bg-muted/30 rounded-lg px-2 py-1 text-muted-foreground">
                    First reported: {pattern.firstReported}
                  </span>
                  <span className="text-xs bg-muted/30 rounded-lg px-2 py-1 text-muted-foreground">
                    Trend: {pattern.trendDirection === 'up' ? '📈 Increasing' : pattern.trendDirection === 'stable' ? '➡️ Stable' : '📉 Decreasing'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 ml-4">
                {pattern.severity === 'critical' && (
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <Zap className="h-6 w-6 text-destructive" />
                  </motion.div>
                )}
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  pattern.autoAlerted ? 'bg-success/10 text-success' : 'bg-muted/30 text-muted-foreground'
                }`}>
                  {pattern.autoAlerted ? '✓ Management Alerted' : 'Monitoring'}
                </span>
              </div>
            </div>

            {/* AI Recommendation */}
            {pattern.aiRecommendation && (
              <div className="mt-3 bg-primary/5 rounded-lg p-3 flex items-start gap-2">
                <Brain className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-primary">AI Recommendation</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{pattern.aiRecommendation}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PatternDetectionPage;
