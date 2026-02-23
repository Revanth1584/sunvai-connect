import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import { useAuth } from '@/lib/auth-context';
import { CAMPUS_MOOD_DATA } from '@/lib/mock-data';
import { Star, Heart, TrendingUp, TrendingDown, Minus, BarChart3, Smile, Meh, Frown, CheckCircle } from 'lucide-react';

const categories = ['Academics', 'Infrastructure', 'Faculty Behavior', 'Safety', 'Canteen & Facilities'] as const;
type Category = typeof categories[number];

const CampusMoodPage = () => {
  const { user } = useAuth();
  const [ratings, setRatings] = useState<Record<Category, number>>({} as any);
  const [submitted, setSubmitted] = useState(false);
  const [hovered, setHovered] = useState<{ cat: Category; star: number } | null>(null);

  const handleRate = (cat: Category, star: number) => {
    setRatings(prev => ({ ...prev, [cat]: star }));
  };

  const handleSubmit = () => {
    if (Object.keys(ratings).length === categories.length) {
      setSubmitted(true);
    }
  };

  const overallScore = CAMPUS_MOOD_DATA.overall;
  const getMoodIcon = (score: number) => {
    if (score >= 4) return <Smile className="h-8 w-8 text-success" />;
    if (score >= 3) return <Meh className="h-8 w-8 text-warning" />;
    return <Frown className="h-8 w-8 text-destructive" />;
  };

  const getTrend = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 p-6 text-white">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5" />
            <span className="text-sm font-medium text-white/80">Campus Pulse</span>
          </div>
          <h2 className="text-2xl font-bold font-display">Campus Mood Index</h2>
          <p className="text-white/70 mt-1 text-sm">Anonymous weekly pulse — how's the campus feeling?</p>
        </div>
      </motion.div>

      {/* Live Campus Health Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
          className="lg:col-span-1 glass-card rounded-xl p-6 text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-3">Campus Health Score</p>
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted) / 0.2)" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="42" fill="none"
                stroke={overallScore >= 4 ? 'hsl(152, 60%, 42%)' : overallScore >= 3 ? 'hsl(38, 92%, 50%)' : 'hsl(0, 72%, 50%)'}
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - overallScore / 5) }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold font-display text-foreground">{overallScore}</span>
              <span className="text-xs text-muted-foreground">/5.0</span>
            </div>
          </div>
          {getMoodIcon(overallScore)}
          <p className="text-xs text-muted-foreground mt-2">Based on {CAMPUS_MOOD_DATA.totalResponses} responses this week</p>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="font-semibold font-display text-foreground">Category Scores</h3>
          </div>
          <div className="space-y-4">
            {CAMPUS_MOOD_DATA.categories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{cat.name}</span>
                  <div className="flex items-center gap-2">
                    {getTrend(cat.trend)}
                    <span className={`text-xs ${cat.trend > 0 ? 'text-success' : cat.trend < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {cat.trend > 0 ? '+' : ''}{cat.trend}%
                    </span>
                    <span className="text-sm font-bold text-foreground">{cat.score}</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-muted/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(cat.score / 5) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                    className={`h-full rounded-full ${
                      cat.score >= 4 ? 'bg-success' : cat.score >= 3 ? 'bg-warning' : 'bg-destructive'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Weekly Pulse Survey (Student only) */}
      {user?.role === 'student' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-6">
          <h3 className="font-semibold font-display text-foreground mb-1">Weekly Pulse Survey</h3>
          <p className="text-xs text-muted-foreground mb-5">Rate each area (1-5 stars). Anonymous & takes 30 seconds.</p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div key="form" exit={{ opacity: 0, y: -10 }} className="space-y-5">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center justify-between">
                    <span className="text-sm text-foreground font-medium w-40">{cat}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isActive = (ratings[cat] || 0) >= star;
                        const isHoveredStar = hovered?.cat === cat && hovered.star >= star;
                        return (
                          <motion.button
                            key={star}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRate(cat, star)}
                            onMouseEnter={() => setHovered({ cat, star })}
                            onMouseLeave={() => setHovered(null)}
                            className="p-0.5"
                          >
                            <Star className={`h-7 w-7 transition-colors ${
                              isActive || isHoveredStar ? 'fill-warning text-warning' : 'text-muted-foreground/30'
                            }`} />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  disabled={Object.keys(ratings).length < categories.length}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-sm disabled:opacity-40 transition-opacity"
                >
                  Submit Anonymous Rating
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-3" />
                <p className="text-lg font-bold text-foreground">Thank you!</p>
                <p className="text-sm text-muted-foreground mt-1">Your anonymous feedback helps improve campus life.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Historical Trend */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="glass-card rounded-xl p-5">
        <h3 className="font-semibold font-display text-foreground mb-4">Weekly Mood Trend</h3>
        <div className="flex items-end gap-2 h-32">
          {CAMPUS_MOOD_DATA.weeklyTrend.map((week, i) => (
            <motion.div
              key={week.week}
              initial={{ height: 0 }}
              animate={{ height: `${(week.score / 5) * 100}%` }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="flex-1 flex flex-col items-center justify-end"
            >
              <div className={`w-full rounded-t-md ${
                week.score >= 4 ? 'bg-success' : week.score >= 3 ? 'bg-warning' : 'bg-destructive'
              }`} style={{ height: `${(week.score / 5) * 100}%`, minHeight: '8px' }} />
              <span className="text-xs text-muted-foreground mt-1.5">{week.week}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CampusMoodPage;
