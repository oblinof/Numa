import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Eye, Sparkles, Edit3, Check, MapPin } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

interface Slide2Props {
  agencyName: string;
  onUpdateAgencyName: (name: string) => void;
}

export const Slide2Identity: React.FC<Slide2Props> = ({ agencyName, onUpdateAgencyName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(agencyName);
  const [selectedPillar, setSelectedPillar] = useState<number>(0);

  const pillars = [
    {
      id: 0,
      title: 'Arte Tecnológico',
      icon: Cpu,
      summary: 'Luz reactiva, sensores biométricos y código generativo.',
      detail: 'Instalaciones lumínicas que responden en tiempo real al movimiento, respiración colectiva o frecuencias sonoras del ambiente.',
      color: 'from-cyan-500/20 to-cyan-500/5',
      border: 'border-cyan-500/30',
      textAccent: 'text-cyan-400',
    },
    {
      id: 1,
      title: 'Instalaciones Inmersivas',
      icon: Eye,
      summary: 'Arquitectura efímera, sonido 360° y domos sensoriales.',
      detail: 'Diseño espacial envolvente llave en mano adaptado al microclima de Florianópolis, difuminando el límite entre naturaleza y virtualidad.',
      color: 'from-emerald-500/20 to-emerald-500/5',
      border: 'border-emerald-500/30',
      textAccent: 'text-emerald-400',
    },
    {
      id: 2,
      title: 'Bienestar Consciente',
      icon: Sparkles,
      summary: 'Rituales contemporáneos, breathwork y elixires botánicos.',
      detail: 'Integración somática profunda: la tecnología se pone al servicio del sosiego mental, la presencia lúcida y la comunidad sincera.',
      color: 'from-amber-500/20 to-amber-500/5',
      border: 'border-amber-500/30',
      textAccent: 'text-amber-400',
    },
  ];

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (tempName.trim()) {
      onUpdateAgencyName(tempName.trim());
      audioEngine.playToneChime();
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col justify-between h-full px-5 py-6 text-slate-100 relative overflow-y-auto">
      {/* Background Ambience from Generated Asset */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <img
          src="/src/assets/images/floripa_beach_portal_1793241345659.jpg"
          alt="Portal efímero en playa de Florianópolis"
          className="w-full h-full object-cover filter blur-[2px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/85 to-[#08090C]/90" />
      </div>

      {/* Header & Identity */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <MapPin className="w-3.5 h-3.5" />
            <span>Florianópolis · Ilha da Magia</span>
          </div>

          {/* Quick Edit Name Button */}
          {!isEditing ? (
            <button
              onClick={() => {
                audioEngine.playTapClick();
                setIsEditing(true);
              }}
              className="px-2.5 py-1 text-[11px] font-medium text-slate-400 hover:text-emerald-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors flex items-center gap-1.5"
              title="Personalizar nombre de tu productora"
            >
              <Edit3 className="w-3 h-3" />
              <span>Editar Nombre</span>
            </button>
          ) : null}
        </div>

        {/* Agency Name Headline */}
        <div className="pt-1">
          {isEditing ? (
            <form onSubmit={handleSave} className="flex items-center gap-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                autoFocus
                placeholder="Nombre de tu Agencia"
                className="w-full px-3 py-2 bg-slate-900 border border-emerald-500/50 rounded-xl text-lg font-display font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                className="p-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-colors shrink-0"
              >
                <Check className="w-4 h-4 font-bold" />
              </button>
            </form>
          ) : (
            <div className="flex items-baseline flex-wrap gap-2">
              <span className="text-sm text-slate-400 font-light">Nosotros somos</span>
              <span
                onClick={() => {
                  audioEngine.playTapClick();
                  setIsEditing(true);
                }}
                className="text-2xl sm:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 cursor-pointer hover:opacity-90 underline decoration-dotted decoration-emerald-500/40 underline-offset-4"
              >
                {agencyName}
              </span>
            </div>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          La primera productora de eventos en Florianópolis dedicada a fusionar el{' '}
          <strong className="text-white font-medium">arte tecnológico</strong>, las{' '}
          <strong className="text-white font-medium">instalaciones inmersivas</strong> y el{' '}
          <strong className="text-white font-medium">bienestar consciente</strong>.
        </p>

        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300 italic">
          "No hacemos eventos convencionales; diseñamos experiencias vivas y multisensoriales que transforman el entorno y a quienes lo habitan."
        </div>
      </motion.div>

      {/* Interactive 3 Pillars */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative z-10 my-4 space-y-2.5"
      >
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
          La Tríada de Experiencia (Toca para explorar)
        </div>

        <div className="grid grid-cols-3 gap-2">
          {pillars.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedPillar === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  audioEngine.playTapClick();
                  setSelectedPillar(item.id);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between h-24 ${
                  isSelected
                    ? `bg-slate-900/90 ${item.border} shadow-lg ring-1 ring-white/20`
                    : 'bg-slate-900/40 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center ${
                      isSelected ? item.textAccent : 'text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </div>
                <div className="text-[11px] font-medium text-slate-200 leading-tight">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Expanded Detail */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/20 text-xs text-slate-300 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
              Enfoque Operativo
            </span>
            <span className="text-slate-600">·</span>
            <span className="font-medium text-white">{pillars[selectedPillar].title}</span>
          </div>
          <p className="text-slate-300 leading-relaxed pt-1">
            {pillars[selectedPillar].detail}
          </p>
        </div>
      </motion.div>

      {/* Footer Navigation Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono"
      >
        <span>Ecosistema Ágil</span>
        <span className="text-emerald-400 flex items-center gap-1">
          Ver Modelo Territorial →
        </span>
      </motion.div>
    </div>
  );
};
