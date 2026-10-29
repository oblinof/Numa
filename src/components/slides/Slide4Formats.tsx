import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon, Sun, Briefcase, Check, ArrowRight } from 'lucide-react';
import { EXPERIENCE_FORMATS } from '../../data/presentationData';
import { ExperienceFormatId } from '../../types';
import { audioEngine } from '../../utils/audioEngine';

export const Slide4Formats: React.FC = () => {
  const [activeFormatId, setActiveFormatId] = useState<ExperienceFormatId>('night');

  const activeFormat =
    EXPERIENCE_FORMATS.find((f) => f.id === activeFormatId) || EXPERIENCE_FORMATS[0];

  const handleSelectFormat = (id: ExperienceFormatId) => {
    audioEngine.playTapClick();
    setActiveFormatId(id);
  };

  const iconsMap: Record<ExperienceFormatId, React.FC<{ className?: string }>> = {
    popups: Sparkles,
    night: Moon,
    retreats: Sun,
    brands: Briefcase,
  };

  return (
    <div className="flex flex-col justify-between h-full px-5 py-6 text-slate-100 relative overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-2 text-xs tracking-wider text-emerald-400 font-mono uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>04 · Espectro Total de Oferta</span>
        </div>

        <h2 className="text-2xl font-display font-semibold tracking-tight text-white leading-snug">
          Universos diseñados para <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">
            cada momento y escala
          </span>
        </h2>
      </motion.div>

      {/* Format Selector Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-slate-900/90 rounded-xl border border-white/10 my-2">
        {EXPERIENCE_FORMATS.map((format) => {
          const Icon = iconsMap[format.id];
          const isSelected = format.id === activeFormatId;
          return (
            <button
              key={format.id}
              onClick={() => handleSelectFormat(format.id)}
              className={`py-2 px-1 text-center rounded-lg transition-all flex flex-col items-center gap-1 ${
                isSelected
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[10px] font-medium leading-tight whitespace-nowrap truncate max-w-full">
                {format.shortLabel.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Format Showcase Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFormat.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="relative rounded-2xl bg-slate-900/80 border border-white/10 overflow-hidden my-auto flex flex-col"
        >
          {/* Card Hero Image */}
          <div className="relative h-32 w-full overflow-hidden bg-slate-950">
            <img
              src={activeFormat.image}
              alt={activeFormat.name}
              className="w-full h-full object-cover filter brightness-90 contrast-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            <div className="absolute top-2.5 left-3 text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-emerald-300">
              {activeFormat.vibe}
            </div>
          </div>

          {/* Details */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-white leading-snug">
                {activeFormat.name}
              </h3>
              <p className="text-xs text-emerald-300 font-medium pt-0.5">
                {activeFormat.headline}
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {activeFormat.description}
            </p>

            {/* Bullet Specs */}
            <div className="pt-2 border-t border-white/5 space-y-1">
              {activeFormat.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono"
      >
        <span>Arquitectura 360°</span>
        <span className="text-emerald-400 flex items-center gap-1">
          Ver Modelo de Ejecución →
        </span>
      </motion.div>
    </div>
  );
};
