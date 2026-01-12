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
    description: 'Controle financeiro e emissão de CTe.',
    details: 'Visualize notas fiscais, fluxo de caixa, pagamentos pendentes e relatórios financeiros consolidados.',
    url: 'https://painel-faturamento.vercel.app/',
    icon: FileText,
    colorTheme: 'red'
  },
  {
    id: 'pendencias',
    name: 'Pendências',
    description: 'Resolução de pendências e ocorrências.',
    details: 'Gerencie devoluções, ocorrências de entrega e pendências logísticas em um painel centralizado.',
    url: 'https://pendencias-sle.vercel.app/#/login',
    icon: ClipboardList,
    colorTheme: 'blue'
  },
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
    id: 'comercial-operacional',
    name: 'Monitor Comercial / Operacional',
    description: 'Indicadores comerciais e qualidade operacional.',
    details: 'Acompanhe KPIs de vendas, performance da equipe e métricas de qualidade operacional em tempo real.',
    url: 'https://campanha-qualidade.vercel.app/',
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
    <div className={`min-h-screen w-full relative overflow-hidden flex flex-col transition-colors duration-500 ${isDark ? 'bg-sle-dark text-white' : 'bg-sle-lightBg text-sle-primaryDark'}`}>
      
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className={`absolute inset-0 bg-sle-dark transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`} />
        
        <div className={`absolute inset-0 bg-sle-dark/70 transition-opacity duration-1000 ${isDark ? 'opacity-70' : 'opacity-0'} z-10`} />
        <div className={`absolute inset-0 bg-sle-lightBg/95 transition-opacity duration-1000 ${isDark ? 'opacity-0' : 'opacity-95'} z-10`} />

        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover fixed top-0 left-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-40' : 'opacity-0'} grayscale scale-105`}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-highway-at-night-seen-from-above-43048-large.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 w-full h-full">
            <MovingParticles />
        </div>
      </div>

      <div className="relative z-20 flex flex-col min-h-screen">
        <Header isDark={isDark} toggleTheme={toggleTheme} />

        <main className="flex-grow flex flex-col items-center justify-start px-4 sm:px-6 md:px-12 py-10 md:py-16">
          <AnimatePresence>
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-[1700px] mx-auto"
            >
              <div className="text-center mb-12 md:mb-16">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-black tracking-tight mb-4"
                >
                  Painel de <span className="text-sle-secondary">Resultados</span>
                </motion.h2>
                <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-sle-primaryDark/60'}`}>
                  Central de ferramentas e indicadores estratégicos da São Luiz Express.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {PROJECTS.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className={`w-full py-6 text-center border-t border-white/5 backdrop-blur-md mt-auto ${isDark ? 'bg-black/20 text-white/40' : 'bg-white/40 text-sle-primaryDark/40'}`}>
          <p className="text-sm font-medium">
            © {new Date().getFullYear()} São Luiz Express. Logística Inteligente.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;