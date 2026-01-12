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

  // Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className={`group relative flex flex-col justify-between p-8 rounded-[2rem] overflow-hidden h-[380px] transition-all duration-500
        ${isDark ? 'bg-sle-darkCard border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' : 'bg-white border-sle-primary/5 shadow-xl'}
      `}
    >
      {/* Dynamic Hover Background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br ${
        project.colorTheme === 'red' ? 'from-sle-secondary/5 to-transparent' : 'from-sle-primary/5 to-transparent'
      }`} />

      <div className="relative z-10">
        {/* Icon Case with optimized Contrast */}
        <motion.div 
          animate={isHovered ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-2xl transition-all duration-500 ${
          project.colorTheme === 'red' 
            ? 'bg-sle-secondary/10 text-sle-secondary group-hover:bg-sle-secondary group-hover:text-white' 
            : 'bg-sle-primary/10 text-sle-primary group-hover:bg-sle-primary group-hover:text-white'
        }`}>
          <project.icon size={30} strokeWidth={2} />
        </motion.div>

        <h3 className={`text-2xl font-black mb-2 tracking-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-sle-dark'}`}>
          {project.name}
        </h3>
        
        <p className={`text-sm font-medium leading-relaxed transition-opacity duration-300 ${isDark ? 'text-white/40' : 'text-sle-dark/50'}`}>
          {project.description}
        </p>
      </div>

      <div className="relative z-10 pt-6">
        <div className="flex items-center justify-between mb-4">
           <span className={`text-[10px] font-black uppercase tracking-[0.25em] transition-opacity duration-300 ${isDark ? 'text-white/20 group-hover:text-white/60' : 'text-sle-dark/30 group-hover:text-sle-dark/70'}`}>
            Acesso Hub
          </span>
          <div className={`p-3.5 rounded-full transition-all duration-500 ${
            project.colorTheme === 'red' ? 'bg-sle-secondary/10 group-hover:bg-sle-secondary shadow-sle-secondary/20' : 'bg-sle-primary/10 group-hover:bg-sle-primary shadow-sle-primary/20'
          } group-hover:shadow-lg`}>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform group-hover:text-white" />
          </div>
        </div>

        {/* Logistic Stream Progress (Design Refinado) */}
        <div className={`w-full h-1 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-sle-dark/5'}`}>
          <motion.div 
            initial={{ width: '10%' }}
            animate={isHovered ? { width: '100%' } : { width: '15%' }}
            transition={{ duration: 1, ease: "circOut" }}
            className={`h-full relative ${project.colorTheme === 'red' ? 'bg-sle-secondary' : 'bg-sle-primary'}`}
          >
            <div className="absolute inset-0 animate-stream bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </motion.div>
        </div>
      </div>
      
      {/* Card Info Reveal on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-8 right-8 w-40 p-4 rounded-2xl bg-sle-dark/95 border border-white/10 shadow-2xl z-20 pointer-events-none"
          >
            <p className="text-[10px] leading-tight text-white/70 font-medium">
              {project.details}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
};