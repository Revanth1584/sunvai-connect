import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-muted border border-border p-0.5 flex items-center cursor-pointer overflow-hidden"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Track background animation */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: isDark
            ? 'linear-gradient(135deg, hsl(220 30% 14%), hsl(240 20% 25%))'
            : 'linear-gradient(135deg, hsl(40 95% 80%), hsl(200 90% 85%))',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Stars for dark mode */}
      {isDark && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-1.5 left-2 w-1 h-1 bg-yellow-200 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-3 left-4 w-0.5 h-0.5 bg-yellow-100 rounded-full"
          />
        </>
      )}

      {/* Thumb */}
      <motion.div
        className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-md"
        animate={{
          x: isDark ? 26 : 0,
          backgroundColor: isDark ? '#1e293b' : '#fbbf24',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {isDark ? (
            <Moon className="h-3.5 w-3.5 text-yellow-200" />
          ) : (
            <Sun className="h-3.5 w-3.5 text-yellow-900" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
