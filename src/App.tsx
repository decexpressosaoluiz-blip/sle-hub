import React, { useState, useEffect } from 'react';
import { Project } from './types';
import { ProjectCard } from './components/ProjectCard';
import { Header } from './components/Header';
import { MovingParticles } from './components/MovingParticles';
import { Users, FileText, TrendingUp, PackageCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// External link configuration with updated details
const PROJECTS: Project[] = [
  {
    id: 'clientes',
    name: 'Painel de Clientes',
    description: 'Gestão da base de clientes e CRM.',
    details: 'Acesse o histórico completo de interações, novos leads e status da carteira de clientes em tempo real.',
    url: 'https://clientes-overview.vercel.app/',
    icon: Users,
    colorTheme: 'blue'
  },
  {
    id: 'faturamento',
    name: 'Faturamento',
    description: 'Controle financeiro e emissão de CTe.',
    details: 'Visualize notas fiscais, fluxo de caixa, pagamentos pendentes e relatórios financeiros consolidados.',
    url: 'https://painel-faturamento.vercel.app/',
    icon: FileText,
    colorTheme: 'red'
  },
  {
    id: 'vendas',
    name: 'Monitor de Vendas',
    description: 'Metas comerciais e performance.',
    details: 'Acompanhe KPIs de vendas, desempenho individual da equipe comercial e projeções mensais.',
    url: 'https://dashboard-metas.vercel.app/',
    icon: TrendingUp,
    colorTheme: 'blue'
  },
  {
    id: 'redespacho',
    name: 'Redespacho',
    description: 'Logística de entrega e parceiros.',
    details: 'Monitore cargas redespachadas, status de entregas com parceiros e ocorrências logísticas.',
    url: 'https://sle-redespacho-25.lovable.app/',
    icon: PackageCheck,
    colorTheme: 'red'
  }
];

const App: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Handle Dark Mode Class on Body/HTML
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen w-full relative overflow-hidden flex flex-col transition-colors duration-500 ${isDark ? 'bg-sle-dark' : 'bg-sle-lightBg'}`}>
      
      {/* Background Layer with Fallback and Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Fallback Gradient/Image shown while video loads to prevent white flash */}
        <div className={`absolute inset-0 bg-gradient-to-b from-sle-dark to-sle-primaryDark transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`} />

        {/* Dark Mode Overlay */}
        <div className={`absolute inset-0 bg-sle-dark/80 transition-opacity duration-1000 ${isDark ? 'opacity-80' : 'opacity-0'} z-10`} />
        
        {/* Light Mode Overlay (white wash over video) */}
        <div className={`absolute inset-0 bg-sle-lightBg/90 transition-opacity duration-1000 ${isDark ? 'opacity-0' : 'opacity-90'} z-10`} />

        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover fixed top-0 left-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-50' : 'opacity-0'} grayscale`}
          // Optional: Add a poster image here for even better loading perception
          // poster="/path/to/poster.jpg" 
        >
          {/* Traffic timelapse for movement */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-highway-at-night-seen-from-above-43048-large.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Overlay for brand alignment */}
        <div className={`absolute inset-0 bg-gradient-to-t from-sle-dark via-transparent to-transparent mix-blend-multiply transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-20'} z-10`} />
        
        {/* Particles Component */}
        <div className="relative z-10 w-full h-full">
            <MovingParticles />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col min-h-screen">
        <Header isDark={isDark} toggleTheme={toggleTheme} />

        <main className="flex-grow flex flex-col items-center justify-start px-4 sm:px-6 md:px-12 py-10 md:py-16">
          
          <AnimatePresence>
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full max-w-[1400px] mx-auto"
            >
              
              {/* Hero Text */}
              <div className="text-center mb-16 md:mb-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-3 px-4 py-1.5 rounded-full bg-sle-secondary/10 dark:bg-white/10 border border-sle-secondary/20 dark:border-white/10 backdrop-blur-md"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-sle-secondary dark:text-white">Central de Operações</span>
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-4xl md:text-5xl lg:text-7xl font-black text-sle-primaryDark dark:text-white tracking-tight mb-4 md:mb-6 leading-tight"
                >
                  Painel de <span className="text-transparent bg-clip-text bg-gradient-to-r from-sle-secondary via-sle-secondaryLight to-orange-500 animate-gradient-x">Resultados</span>
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-base md:text-lg text-sle-primary/70 dark:text-sle-light/70 max-w-2xl mx-auto px-4"
                >
                  Acesse todas as ferramentas estratégicas e operacionais da São Luiz Express em um ambiente integrado.
                </motion.p>
              </div>

              {/* Grid of Projects (No Search Bar) */}
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 auto-rows-fr"
              >
                {PROJECTS.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </motion.div>

            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="w-full py-6 text-center relative z-20 border-t border-sle-primary/10 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-sm mt-auto">
          <p className="text-sle-primary/40 dark:text-sle-light/40 text-sm font-medium">
            © {new Date().getFullYear()} São Luiz Express. Logística Inteligente.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;