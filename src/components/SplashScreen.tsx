import { motion, AnimatePresence } from 'framer-motion';
import sunvaiLogo from '@/assets/sunvai-logo.png';
import kgrcetLogo from '@/assets/kgrcet-logo.png';

interface SplashScreenProps {
  show: boolean;
}

const SplashScreen = ({ show }: SplashScreenProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-10"
              style={{
                background: 'radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 50%)',
              }}
            />
          </div>

          <div className="relative flex flex-col items-center gap-8">
            {/* Logos */}
            <div className="flex items-center gap-8">
              <motion.div
                initial={{ x: -80, opacity: 0, scale: 0.5 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.img
                  src={sunvaiLogo}
                  alt="SUNVAI"
                  className="h-24 w-24 drop-shadow-2xl"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
                />
              </motion.div>

              {/* Divider line */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-px h-20 bg-gradient-to-b from-transparent via-primary to-transparent"
              />

              <motion.div
                initial={{ x: 80, opacity: 0, scale: 0.5 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.img
                  src={kgrcetLogo}
                  alt="KGRCET"
                  className="h-24 w-24 drop-shadow-2xl"
                  animate={{ rotateY: [0, -360] }}
                  transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>

            {/* Text */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold font-display text-gradient tracking-tight">
                SUNVAI
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-sm text-muted-foreground mt-2"
              >
                Your Voice, Our Priority
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="text-xs text-muted-foreground mt-1"
              >
                KG Reddy College of Engineering & Technology
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-48 h-1 bg-muted rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.2, repeat: 1, ease: 'easeInOut' }}
                className="h-full w-full gradient-primary rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
