import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { DEMO_USERS, UserRole } from '@/lib/types';
import { Shield, Users, GraduationCap, Building2, Eye, UserCheck, ArrowRight, Sparkles, Lock, ChevronDown } from 'lucide-react';
import sunvaiLogo from '@/assets/sunvai-logo.png';
import kgrcetLogo from '@/assets/kgrcet-logo.png';
import ThemeToggle from '@/components/ThemeToggle';

const roleConfig: Record<UserRole, {
  icon: React.ElementType;
  label: string;
  tagline: string;
  gradient: string;
  bgAccent: string;
  iconBg: string;
}> = {
  student: {
    icon: GraduationCap,
    label: 'Student',
    tagline: 'Submit & track your grievances',
    gradient: 'from-emerald-500 to-teal-600',
    bgAccent: 'bg-emerald-500/10 border-emerald-500/20',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
  },
  faculty: {
    icon: Users,
    label: 'Faculty',
    tagline: 'Review assigned complaints',
    gradient: 'from-blue-500 to-indigo-600',
    bgAccent: 'bg-blue-500/10 border-blue-500/20',
    iconBg: 'bg-blue-500/20 text-blue-400',
  },
  hod: {
    icon: Building2,
    label: 'Head of Department',
    tagline: 'Manage departmental issues',
    gradient: 'from-violet-500 to-purple-600',
    bgAccent: 'bg-violet-500/10 border-violet-500/20',
    iconBg: 'bg-violet-500/20 text-violet-400',
  },
  committee: {
    icon: UserCheck,
    label: 'Committee Member',
    tagline: 'Evaluate escalated cases',
    gradient: 'from-amber-500 to-orange-600',
    bgAccent: 'bg-amber-500/10 border-amber-500/20',
    iconBg: 'bg-amber-500/20 text-amber-400',
  },
  admin: {
    icon: Shield,
    label: 'Admin / Principal',
    tagline: 'Full system governance',
    gradient: 'from-rose-500 to-red-600',
    bgAccent: 'bg-rose-500/10 border-rose-500/20',
    iconBg: 'bg-rose-500/20 text-rose-400',
  },
  ombudsman: {
    icon: Eye,
    label: 'Ombudsman',
    tagline: 'Independent oversight',
    gradient: 'from-cyan-500 to-sky-600',
    bgAccent: 'bg-cyan-500/10 border-cyan-500/20',
    iconBg: 'bg-cyan-500/20 text-cyan-400',
  },
};

const roleOrder: UserRole[] = ['student', 'faculty', 'hod', 'committee', 'admin', 'ombudsman'];

const LoginPage = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [hoveredRole, setHoveredRole] = useState<UserRole | null>(null);

  const filteredUsers = selectedRole ? DEMO_USERS.filter(u => u.role === selectedRole) : [];
  const activeConfig = selectedRole ? roleConfig[selectedRole] : null;

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl"
        />
      </div>

      {/* Glass Header */}
      <header className="glass-header sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.img
            src={sunvaiLogo}
            alt="Sunvai"
            className="h-10 w-10"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <div>
            <h1 className="text-lg font-bold font-display text-foreground">SUNVAI</h1>
            <p className="text-xs text-muted-foreground">Student Grievance System</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <motion.img
            src={kgrcetLogo}
            alt="KGRCET"
            className="h-10 w-10"
            whileHover={{ rotate: -10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-foreground">KGRCET</p>
            <p className="text-xs text-muted-foreground">Hyderabad, Telangana</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-5xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative inline-block mb-6"
            >
              <img src={sunvaiLogo} alt="Sunvai" className="h-24 w-24 mx-auto relative z-10" />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
              />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-gradient mb-3">
              Welcome to SUNVAI
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Your Voice, Our Priority. Resolving Concerns, Building Trust.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 mt-4"
            >
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Secure Role-Based Access Portal</span>
            </motion.div>
          </motion.div>

          {/* Role Cards — Bento Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center mb-6 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              Choose Your Portal
              <Sparkles className="h-4 w-4" />
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {roleOrder.map((role, i) => {
                const config = roleConfig[role];
                const Icon = config.icon;
                const isSelected = selectedRole === role;
                const isHovered = hoveredRole === role;
                return (
                  <motion.button
                    key={role}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, type: 'spring', stiffness: 200 }}
                    onClick={() => setSelectedRole(role)}
                    onMouseEnter={() => setHoveredRole(role)}
                    onMouseLeave={() => setHoveredRole(null)}
                    className={`relative group rounded-2xl p-6 text-left transition-all duration-500 cursor-pointer border overflow-hidden ${
                      isSelected
                        ? `${config.bgAccent} border-2 shadow-2xl scale-[1.02]`
                        : 'glass-card border-border/50 hover:border-border hover:shadow-xl'
                    }`}
                  >
                    {/* Glow effect on hover */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isSelected || isHovered ? 1 : 0,
                        scale: isSelected ? 1.5 : 1,
                      }}
                      className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${config.gradient} rounded-full blur-3xl opacity-20 pointer-events-none`}
                    />

                    <div className="relative z-10">
                      <motion.div
                        animate={isSelected ? { rotate: [0, -10, 10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                          isSelected
                            ? `bg-gradient-to-br ${config.gradient} text-white shadow-lg`
                            : config.iconBg
                        }`}
                      >
                        <Icon className="h-7 w-7" />
                      </motion.div>
                      <p className="text-base font-bold text-foreground mb-1">{config.label}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{config.tagline}</p>

                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 flex items-center gap-1 text-xs font-semibold"
                          style={{ color: 'hsl(var(--primary))' }}
                        >
                          <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
                          Select account below
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* User Selection Panel */}
          <AnimatePresence mode="wait">
            {selectedRole && activeConfig && (
              <motion.div
                key={selectedRole}
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
                className="overflow-hidden"
              >
                <div className="glass-card rounded-2xl border border-border/50 overflow-hidden">
                  {/* Panel Header */}
                  <div className={`bg-gradient-to-r ${activeConfig.gradient} px-6 py-4`}>
                    <div className="flex items-center gap-3">
                      <activeConfig.icon className="h-5 w-5 text-white" />
                      <div>
                        <h3 className="text-white font-bold text-sm">
                          {activeConfig.label} Portal
                        </h3>
                        <p className="text-white/70 text-xs">{activeConfig.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* User List */}
                  <div className="p-4 space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                      Select Demo Account
                    </p>
                    {filteredUsers.map((user, idx) => (
                      <motion.button
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, type: 'spring' }}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => login(user.id)}
                        className="w-full p-4 rounded-xl flex items-center gap-4 cursor-pointer text-left transition-all duration-300 group border border-transparent hover:border-border hover:bg-muted/50 hover:shadow-lg"
                      >
                        <motion.div
                          whileHover={{ rotate: 5 }}
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeConfig.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0`}
                        >
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                            {user.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {user.rollNumber || user.employeeId} · {user.department}
                          </p>
                        </div>
                        <motion.div
                          className="flex items-center gap-1 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ x: 3 }}
                        >
                          Enter
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="relative z-10 text-center py-4 text-xs text-muted-foreground border-t border-border">
        <p>KG Reddy College of Engineering & Technology · Hyderabad, Telangana</p>
        <p className="mt-1 opacity-60">Governing Grievance Committee · © 2026 SUNVAI</p>
      </footer>
    </div>
  );
};

export default LoginPage;
