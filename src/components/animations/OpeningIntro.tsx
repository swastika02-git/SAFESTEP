import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

interface OpeningIntroProps {
  onComplete: () => void;
}

export const OpeningIntro: React.FC<OpeningIntroProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 400);
    }, 2400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 200);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-safestep-darker text-safestep-beige overflow-hidden select-none"
        >
          {/* Subtle animated background grid & particle lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="introGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#839958" strokeWidth="0.75" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#introGrid)" />
            </svg>
          </div>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-safestep-moss/40 text-safestep-moss hover:bg-safestep-moss/10 transition-colors z-10"
            aria-label="Skip opening animation"
          >
            Skip
          </button>

          {/* Central Logo & Forming Timeline Animation */}
          <div className="relative flex flex-col items-center z-10 max-w-sm px-6 text-center">
            {/* Forming Path turning into timeline */}
            <svg width="280" height="80" viewBox="0 0 280 80" className="mb-4">
              <motion.path
                d="M 20 40 Q 80 15 140 40 T 260 40"
                fill="none"
                stroke="#105666"
                strokeWidth="3"
                strokeDasharray="4 4"
              />
              <motion.path
                d="M 20 40 Q 80 15 140 40 T 260 40"
                fill="none"
                stroke="#839958"
                strokeWidth="3.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
              {/* Stepping Timeline Nodes */}
              <motion.circle
                cx="30"
                cy="35"
                r="5"
                fill="#839958"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              />
              <motion.circle
                cx="100"
                cy="28"
                r="5"
                fill="#839958"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
              />
              <motion.circle
                cx="180"
                cy="42"
                r="5"
                fill="#839958"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 }}
              />
              <motion.circle
                cx="250"
                cy="38"
                r="6"
                fill="#D3968C"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2 }}
              />
            </svg>

            {/* Resolving SAFESTEP Logo Shield */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="relative p-5 rounded-2xl bg-safestep-midnight/40 border border-safestep-moss/50 shadow-glow-moss mb-4"
            >
              <ShieldCheck className="w-12 h-12 text-safestep-moss animate-pulse-subtle" />
              
              {/* Scanning light line */}
              <motion.div
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-0.5 bg-safestep-beige/70 opacity-40"
              />
            </motion.div>

            {/* Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-3xl font-extrabold tracking-wider text-safestep-beige"
            >
              SAFESTEP
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-2 text-sm font-medium text-safestep-moss"
            >
              Your financial incident, reconstructed.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
