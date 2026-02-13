import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { MOCK_COMPLAINTS, FACULTY_COMPLAINTS, HOD_COMPLAINTS, ALL_COMPLAINTS, OMBUDSMAN_COMPLAINTS } from '@/lib/mock-data';
import { StatusBadge, UrgencyBadge, AIRiskMeter } from '@/components/StatusBadges';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Complaint } from '@/lib/types';

const ComplaintsList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Role-based complaint source
  const getComplaints = (): Complaint[] => {
    if (user?.role === 'faculty') return FACULTY_COMPLAINTS;
    if (user?.role === 'hod') return HOD_COMPLAINTS;
    if (user?.role === 'ombudsman') return OMBUDSMAN_COMPLAINTS;
    if (user?.role === 'admin' || user?.role === 'committee') return ALL_COMPLAINTS;
    // Student: show all general complaints (my-complaints view)
    return MOCK_COMPLAINTS;
  };

  const complaints = getComplaints();

  const filtered = complaints.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.ticketId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = [...new Set(complaints.map(c => c.category))];

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
          <option value="Dismissed">Dismissed</option>
        </select>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground"
        >
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
        <span>{filtered.length} complaint{filtered.length !== 1 ? 's' : ''} found</span>
        {user?.role === 'ombudsman' && (
          <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full">Major Complaints Only</span>
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Filter className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No complaints match your filters.</p>
          </div>
        ) : filtered.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate(`/complaint/${c.id}`)}
            className="glass-card rounded-xl p-5 hover-glow transition-all cursor-pointer group"
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
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{c.title}</h3>
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
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="text-right space-y-2">
                  <AIRiskMeter score={c.aiRiskScore || 0} />
                  <p className="text-xs text-muted-foreground">{c.aiSentiment}</p>
                  {c.aiDuplicate && (
                    <span className="text-xs px-2 py-0.5 bg-warning/10 text-warning rounded-full">Duplicate</span>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>

            {/* Timeline preview */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {c.timeline.slice(-3).map((t, idx) => (
                  <div key={t.id} className="flex items-center gap-2 flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full ${idx === c.timeline.slice(-3).length - 1 ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{t.action}</span>
                    {idx < c.timeline.slice(-3).length - 1 && <div className="w-8 h-px bg-border" />}
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
