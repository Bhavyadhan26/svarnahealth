'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';

export function GlobalLoader() {
  const { progress, active } = useProgress();
  const [isReady, setIsReady] = useState(false);

  // 1. Unbreakable Safety Timer
  // Runs exactly once on mount. Guarantees the site will load after 4 seconds maximum.
  useEffect(() => {
    const safetyTimer = setTimeout(() => setIsReady(true), 4000);
    return () => clearTimeout(safetyTimer);
  }, []);

  // 2. Progress Tracker
  useEffect(() => {
    // If progress is 100, or if the loader is simply no longer active (already cached)
    if (progress >= 100 || (!active && progress === 0)) {
      const readyTimer = setTimeout(() => setIsReady(true), 800);
      return () => clearTimeout(readyTimer);
    }
  }, [progress, active]);

  // Lock scrolling while the loader is active
  useEffect(() => {
    if (!isReady) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isReady]);

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
        >
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
            className="flex flex-col items-center gap-6"
          >
          <div className="relative flex flex-col items-center">
            {/* Hollow Outline Text (Background) */}
            <h1 className="font-display text-5xl font-bold tracking-[0.2em] text-transparent [-webkit-text-stroke:1.5px_rgb(var(--color-accent)/0.4)]">
              SVARNA
            </h1>
            
            {/* Solid Filled Text (Foreground - clipped by progress) */}
            <motion.h1 
              className="absolute left-0 top-0 font-display text-5xl font-bold tracking-[0.2em] text-accent"
              style={{
                clipPath: `inset(${100 - progress}% 0 0 0)`
              }}
            >
              SVARNA
            </motion.h1>
          </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
