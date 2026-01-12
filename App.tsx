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
    description: 'Gestão de CTe e Financeiro.',
    details: 'Controle completo de faturamento, fluxo de caixa e emissões fiscais.',
    url: 'https://painel-faturamento.vercel.app/',
    icon: FileText,
    colorTheme: 'red'
  },
  {
    id: 'pendencias',
    name: 'Pendências',
    description: 'Resolução de Ocorrências.',
    details: 'Monitoramento de devoluções, reentregas e pendências logísticas.',
    url: 'https://pendencias-sle.vercel.app/#/login',
    icon: ClipboardList,
    colorTheme: 'blue'
  },
  {
    id: 'clientes',
    name: 'Painel de Clientes',
    description: 'CRM e Base Estratégica.',
    details: 'Inteligência de mercado e gestão da carteira ativa de clientes.',
    url: 'https://clientes-overview.vercel.app/',
    icon: Users,
    colorTheme: 'blue'
  },
  {
    id: 'comercial-operacional',
    name: 'Monitor Estratégico',
    description: 'Qualidade e KPIs.',
    details: 'Indicadores de performance operacional e metas comerciais.',
    url: 'https://campanha-qualidade.vercel.app/',
    icon: TrendingUp,
    colorTheme: 'blue'
  },
  {
    id: 'redespacho',
    name: 'Redespacho',
    description: 'Integração de Parceiros.',
    details: 'Acompanhamento de cargas e entregas via redespachadores.',
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
    <div className={`min-h-screen w-full relative flex flex-col transition-all duration-1000 ease-in-out ${isDark ? 'bg-sle-dark text-white' : 'bg-sle-light text-sle-primaryDark'}`}>
      
      {/* Dynamic Background System */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ opacity: isDark ? 0.85 : 0.92 }}
          className={`absolute inset-0 z-10 transition-colors duration-1000 ${isDark ? 'bg-sle-dark' : 'bg-sle-light'}`} 
        />

        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover fixed top-0 left-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-20' : 'opacity-0'} grayscale contrast-125`}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-highway-at-night-seen-from-above-43048-large.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 z-10">
            <MovingParticles isDark={isDark} />
        </div>

        {/* Brand Accents */}
        <div className={`absolute top-0 right-0 w-[50%] h-[50%] blur-[180px] rounded-full transition-all duration-1000 ${isDark ? 'bg-sle-primary/10 opacity-80' : 'bg-sle-primary/5 opacity-40'}`} />
        <div className={`absolute bottom-0 left-0 w-[30%] h-[30%] blur-[150px] rounded-full transition-all duration-1000 ${isDark ? 'bg-sle-secondary/5 opacity-50' : 'bg-sle-secondary/10 opacity-30'}`} />
      </div>

      <div className="relative z-20 flex flex-col min-h-screen">
        <Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

        <main className="flex-grow flex flex-col items-center justify-center px-6 sm:px-12 py-10 lg:py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[1780px] mx-auto"
          >
            <div className="text-center mb-16 lg:mb-24">
              <motion.h2 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className={`text-5xl md:text-7xl lg:text-8xl font-[900] tracking-tighter mb-6 leading-none ${isDark ? 'text-white' : 'text-sle-primaryDark'}`}
              >
                Gestão <span className="text-sle-secondary italic">Logística</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`text-lg md:text-xl font-medium max-w-xl mx-auto ${isDark ? 'text-white/40' : 'text-sle-primaryDark/60'}`}
              >
                Conectando dados, pessoas e operações na São Luiz Express.
              </motion.p>
            </div>

            {/* Hub Grid - 1 to 5 Columns Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-10">
              {PROJECTS.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} isDark={isDark} />
              ))}
            </div>
          </motion.div>
        </main>

        <footer className="w-full py-12 flex justify-center mt-auto">
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(46,49,180,0.05)' }}
            whileTap={{ scale: 0.95 }}
            className={`group relative px-12 py-5 rounded-3xl overflow-hidden transition-all duration-300 border border-transparent glass-container`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-sle-primary/20 to-sle-secondary/20' : 'from-sle-primary/10 to-sle-secondary/10'} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <p className={`text-[11px] font-[900] tracking-[0.5em] uppercase transition-colors ${isDark ? 'text-white/20 group-hover:text-sle-secondary' : 'text-sle-primaryDark/30 group-hover:text-sle-primary'}`}>
              São Luiz Express • Hub Estratégico
            </p>
          </motion.button>
        </footer>
      </div>
    </div>
  );
};

export default App;