import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, Heart, Compass, Sparkles, Volume2, ShieldAlert } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

export const Slide1Diagnosis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'saturacion' | 'trascendencia'>('trascendencia');

  const handleTabChange = (tab: 'saturacion' | 'trascendencia') => {
    audioEngine.playTapClick();
    setActiveTab(tab);
  };

  const pillars = [
    {
      icon: Compass,
      title: 'Significado',
      desc: 'Narrativas que interpelan la profundidad humana y no solo el consumo.',
      tag: 'Propósito Real',
    },
    {
      icon: Eye,
      title: 'Inmersión',
      desc: 'Entornos envolventes donde la percepción y los sentidos se expanden.',
      tag: 'Atención Plena',
    },
    {
      icon: Heart,
      title: 'Comunidad',
      desc: 'Encuentros genuinos libres de poses y distracciones digitales banales.',
      tag: 'Conexión Viva',
    },
    {
      icon: Sparkles,
      title: 'Trascendencia',
      desc: 'La belleza y el misterio como vehículos de renovación interior.',
      tag: 'Arte Sagrado',
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full px-5 py-6 text-slate-100 relative overflow-y-auto">
      {/* Top Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 text-xs tracking-wider text-emerald-400 font-mono uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>01 · El Cambio de Paradigma</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-white leading-snug">
          El mundo está saturado de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">estímulos superficiales</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-light">
          Las formas tradicionales de entretenimiento y desconexión ya no resuenan. La gente busca significado, inmersión y comunidad, pero también busca <span className="text-emerald-300 font-normal">belleza y trascendencia</span>.
        </p>
      </motion.div>

      {/* Interactive Shift Comparator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="my-5 space-y-4"
      >
        {/* Toggle Pills */}
        <div className="flex p-1 bg-slate-900/80 border border-white/10 rounded-xl">
          <button
            onClick={() => handleTabChange('saturacion')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
              activeTab === 'saturacion'
                ? 'bg-rose-950/60 text-rose-300 border border-rose-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>El Viejo Modelo</span>
          </button>
          <button
            onClick={() => handleTabChange('trascendencia')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
              activeTab === 'trascendencia'
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>La Nueva Búsqueda</span>
          </button>
        </div>

        {/* Content based on tab */}
        {activeTab === 'saturacion' ? (
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-3">
            <div className="text-xs font-mono text-rose-300 tracking-wide uppercase">Diagnóstico Actual</div>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="text-rose-400 mt-0.5">✕</span>
                <span>Sobreexposición a pantallas que alienan en lugar de conectar.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-rose-400 mt-0.5">✕</span>
                <span>Clubes ruidosos con música genérica y desconexión química vacía.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-rose-400 mt-0.5">✕</span>
                <span>Eventos corporativos protocolarios sin impacto emocional duradero.</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-3 sm:p-3.5 rounded-xl bg-slate-900/60 border border-emerald-500/20 flex flex-col justify-between hover:border-emerald-400/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-emerald-400/80 font-mono">{item.tag}</span>
                  </div>
                  <div>
                    <h2 className="text-xs sm:text-sm font-semibold text-white mb-0.5">{item.title}</h2>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Bottom Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono"
      >
        <span>Desliza para descubrir nuestra respuesta</span>
        <span className="text-emerald-400 flex items-center gap-1">
          Siguiente →
        </span>
      </motion.div>
    </div>
  );
};
