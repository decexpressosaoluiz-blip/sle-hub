import React, { useState } from 'react';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, translateY: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between p-6 rounded-2xl overflow-hidden h-[340px] shadow-xl glass-card transition-all duration-300"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-4 right-4 bg-black/90 text-white p-3 rounded-xl text-[11px] z-50 border border-white/10 pointer-events-none max-w-[160px]"
          >
             <p>{project.details}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-lg transition-transform group-hover:scale-110 ${
          project.colorTheme === 'red' 
            ? 'bg-sle-secondary text-white' 
            : 'bg-sle-primary text-white'
        }`}>
          <project.icon size={24} />
        </div>

        <h3 className="text-xl font-bold mb-2 leading-tight">
          {project.name}
        </h3>
        
        <p className="opacity-70 text-sm">
          {project.description}
        </p>
      </div>

      <div className="relative z-10 pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
         <span className="text-[10px] font-bold uppercase tracking-wider opacity-40">
          Acessar Painel
        </span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-sle-secondary" />
      </div>
    </motion.a>
  );
};