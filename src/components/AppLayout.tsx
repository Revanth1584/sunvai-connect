import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Vote, Users, LogOut,
  MessageSquarePlus, BarChart3, Shield, Eye, ChevronLeft, ChevronRight, Scale,
} from 'lucide-react';
import sunvaiLogo from '@/assets/sunvai-logo.png';
import kgrcetLogo from '@/assets/kgrcet-logo.png';
import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  if (!user) return null;

  const getLinks = () => {
    const rights = { to: '/know-your-rights', icon: Scale, label: 'Know Your Rights' };
    switch (user.role) {
      case 'student':
        return [
          { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/submit', icon: MessageSquarePlus, label: 'Submit Complaint' },
          { to: '/my-complaints', icon: FileText, label: 'My Complaints' },
          { to: '/voting', icon: Vote, label: 'Voting' },
          rights,
        ];
      case 'faculty':
        return [
          { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/my-complaints', icon: FileText, label: 'Assigned Complaints' },
          rights,
        ];
      case 'hod':
        return [
          { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/all-complaints', icon: FileText, label: 'Dept. Complaints' },
          { to: '/committee', icon: Users, label: 'Committee' },
          { to: '/analytics', icon: BarChart3, label: 'Analytics' },
          rights,
        ];
      case 'committee':
        return [
          { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/all-complaints', icon: FileText, label: 'Review Cases' },
          { to: '/committee', icon: Shield, label: 'Committee' },
          { to: '/analytics', icon: BarChart3, label: 'Analytics' },
          rights,
        ];
      case 'admin':
        return [
          { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/all-complaints', icon: FileText, label: 'All Complaints' },
          { to: '/committee', icon: Users, label: 'Committee' },
          { to: '/analytics', icon: BarChart3, label: 'Analytics' },
          rights,
        ];
      case 'ombudsman':
        return [
          { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/all-complaints', icon: Eye, label: 'Major Cases' },
          { to: '/analytics', icon: BarChart3, label: 'Analytics' },
          rights,
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 256 }}
        className="gradient-dark flex flex-col border-r border-sidebar-border h-screen sticky top-0 overflow-hidden"
      >
        <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
          <img src={sunvaiLogo} alt="Sunvai" className="h-8 w-8 flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="font-bold text-sidebar-foreground text-sm">SUNVAI</p>
                <p className="text-xs text-sidebar-foreground/60">Grievance Portal</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1">
          {links.map(link => {
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <link.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border space-y-2">
          {!collapsed && (
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/50 capitalize">{user.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent w-full transition-colors"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center p-2 rounded-lg text-sidebar-foreground/50 hover:bg-sidebar-accent w-full transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="glass-header sticky top-0 z-40 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-display font-bold text-foreground">
              {links.find(l => l.to === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <img src={kgrcetLogo} alt="KGRCET" className="h-8 w-8" />
            <span className="text-sm font-medium text-muted-foreground hidden md:inline">KGRCET, Hyderabad</span>
          </div>
        </header>
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
