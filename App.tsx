import React, { useState, useEffect } from 'react';
import { Project } from './types';
import { ProjectCard } from './components/ProjectCard';
import { Header } from './components/Header';
import { MovingParticles } from './components/MovingParticles';
import { Users, FileText, TrendingUp, PackageCheck, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS: Project[] = [
  {
    id: 'faturamento',
    name: 'Faturamento',
    description: 'Financeiro e Emissões.',
    details: 'Controle de faturamento, CTe e fluxo financeiro consolidado.',
    url: 'https://painel-faturamento.vercel.app/',
    icon: FileText,
    colorTheme: 'red'
  },
  {
    id: 'pendencias',
    name: 'Pendências',
    description: 'Gestão de Ocorrências.',
    details: 'Monitoramento de devoluções e pendências de entrega críticas.',
    url: 'https://pendencias-sle.vercel.app/#/login',
    icon: ClipboardList,
    colorTheme: 'blue'
  },
  {
    id: 'clientes',
    name: 'Painel de Clientes',
    description: 'CRM e Relacionamento.',
    details: 'Inteligência de mercado e gestão da base ativa de clientes.',
    url: 'https://clientes-overview.vercel.app/',
    icon: Users,
    colorTheme: 'blue'
  },
  {
    id: 'comercial-operacional',
    name: 'Monitor Estratégico',
    description: 'Qualidade e KPIs.',
    details: 'Performance operacional e indicadores comerciais de alto nível.',
    url: 'https://campanha-qualidade.vercel.app/',
    icon: TrendingUp,
    colorTheme: 'blue'
  },
  {
    id: 'redespacho',
    name: 'Redespacho',
    description: 'Logística de Parceiros.',
    details: 'Integração e monitoramento de cargas via redespachadores.',
    url: 'https://sle-redespacho-25.lovable.app/',
    icon: PackageCheck,
    colorTheme: 'red'
  }
];

const App: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className={`min-h-screen w-full relative flex flex-col transition-all duration-1000 ease-in-out ${isDark ? 'bg-sle-dark text-white' : 'bg-sle-light text-sle-dark'}`}>
      
      {/* Background System */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Sync Transition Overlays */}
        <motion.div 
          animate={{ opacity: isDark ? 0.8 : 0.95 }}
          className={`absolute inset-0 z-10 transition-colors duration-700 ${isDark ? 'bg-sle-dark' : 'bg-sle-light'}`} 
        />

        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover fixed top-0 left-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-20' : 'opacity-0'} grayscale`}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-highway-at-night-seen-from-above-43048-large.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 z-10">
            <MovingParticles isDark={isDark} />
        </div>

        {/* Brand Accents */}
        <div className={`absolute top-0 right-0 w-[50%] h-[50%] blur-[160px] rounded-full transition-opacity duration-1000 ${isDark ? 'bg-sle-primary/10 opacity-100' : 'bg-sle-primary/5 opacity-50'}`} />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col min-h-screen">
        <Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

        <main className="flex-grow flex flex-col items-center justify-center px-6 sm:px-12 py-12 lg:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-[1750px] mx-auto"
          >
            <div className="text-center mb-16 lg:mb-24">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-7xl lg:text-8xl font-[900] tracking-tighter mb-4"
              >
                Gestão <span className="text-sle-secondary inline-block hover:scale-105 transition-transform duration-500 cursor-default">Logística</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`text-lg md:text-xl font-medium max-w-xl mx-auto opacity-60`}
              >
                Hub estratégico para monitoramento de indicadores e ferramentas São Luiz Express.
              </motion.p>
            </div>

            {/* Responsive Grid System: 1 to 5 cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
              {PROJECTS.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} isDark={isDark} />
              ))}
            </div>
          </motion.div>
        </main>

        <footer className="w-full py-12 flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative px-10 py-5 rounded-full overflow-hidden transition-all duration-300 border border-white/5 glass-container`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sle-primary/10 to-sle-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className={`text-xs font-black tracking-[0.4em] uppercase transition-colors ${isDark ? 'text-white/30 group-hover:text-white/60' : 'text-sle-dark/40 group-hover:text-sle-dark/80'}`}>
              São Luiz Express • Tecnologia & Inteligência
            </p>
          </motion.button>
        </footer>
      </div>
    </div>
  );
};

export default App;