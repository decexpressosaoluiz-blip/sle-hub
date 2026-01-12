import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  isDark: boolean;
}

export const MovingParticles: React.FC<Props> = ({ isDark }) => {
  const speedLines = Array.from({ length: 30 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {speedLines.map((_, i) => (
        <motion.div
          key={`speed-${i}`}
          className={`absolute w-[1.2px] bg-gradient-to-b from-transparent to-transparent`}
          style={{
            height: Math.random() * 250 + 100,
            left: `${Math.random() * 100}%`,
            top: '-300px',
            background: `linear-gradient(to bottom, transparent, ${isDark ? 'rgba(236,27,35,0.2)' : 'rgba(236,27,35,0.1)'}, transparent)`
          }}
          animate={{
            top: ['-20%', '120%'],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Digital Noise / Logistics Data points */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`data-${i}`}
          className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-sle-primary/20' : 'bg-sle-primary/10'}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};