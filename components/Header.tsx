import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-10 px-8 sm:px-16 flex justify-between items-center relative z-20"
    >
      <div className="flex items-center gap-5">
        <motion.div 
            whileHover={{ rotate: -5, scale: 1.05 }}
            className="bg-sle-secondary p-2.5 rounded-xl shadow-xl shadow-sle-secondary/20"
        >
          <Truck className="text-white w-6 h-6" />
        </motion.div>
        <div>
          <h1 className="text-lg md:text-xl font-black tracking-tight flex flex-col md:flex-row md:gap-1">
            <span className={isDark ? 'text-white/90' : 'text-sle-dark'}>SÃO LUIZ</span>
            <span className="text-sle-secondary">EXPRESS</span>
          </h1>
          <div className="h-[2px] w-full bg-gradient-to-r from-sle-secondary to-transparent mt-0.5 opacity-50" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-sle-dark/50'}`}>Nodes Ativos</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className={`p-3 rounded-2xl border transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-sle-dark/5 border-sle-dark/10 text-sle-dark'}`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>
    </motion.header>
  );
};