import React, { useState, useRef, MouseEvent } from 'react';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index: number;
  isDark: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isDark }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (event: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      style={{ rotateX, rotateY, perspective: 1200 }}
      className={`group relative flex flex-col justify-between p-10 rounded-[2.5rem] overflow-hidden h-[400px] transition-all duration-700
        ${isDark 
          ? 'bg-sle-darkCard border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.4)]' 
          : 'bg-white border-sle-primary/5 shadow-[0_20px_50px_rgba(46,49,180,0.08)]'}
      `}
    >
      {/* Interactive Background Glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br ${
        project.colorTheme === 'red' ? 'from-sle-secondary/5 to-transparent' : 'from-sle-primary/5 to-transparent'
      }`} />

      <div className="relative z-10">
        {/* Modern Icon Container */}
        <motion.div 
          animate={isHovered ? { scale: 1.15, rotate: [0, -5, 5, 0], y: -8 } : { scale: 1, rotate: 0, y: 0 }}
          className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-10 shadow-2xl transition-all duration-500 ${
          project.colorTheme === 'red' 
            ? 'bg-sle-secondary/10 text-sle-secondary group-hover:bg-sle-secondary group-hover:text-white group-hover:shadow-sle-secondary/40' 
            : 'bg-sle-primary/10 text-sle-primary group-hover:bg-sle-primary group-hover:text-white group-hover:shadow-sle-primary/40'
        }`}>
          <project.icon size={32} strokeWidth={1.5} />
        </motion.div>

        <h3 className={`text-2xl font-[900] mb-3 tracking-tighter transition-colors duration-500 ${isDark ? 'text-white' : 'text-sle-primaryDark'}`}>
          {project.name}
        </h3>
        
        <p className={`text-sm font-medium leading-relaxed transition-colors duration-500 ${isDark ? 'text-white/40' : 'text-sle-primaryDark/50'}`}>
          {project.description}
        </p>
      </div>

      <div className="relative z-10 pt-8 border-t border-transparent group-hover:border-sle-primary/5 transition-colors">
        <div className="flex items-center justify-between mb-5">
           <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-opacity duration-500 ${isDark ? 'text-white/20 group-hover:text-white/70' : 'text-sle-primaryDark/30 group-hover:text-sle-primary'}`}>
            Acesso Hub
          </span>
          <div className={`p-4 rounded-full transition-all duration-500 ${
            project.colorTheme === 'red' ? 'bg-sle-secondary/5 group-hover:bg-sle-secondary' : 'bg-sle-primary/5 group-hover:bg-sle-primary'
          } group-hover:shadow-lg group-hover:rotate-45`}>
            <ArrowRight size={20} className="group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* Animated Progress Rail (Refined) */}
        <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-sle-primary/5'}`}>
          <motion.div 
            initial={{ width: '8%' }}
            animate={isHovered ? { width: '100%' } : { width: '20%' }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className={`h-full relative ${project.colorTheme === 'red' ? 'bg-sle-secondary' : 'bg-sle-primary'}`}
          >
            <div className="absolute inset-0 animate-stream bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </motion.div>
        </div>
      </div>
      
      {/* Tooltip Detalhado */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`absolute top-10 right-10 w-44 p-4 rounded-2xl border shadow-2xl z-20 pointer-events-none ${
              isDark ? 'bg-sle-darkCard border-white/10' : 'bg-white border-sle-primary/10'
            }`}
          >
            <p className={`text-[10px] leading-snug font-bold ${isDark ? 'text-white/60' : 'text-sle-primaryDark/70'}`}>
              {project.details}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
};