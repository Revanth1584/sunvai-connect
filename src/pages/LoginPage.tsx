import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { DEMO_USERS, UserRole } from '@/lib/types';
import { Shield, Users, GraduationCap, Building2, Eye, UserCheck } from 'lucide-react';
import sunvaiLogo from '@/assets/sunvai-logo.png';
import kgrcetLogo from '@/assets/kgrcet-logo.png';

const roleIcons: Record<UserRole, React.ReactNode> = {
  student: <GraduationCap className="h-5 w-5" />,
  faculty: <Users className="h-5 w-5" />,
  hod: <Building2 className="h-5 w-5" />,
  committee: <UserCheck className="h-5 w-5" />,
  admin: <Shield className="h-5 w-5" />,
  ombudsman: <Eye className="h-5 w-5" />,
};

const roleLabels: Record<UserRole, string> = {
  student: 'Student',
  faculty: 'Faculty',
  hod: 'Head of Department',
  committee: 'Committee Member',
  admin: 'Admin / Principal',
  ombudsman: 'Ombudsman',
};

const LoginPage = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const filteredUsers = selectedRole ? DEMO_USERS.filter(u => u.role === selectedRole) : [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Glass Header */}
      <header className="glass-header sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={sunvaiLogo} alt="Sunvai" className="h-10 w-10" />
          <div>
            <h1 className="text-lg font-bold font-display text-foreground">SUNVAI</h1>
            <p className="text-xs text-muted-foreground">Student Grievance System</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img src={kgrcetLogo} alt="KGRCET" className="h-10 w-10" />
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-foreground">KGRCET</p>
            <p className="text-xs text-muted-foreground">Hyderabad, Telangana</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img src={sunvaiLogo} alt="Sunvai" className="h-20 w-20 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-3xl font-bold font-display text-gradient mb-2">Welcome to SUNVAI</h2>
            <p className="text-muted-foreground">Your Voice, Our Priority. Resolving Concerns, Building Trust.</p>
            <p className="text-sm text-muted-foreground mt-1">Select your role to access the demo portal</p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {(Object.keys(roleLabels) as UserRole[]).map((role, i) => (
              <motion.button
                key={role}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => setSelectedRole(role)}
                className={`glass-card p-4 rounded-lg text-center transition-all duration-300 hover-glow cursor-pointer ${
                  selectedRole === role ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                }`}
              >
                <div className={`mx-auto mb-2 w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedRole === role ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {roleIcons[role]}
                </div>
                <p className="text-sm font-medium text-foreground">{roleLabels[role]}</p>
              </motion.button>
            ))}
          </div>

          {/* User Selection */}
          {selectedRole && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Select Demo Account
              </h3>
              {filteredUsers.map(user => (
                <motion.button
                  key={user.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => login(user.id)}
                  className="glass-card w-full p-4 rounded-lg flex items-center gap-4 hover-glow cursor-pointer text-left transition-all hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.rollNumber || user.employeeId} · {user.department}
                    </p>
                  </div>
                  <div className="text-primary text-sm font-medium">Login →</div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </main>

      <footer className="text-center py-4 text-xs text-muted-foreground border-t border-border">
        KG Reddy College of Engineering & Technology · Hyderabad, Telangana · Governing Grievance Committee
      </footer>
    </div>
  );
};

export default LoginPage;
