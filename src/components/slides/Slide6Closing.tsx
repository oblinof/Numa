import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageSquare, Share2, RotateCcw, Check, Heart, Mail } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

interface Slide6Props {
  agencyName: string;
  onReset: () => void;
  onOpenNotes: () => void;
}

export const Slide6Closing: React.FC<Slide6Props> = ({ agencyName, onReset, onOpenNotes }) => {
  const [copied, setCopied] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryFormat, setInquiryFormat] = useState('night');
  const [inquiryGuests, setInquiryGuests] = useState('50-100');
  const [sentInquiry, setSentInquiry] = useState(false);

  const handleShare = async () => {
    audioEngine.playTapClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${agencyName} · Ilha da Magia`,
          text: 'Convertimos espacios ordinarios en portales de arte y bienestar en Florianópolis.',
          url: window.location.href,
        });
        return;
      } catch {}
    }
    // Fallback: clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      audioEngine.playToneChime();
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playToneChime();
    setSentInquiry(true);
    setTimeout(() => {
      setShowInquiryModal(false);
      setSentInquiry(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col justify-between h-full px-5 py-6 text-slate-100 relative overflow-y-auto">
      {/* Background Ambience from Generated Asset */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none overflow-hidden">
        <img
          src="/images/floripa_beach_portal_1793241345659.jpg"
          alt="Portal de luz en Florianópolis"
          className="w-full h-full object-cover filter brightness-90 contrast-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/80 to-[#08090C]/85" />
      </div>

      {/* Main Closing Statement */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 space-y-4 my-auto text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ilha da Magia · Florianópolis</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-snug">
          "Convertimos espacios ordinarios en{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">
            portales de arte y bienestar
          </span>."
        </h1>

        <p className="text-sm sm:text-base text-slate-300 font-light max-w-sm mx-auto leading-relaxed">
          Bienvenidos a la nueva era del entretenimiento consciente.
        </p>

        <div className="pt-2 text-base font-display font-semibold tracking-wide text-emerald-400">
          — {agencyName} —
        </div>

        {/* Action Buttons */}
        <div className="pt-6 space-y-2.5 max-w-xs mx-auto">
          <button
            onClick={() => {
              audioEngine.playTapClick();
              setShowInquiryModal(true);
            }}
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Cotizar / Iniciar Experiencia</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleShare}
              className="py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Compartir'}</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playTapClick();
                onReset();
              }}
              className="py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Footer Creds */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono"
      >
        <span>Florianópolis, Santa Catarina</span>
        <button
          onClick={() => {
            audioEngine.playTapClick();
            onOpenNotes();
          }}
          className="text-emerald-400 hover:underline"
        >
          Notas del Speaker
        </button>
      </motion.div>

      {/* Interactive Quick Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm rounded-2xl bg-slate-900 border border-emerald-500/30 p-5 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-semibold text-white">Diseñar Experiencia Llave en Mano</h3>
                <p className="text-[11px] text-slate-400">Equipo curatorial de {agencyName}</p>
              </div>
              <button
                onClick={() => setShowInquiryModal(false)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            {sentInquiry ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-xs font-semibold text-white">¡Solicitud recibida!</h4>
                <p className="text-[11px] text-slate-300">
                  Nos comunicaremos dentro de las próximas 24 horas para coordinar la locación y el universo sonoro.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">Formato Deseado</label>
                  <select
                    value={inquiryFormat}
                    onChange={(e) => setInquiryFormat(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-800 border border-white/10 text-slate-200 focus:outline-none focus:border-emerald-400"
                  >
                    <option value="night">Fiesta / Noche Consciente</option>
                    <option value="popups">Micro Pop-up Efímero</option>
                    <option value="retreats">Retiro Inmersivo Fin de Semana</option>
                    <option value="brands">Activación de Marca / Corporate</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">Escala Estimada</label>
                  <select
                    value={inquiryGuests}
                    onChange={(e) => setInquiryGuests(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-800 border border-white/10 text-slate-200 focus:outline-none focus:border-emerald-400"
                  >
                    <option value="20-50">20 a 50 asistentes (Íntimo)</option>
                    <option value="50-100">50 a 100 asistentes</option>
                    <option value="100-300">100 a 300 asistentes</option>
                    <option value="custom">Retiro Privado VIP</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">Email o WhatsApp de contacto</label>
                  <input
                    type="text"
                    required
                    placeholder="contacto@tuempresa.com"
                    className="w-full p-2 rounded-lg bg-slate-800 border border-white/10 text-slate-200 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowInquiryModal(false)}
                    className="flex-1 py-2 text-slate-400 hover:text-white bg-white/5 rounded-lg text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium rounded-lg text-xs transition-colors"
                  >
                    Enviar Consulta
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};
