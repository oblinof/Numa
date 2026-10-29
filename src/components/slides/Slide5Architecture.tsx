import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, CheckCircle2, ChevronRight, ShieldCheck, Zap } from 'lucide-react';
import { ARCHITECTURE_STEPS } from '../../data/presentationData';
import { audioEngine } from '../../utils/audioEngine';

export const Slide5Architecture: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleStepClick = (index: number) => {
    audioEngine.playTapClick();
    setActiveStep(index);
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
          <Zap className="w-3.5 h-3.5" />
          <span>05 · Ejecución Integral</span>
        </div>

        <h2 className="text-2xl font-display font-semibold tracking-tight text-white leading-snug">
          Nos encargamos del <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">100%</span> de la arquitectura
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
          Desde la curaduría artística hasta la logística y el montaje en cualquier escenario: ya sea una playa secreta en el sur, un bosque en el norte o un salón exclusivo en la Lagoa.
        </p>
      </motion.div>

      {/* Interactive Process Pipeline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="my-3 space-y-2.5"
      >
        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          Fases del Despliegue Llave en Mano
        </div>

        <div className="space-y-1.5">
          {ARCHITECTURE_STEPS.map((step: { number: string; title: string; description: string }, idx: number) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => handleStepClick(idx)}
                className={`w-full p-2.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between ${
                  isActive
                    ? 'bg-slate-900 border-emerald-500/40 shadow-sm ring-1 ring-emerald-500/20'
                    : 'bg-slate-900/40 border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`text-xs font-medium truncate ${
                      isActive ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? 'rotate-90 text-emerald-400' : 'text-slate-500'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Expanded Active Step Detail */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/20 text-xs text-slate-300 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
              Detalle Operativo
            </span>
            <span className="text-slate-600">·</span>
            <span className="font-semibold text-white">
              {ARCHITECTURE_STEPS[activeStep].title}
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed pt-1">
            {ARCHITECTURE_STEPS[activeStep].description}
          </p>
        </div>

        {/* Guarantee Banner */}
        <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-light text-[11px]">
            Cero residuo, energía solar autónoma y protocolos no invasivos en reservas naturales.
          </span>
        </div>
      </motion.div>

      {/* Footer Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono"
      >
        <span>El Portal</span>
        <span className="text-emerald-400 flex items-center gap-1">
          El Llamado a la Magia →
        </span>
      </motion.div>
    </div>
  );
};
