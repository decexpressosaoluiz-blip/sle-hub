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
      transition={{ duration: 0.8 }}
      className="w-full py-6 px-4 sm:px-8 md:px-12 flex justify-between items-center relative z-20"
    >
      <div className="flex items-center gap-3">
        <motion.div 
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="bg-sle-secondary p-2.5 rounded-xl shadow-lg shadow-sle-secondary/30"
        >
          <Truck className="text-white w-6 h-6 md:w-8 md:h-8" />
        </motion.div>
        <div>
          <h1 className="text-xl md:text-3xl font-extrabold text-sle-primaryDark dark:text-white tracking-tighter leading-none">
            SÃO LUIZ <span className="text-sle-secondary">EXPRESS</span>
          </h1>
          <p className="text-sle-primary/60 dark:text-sle-light/60 text-[10px] md:text-xs tracking-[0.2em] uppercase hidden sm:block font-semibold">
            Logística Inteligente & Transporte
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-white dark:bg-white/10 border border-sle-primary/10 dark:border-white/10 text-sle-primary dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 transition-all shadow-sm"
          aria-label="Alternar tema"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 backdrop-blur-sm border border-sle-primary/10 dark:border-white/10 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-xs font-bold text-sle-primary dark:text-white/90">ONLINE</span>
        </div>
      </div>
    </motion.header>
  );
};