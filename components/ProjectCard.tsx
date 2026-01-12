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

  // Parallax Effect Logic for Icon and BG Blur
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const springScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const iconY = useTransform(springScroll, [0, 1], [15, -15]);
  const bgY = useTransform(springScroll, [0, 1], [0, -30]);

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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, translateY: -5 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl overflow-hidden transition-all duration-300 h-[340px] shadow-xl hover:shadow-2xl 
        ${project.colorTheme === 'red' ? 'hover:shadow-sle-secondary/20' : 'hover:shadow-sle-primary/20'}
        bg-white dark:bg-gradient-to-br dark:from-sle-dark/90 dark:to-sle-primary/20
        border border-sle-primary/10 dark:border-white/10 backdrop-blur-md
      `}
    >
      {/* Ripple Effect Canvas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-sle-secondary/20 dark:bg-white/10 animate-ping"
            style={{
              top: ripple.y,
              left: ripple.x,
              width: '40px',
              height: '40px',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Tooltip on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute top-4 right-4 max-w-[80%] bg-sle-darker/95 text-white p-3 rounded-xl text-xs shadow-xl z-50 border border-white/10 pointer-events-none"
          >
             <div className="flex items-start gap-2">
                <Info size={14} className="mt-0.5 text-sle-secondary shrink-0" />
                <p>{project.details}</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-sle-primary/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      
      {/* Floating Parallax Decoration */}
      <motion.div 
        style={{ y: bgY }}
        className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-10 dark:opacity-20 transition-colors duration-500 ${project.colorTheme === 'red' ? 'bg-sle-secondary' : 'bg-sle-primary'}`} 
      />

      <div className="relative z-10 flex-grow">
        <motion.div 
          style={{ y: iconY }}
          className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg transition-all duration-300 group-hover:scale-110 ${
          project.colorTheme === 'red' 
            ? 'bg-red-50 text-sle-secondary dark:bg-sle-secondary/20 dark:text-sle-secondary group-hover:bg-sle-secondary group-hover:text-white' 
            : 'bg-blue-50 text-sle-primary dark:bg-sle-primary/20 dark:text-white group-hover:bg-sle-primary group-hover:text-white'
        }`}>
          <project.icon size={28} strokeWidth={1.5} />
        </motion.div>

        <h3 className="text-2xl font-bold text-sle-primaryDark dark:text-white mb-3 tracking-tight group-hover:text-sle-primary dark:group-hover:text-sle-light transition-colors">
          {project.name}
        </h3>
        
        <p className="text-sle-primaryDark/60 dark:text-sle-light/70 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="relative z-10 pt-4 mt-auto">
        <div className="flex items-center justify-between">
           <span className="text-[10px] font-bold uppercase tracking-wider text-sle-primary/40 dark:text-white/50 group-hover:text-sle-primary dark:group-hover:text-white transition-colors">
            Acessar Painel
          </span>
          <div className={`
            relative p-3 rounded-full transition-all duration-300 flex items-center justify-center overflow-hidden
            ${project.colorTheme === 'red' 
              ? 'bg-red-50 dark:bg-white/5 group-hover:bg-sle-secondary' 
              : 'bg-blue-50 dark:bg-white/5 group-hover:bg-sle-primary'}
          `}>
             {/* Glow Effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md ${project.colorTheme === 'red' ? 'bg-sle-secondary' : 'bg-sle-primary'}`}></div>
            
            <ArrowRight size={18} className={`relative z-10 transform group-hover:translate-x-1 transition-transform ${
                project.colorTheme === 'red'
                ? 'text-sle-secondary dark:text-white group-hover:text-white'
                : 'text-sle-primary dark:text-white group-hover:text-white'
            }`} />
          </div>
        </div>
        
        {/* Visual Progress/Loading Bar */}
        <div className="w-full h-1 bg-gray-100 dark:bg-white/10 mt-4 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: isHovered ? '100%' : '0%' }}
               className={`h-full ${project.colorTheme === 'red' ? 'bg-sle-secondary' : 'bg-sle-primary'}`} 
             />
        </div>
      </div>
    </motion.a>
  );
};