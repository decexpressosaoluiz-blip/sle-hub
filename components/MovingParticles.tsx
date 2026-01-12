import React from 'react';
import { motion } from 'framer-motion';

export const MovingParticles: React.FC = () => {
  // Generate random particles
  const particles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => {
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-sle-primary/30 dark:bg-white/20"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -1000], // Move upwards (like driving forward on a road)
              opacity: [0, 1, 0],
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
      
      {/* Speed lines for transport effect */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
         {[...Array(5)].map((_, i) => (
             <motion.div
                key={`line-${i}`}
                className="absolute w-[1px] h-[200px] bg-gradient-to-b from-transparent via-sle-secondary to-transparent"
                style={{
                    left: `${20 * (i + 1)}%`,
                    top: '-200px'
                }}
                animate={{
                    top: ['-20%', '120%']
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "linear"
                }}
             />
         ))}
      </div>
    </div>
  );
};