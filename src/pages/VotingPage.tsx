import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_COMPLAINTS } from '@/lib/mock-data';
import { ThumbsUp, ThumbsDown, Clock, Users, AlertTriangle } from 'lucide-react';

const VotingPage = () => {
  const votable = MOCK_COMPLAINTS.filter(c => c.status === 'Community Review');
  const [voted, setVoted] = useState<Record<string, 'support' | 'reject'>>({});

  const handleVote = (id: string, type: 'support' | 'reject') => {
    setVoted(prev => ({ ...prev, [id]: type }));
  };

  const getTimeRemaining = (deadline?: string) => {
    if (!deadline) return 'N/A';
    const diff = new Date(deadline).getTime() - Date.now();
    if (diff <= 0) return 'Expired';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h remaining`;
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-5">
        <h2 className="text-xl font-bold font-display text-foreground mb-1">Community Voting</h2>
        <p className="text-sm text-muted-foreground">
          Support or reject complaints marked for community review. Your vote matters — if 60%+ support, the complaint is escalated automatically.
        </p>
      </div>

      {votable.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No complaints available for voting.</div>
      ) : (
        <div className="space-y-4">
          {votable.map((c, i) => {
            const totalVotes = c.supportVotes + c.rejectVotes;
            const supportPercent = totalVotes > 0 ? (c.supportVotes / totalVotes) * 100 : 0;
            const rejectPercent = totalVotes > 0 ? (c.rejectVotes / totalVotes) * 100 : 0;
            const participation = totalVotes > 0 ? ((totalVotes / c.totalEligibleVoters) * 100).toFixed(1) : '0';
            const hasVoted = !!voted[c.id];

            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 hover-glow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-mono text-primary font-semibold">{c.ticketId}</span>
                    <h3 className="font-semibold text-foreground mt-1">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{c.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{c.department} · {c.category}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-warning flex-shrink-0">
                    <Clock className="h-4 w-4" />
                    {getTimeRemaining(c.votingDeadline)}
                  </div>
                </div>

                {/* Voting Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3 text-success" /> {c.supportVotes} Support ({supportPercent.toFixed(0)}%)</span>
                    <span className="flex items-center gap-1">{c.rejectVotes} Reject ({rejectPercent.toFixed(0)}%) <ThumbsDown className="h-3 w-3 text-destructive" /></span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden flex">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${supportPercent}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="bg-success h-full"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${rejectPercent}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-destructive h-full"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {participation}% participation</span>
                    <span>{totalVotes}/{c.totalEligibleVoters} voted</span>
                    {supportPercent >= 60 && <span className="flex items-center gap-1 text-warning"><AlertTriangle className="h-3 w-3" /> Auto-escalation threshold met</span>}
                  </div>
                  {!hasVoted ? (
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleVote(c.id, 'support')}
                        className="flex items-center gap-1 px-4 py-2 bg-success text-success-foreground rounded-lg text-sm font-medium hover-glow"
                      >
                        <ThumbsUp className="h-4 w-4" /> Support
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleVote(c.id, 'reject')}
                        className="flex items-center gap-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium hover-glow"
                      >
                        <ThumbsDown className="h-4 w-4" /> Reject
                      </motion.button>
                    </div>
                  ) : (
                    <span className="text-sm text-primary font-medium">✓ You voted: {voted[c.id]}</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VotingPage;
