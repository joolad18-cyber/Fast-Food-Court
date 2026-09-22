import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Zap } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Quick, high-energy entrance (< 1.1s total) to respect "Fast" brand feel
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1100);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#29231F] text-[#F3E4CC]"
        >
          {/* Sizzle Steam Graphic */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.6, rotate: -8, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3, type: 'spring', damping: 14 }}
              className="relative w-20 h-20 rounded-2xl bg-[#8B2E24] flex items-center justify-center shadow-2xl border-2 border-[#D99A45]"
            >
              <Flame className="w-10 h-10 text-[#D99A45] animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D99A45] flex items-center justify-center">
                <Zap className="w-2.5 h-2.5 text-[#29231F]" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.25 }}
              className="mt-4 text-center"
            >
              <h1 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#F3E4CC]">
                FAST MEALS <span className="text-[#D99A45]">COURT</span>
              </h1>
              <p className="text-xs uppercase tracking-widest text-[#D99A45] font-bold mt-1">
                FAST. FRESH. NO COMPROMISE.
              </p>
            </motion.div>

            {/* Quick Loading Progress Bar */}
            <div className="w-48 h-1.5 bg-[#8B2E24]/40 rounded-full mt-5 overflow-hidden border border-[#D99A45]/30">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#D99A45] via-[#F3E4CC] to-[#D99A45]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
