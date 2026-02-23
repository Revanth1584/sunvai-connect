import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { POLICY_PROPOSALS } from '@/lib/mock-data';
import { Vote, Clock, Users, CheckCircle, ThumbsUp, ThumbsDown, Megaphone, Zap } from 'lucide-react';

const PolicyVotingPage = () => {
  const [votes, setVotes] = useState<Record<string, 'yes' | 'no'>>({});

  const handleVote = (id: string, type: 'yes' | 'no') => {
    setVotes(prev => ({ ...prev, [id]: type }));
  };

  const getTimeRemaining = (deadline: string) => {
    const diff = new Date(deadline).getTime() - Date.now();
    if (diff <= 0) return 'Voting Closed';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h left`;
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Megaphone className="h-5 w-5" />
            <span className="text-sm font-medium text-white/80">Participatory Governance</span>
          </div>
          <h2 className="text-2xl font-bold font-display">Policy Voting</h2>
          <p className="text-white/70 mt-1 text-sm">
            Vote on campus policy decisions. Your voice directly influences management decisions.
          </p>
        </div>
      </motion.div>

      <div className="space-y-4">
        {POLICY_PROPOSALS.map((p, i) => {
          const totalVotes = p.yesVotes + p.noVotes;
          const yesPercent = totalVotes > 0 ? (p.yesVotes / totalVotes) * 100 : 0;
          const noPercent = totalVotes > 0 ? (p.noVotes / totalVotes) * 100 : 0;
          const hasVoted = !!votes[p.id];

          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 hover-glow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      p.category === 'Academic' ? 'bg-blue-500/10 text-blue-500' :
                      p.category === 'Infrastructure' ? 'bg-amber-500/10 text-amber-500' :
                      p.category === 'Campus Life' ? 'bg-emerald-500/10 text-emerald-500' :
                      'bg-violet-500/10 text-violet-500'
                    }`}>{p.category}</span>
                    {p.urgent && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive flex items-center gap-1">
                        <Zap className="h-3 w-3" /> Urgent
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground text-base">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">Proposed by: {p.proposedBy}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-warning flex-shrink-0 ml-4">
                  <Clock className="h-4 w-4" />
                  {getTimeRemaining(p.deadline)}
                </div>
              </div>

              {/* Voting Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3 text-success" /> {p.yesVotes} Yes ({yesPercent.toFixed(0)}%)</span>
                  <span className="flex items-center gap-1">{p.noVotes} No ({noPercent.toFixed(0)}%) <ThumbsDown className="h-3 w-3 text-destructive" /></span>
                </div>
                <div className="w-full h-3 bg-muted/20 rounded-full overflow-hidden flex">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${yesPercent}%` }} transition={{ duration: 1, delay: 0.3 }}
                    className="bg-success h-full" />
                  <motion.div initial={{ width: 0 }} animate={{ width: `${noPercent}%` }} transition={{ duration: 1, delay: 0.5 }}
                    className="bg-destructive h-full" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {totalVotes} votes</span>
                  <span>{p.eligibleVoters} eligible</span>
                </div>
                {!hasVoted ? (
                  <div className="flex gap-2">
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleVote(p.id, 'yes')}
                      className="flex items-center gap-1 px-4 py-2 bg-success text-success-foreground rounded-lg text-sm font-medium hover-glow">
                      <ThumbsUp className="h-4 w-4" /> Yes
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleVote(p.id, 'no')}
                      className="flex items-center gap-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium hover-glow">
                      <ThumbsDown className="h-4 w-4" /> No
                    </motion.button>
                  </div>
                ) : (
                  <span className="text-sm text-primary font-medium flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" /> Voted: {votes[p.id]}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PolicyVotingPage;
