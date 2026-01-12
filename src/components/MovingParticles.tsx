import React from 'react';
import { motion } from 'framer-motion';

export const MovingParticles: React.FC = () => {
  // Generate random particles representing "Speed Lines" or "Lights"
  const speedLines = Array.from({ length: 15 });
  // Generate subtle dust particles
  const dustParticles = Array.from({ length: 10 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Fast moving speed lines (resembling passing street lights) */}
      {speedLines.map((_, i) => {
        const height = Math.random() * 80 + 20;
        const duration = Math.random() * 2 + 1; // Faster
        const delay = Math.random() * 5;
        const leftPos = Math.random() * 100;
        
        return (
          <motion.div
            key={`line-${i}`}
            className="absolute w-[2px] bg-gradient-to-b from-transparent via-sle-secondary/40 to-transparent"
            style={{
              height: height,
              left: `${leftPos}%`,
              top: '-100px',
            }}
            animate={{
              top: ['-10%', '110%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "linear",
            }}
          />
        );
      })}

      {/* Floating Dust/Wind particles (Subtle movement) */}
      {dustParticles.map((_, i) => {
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 10; // Slower
        
        return (
            <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full bg-white/10 dark:bg-white/5"
            style={{
                width: size,
                height: size,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
            }}
            animate={{
                y: [0, -100, 0],
                x: [0, 50, 0],
                opacity: [0, 0.5, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            />
        )
      })}
    </div>
  );
};