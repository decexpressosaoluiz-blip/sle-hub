import React from 'react';
import { motion } from 'framer-motion';

export const MovingParticles: React.FC = () => {
  const particles = Array.from({ length: 25 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] h-[100px] bg-gradient-to-b from-transparent via-sle-secondary/30 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-100px',
          }}
          animate={{
            top: ['-10%', '110%'],
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
      
      {/* Floating lights */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1 h-1 rounded-full bg-sle-primary/20 dark:bg-white/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.1, 0.5, 0.1]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};