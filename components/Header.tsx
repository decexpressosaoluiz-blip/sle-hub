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
      className="w-full py-8 px-10 sm:px-20 flex justify-between items-center relative z-20"
    >
      <div className="flex items-center gap-4">
        <motion.div 
            whileHover={{ scale: 1.1, rotate: -8 }}
            className="bg-sle-secondary p-2 rounded-xl shadow-lg shadow-sle-secondary/30"
        >
          <Truck className="text-white w-5 h-5" />
        </motion.div>
        <div>
          <h1 className="text-sm md:text-base font-black tracking-widest flex items-center gap-1.5">
            <span className={isDark ? 'text-white' : 'text-sle-primaryDark'}>SÃO LUIZ</span>
            <span className="text-sle-secondary">EXPRESS</span>
          </h1>
          <div className="h-[1px] w-full bg-sle-secondary/40 mt-1" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className={`p-3 rounded-2xl border transition-all duration-500 ${
            isDark 
              ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
              : 'bg-sle-primary/5 border-sle-primary/10 text-sle-primaryDark hover:bg-sle-primary/10'
          }`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>
    </motion.header>
  );
};