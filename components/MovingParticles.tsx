import React from 'react';
import { motion } from 'framer-motion';

export const MovingParticles: React.FC = () => {
  const speedLines = Array.from({ length: 20 });
  const floatingLights = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dynamic Speed Lines */}
      {speedLines.map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-sle-secondary/20 dark:via-sle-secondary/40 to-transparent"
          style={{
            height: Math.random() * 150 + 50,
            left: `${Math.random() * 100}%`,
            top: '-200px',
          }}
          animate={{
            top: ['-20%', '120%'],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Atmospheric Floating Lights */}
      {floatingLights.map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-sle-primary/30 dark:bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, 40, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};