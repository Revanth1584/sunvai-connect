import { motion } from 'framer-motion';
import { MOCK_COMPLAINTS } from '@/lib/mock-data';
import { StatusBadge, UrgencyBadge, AIRiskMeter } from '@/components/StatusBadges';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

const ComplaintsList = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = MOCK_COMPLAINTS.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.ticketId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="glass-card rounded-xl p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title or ticket ID..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm text-foreground"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground"
        >
          <option value="all">All Status</option>
          <option value="Pending Review">Pending</option>
          <option value="Under Investigation">Under Investigation</option>
          <option value="Community Review">Community Review</option>
          <option value="Escalated">Escalated</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-5 hover-glow transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="text-xs font-mono text-primary font-semibold">{c.ticketId}</span>
                  <StatusBadge status={c.status} />
                  <UrgencyBadge urgency={c.urgency} />
                  {c.anonymous && (
                    <span className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">Anonymous</span>
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span>{c.anonymous ? 'Anonymous' : c.studentName}</span>
                  <span>·</span>
                  <span>{c.department}</span>
                  <span>·</span>
                  <span>{c.category}</span>
                  <span>·</span>
                  <span>{new Date(c.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
              <div className="flex-shrink-0 text-right space-y-2">
                <AIRiskMeter score={c.aiRiskScore || 0} />
                <p className="text-xs text-muted-foreground">{c.aiSentiment}</p>
                {c.aiDuplicate && (
                  <span className="text-xs px-2 py-0.5 bg-warning/10 text-warning rounded-full">Duplicate Flag</span>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {c.timeline.map((t, idx) => (
                  <div key={t.id} className="flex items-center gap-2 flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full ${idx === c.timeline.length - 1 ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{t.action}</span>
                    {idx < c.timeline.length - 1 && <div className="w-8 h-px bg-border" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsList;
