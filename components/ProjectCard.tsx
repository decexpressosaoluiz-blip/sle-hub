import React, { useState, useRef, MouseEvent } from 'react';
import { Project } from '../types';
import { ArrowRight, Info } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const springScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const iconY = useTransform(springScroll, [0, 1], [10, -10]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    }
  };

  return (
    <motion.a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, translateY: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col justify-between p-6 rounded-2xl overflow-hidden transition-all duration-300 h-[360px] shadow-lg hover:shadow-2xl 
        ${project.colorTheme === 'red' ? 'hover:shadow-sle-secondary/20' : 'hover:shadow-sle-primary/20'}
        bg-white dark:bg-gradient-to-br dark:from-sle-dark/95 dark:to-sle-primary/30
        border border-sle-primary/10 dark:border-white/10 backdrop-blur-lg
      `}
    >
      {/* Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-sle-secondary/20 animate-ping pointer-events-none"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: '40px',
            height: '40px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-4 right-4 bg-sle-darker/90 text-white p-2 rounded-lg text-[10px] z-50 border border-white/10 pointer-events-none max-w-[150px]"
          >
             <p>{project.details}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex-grow">
        <motion.div 
          style={{ y: iconY }}
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-inner transition-all duration-300 group-hover:scale-110 ${
          project.colorTheme === 'red' 
            ? 'bg-red-50 text-sle-secondary dark:bg-sle-secondary/20 group-hover:bg-sle-secondary group-hover:text-white' 
            : 'bg-blue-50 text-sle-primary dark:bg-sle-primary/20 group-hover:bg-sle-primary group-hover:text-white'
        }`}>
          <project.icon size={24} />
        </motion.div>

        <h3 className="text-xl font-bold text-sle-primaryDark dark:text-white mb-2 leading-tight">
          {project.name}
        </h3>
        
        <p className="text-sle-primaryDark/60 dark:text-sle-light/70 text-xs leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="relative z-10 mt-auto pt-4 border-t border-sle-primary/5 dark:border-white/5">
        <div className="flex items-center justify-between">
           <span className="text-[9px] font-black uppercase tracking-widest text-sle-primary/40 dark:text-white/40 group-hover:text-sle-secondary transition-colors">
            Acessar Painel
          </span>
          <div className={`p-2 rounded-full transition-all duration-300 ${project.colorTheme === 'red' ? 'bg-red-50 dark:bg-white/5 group-hover:bg-sle-secondary' : 'bg-blue-50 dark:bg-white/5 group-hover:bg-sle-primary'}`}>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform group-hover:text-white" />
          </div>
        </div>
      </div>
    </motion.a>
  );
};