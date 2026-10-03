import React from 'react';
import { motion } from 'framer-motion';

interface WaveformProps {
  isActive?: boolean;
}

export const Waveform: React.FC<WaveformProps> = ({ isActive = true }) => {
  const bars = [12, 24, 38, 20, 44, 28, 50, 32, 18, 36, 22, 14];

  return (
    <div className="flex items-center justify-center gap-1.5 h-14 px-4 py-2 bg-safestep-darker/60 rounded-xl border border-safestep-moss/30">
      {bars.map((baseHeight, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full bg-safestep-moss"
          animate={
            isActive
              ? {
                  height: [baseHeight * 0.4, baseHeight, baseHeight * 0.3],
                }
              : { height: 6 }
          }
          transition={
            isActive
              ? {
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.07,
                  ease: 'easeInOut',
                }
              : { duration: 0.2 }
          }
        />
      ))}
    </div>
  );
};
