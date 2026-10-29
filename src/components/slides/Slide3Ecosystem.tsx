import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Compass, Layers, CheckCircle2 } from 'lucide-react';
import { ISLAND_LOCATIONS } from '../../data/presentationData';
import { audioEngine } from '../../utils/audioEngine';

export const Slide3Ecosystem: React.FC = () => {
  const [selectedLocationId, setSelectedLocationId] = useState<string>('lagoa-conceicao');

  const selectedLoc =
    ISLAND_LOCATIONS.find((loc) => loc.id === selectedLocationId) || ISLAND_LOCATIONS[0];

  const handleSelect = (id: string) => {
    audioEngine.playTapClick();
    setSelectedLocationId(id);
  };

  return (
    <div className="flex flex-col justify-between h-full px-5 py-6 text-slate-100 relative overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2.5"
      >
        <div className="flex items-center gap-2 text-xs tracking-wider text-emerald-400 font-mono uppercase">
          <Layers className="w-3.5 h-3.5" />
          <span>03 · Modelo Ágil & Ecosistema</span>
        </div>

        <h2 className="text-2xl font-display font-semibold tracking-tight text-white leading-snug">
          Sin cuatro paredes fijas: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">
            toda la isla es nuestro lienzo
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
          A través de alianzas estratégicas con hoteles boutique, resorts de lujo, espacios culturales y locaciones naturales privilegiadas, producimos <strong className="text-white font-medium">universos efímeros llave en mano</strong>.
        </p>
      </motion.div>

      {/* Interactive Map & Locations */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="my-3 space-y-3"
      >
        {/* Visual Territory Mini-Map representation */}
        <div className="relative h-44 w-full rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-white/10 overflow-hidden p-3 flex flex-col justify-between">
          {/* Subtle stylized island contour SVG */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <svg viewBox="0 0 200 300" className="h-full max-h-40 stroke-emerald-500/40 fill-emerald-950/20">
              <path
                d="M100 20 C120 40 140 70 135 110 C130 150 150 180 140 220 C130 250 115 280 95 285 C80 275 65 240 75 190 C80 150 70 120 75 80 C80 40 90 25 100 20 Z"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              {/* Lagoa inland water body */}
              <ellipse cx="108" cy="140" rx="14" ry="24" fill="rgba(6, 182, 212, 0.25)" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <Navigation className="w-3 h-3 rotate-45" />
              Florianópolis (SC, Brasil)
            </span>
            <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/10">
              4 Polos Activos
            </span>
          </div>

          {/* Location Interactive Pins Overlay */}
          <div className="relative z-10 grid grid-cols-2 gap-2 my-auto">
            {ISLAND_LOCATIONS.map((loc) => {
              const isSelected = loc.id === selectedLocationId;
              return (
                <button
                  key={loc.id}
                  onClick={() => handleSelect(loc.id)}
                  className={`p-2 rounded-xl text-left transition-all flex items-start gap-2 border ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-white shadow-md'
                      : 'bg-black/40 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/20'
                  }`}
                >
                  <MapPin
                    className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                      isSelected ? 'text-emerald-400 fill-emerald-400/20' : 'text-slate-500'
                    }`}
                  />
                  <div className="truncate">
                    <div className="text-[11px] font-medium leading-tight truncate">{loc.name}</div>
                    <div className="text-[9px] text-slate-400 truncate">{loc.region.split('(')[0]}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Toca un polo para ver especificaciones</span>
            <span className="text-emerald-400">{selectedLoc.type}</span>
          </div>
        </div>

        {/* Selected Location Card */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>{selectedLoc.name}</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {selectedLoc.region}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-light">
            {selectedLoc.description}
          </p>

          <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{selectedLoc.specs}</span>
          </div>
        </div>
      </motion.div>

      {/* Footer Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono"
      >
        <span>Formatos de Experiencia</span>
        <span className="text-emerald-400 flex items-center gap-1">
          Ver Catálogo de Formatos →
        </span>
      </motion.div>
    </div>
  );
};
