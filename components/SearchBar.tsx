import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative w-full max-w-md mx-auto mb-10 group"
    >
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-sle-primary/60 dark:text-sle-light/40 group-focus-within:text-sle-secondary transition-colors" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar projeto ou painel..."
        className="block w-full pl-11 pr-4 py-4 rounded-2xl 
                   bg-white/80 dark:bg-sle-dark/60 
                   border border-sle-primary/10 dark:border-white/10
                   text-sle-primaryDark dark:text-white
                   placeholder-sle-primary/40 dark:placeholder-sle-light/30
                   focus:outline-none focus:ring-2 focus:ring-sle-secondary/50 focus:border-transparent
                   backdrop-blur-md shadow-lg transition-all duration-300"
      />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sle-primary/20 to-sle-secondary/20 opacity-0 group-hover:opacity-100 -z-10 blur-md transition-opacity duration-300" />
    </motion.div>
  );
};