import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  FileText,
  Sliders,
  Maximize2,
  Minimize2,
  Sparkles,
  Info,
  X,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { SLIDES } from '../data/presentationData';
import { AgencyConfig, SlideData } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { ReactiveCanvas } from './ReactiveCanvas';
import { Slide1Diagnosis } from './slides/Slide1Diagnosis';
import { Slide2Identity } from './slides/Slide2Identity';
import { Slide3Ecosystem } from './slides/Slide3Ecosystem';
import { Slide4Formats } from './slides/Slide4Formats';
import { Slide5Architecture } from './slides/Slide5Architecture';
import { Slide6Closing } from './slides/Slide6Closing';

const STORAGE_KEY_AGENCY = 'aether_agency_name_v1';

export const PresentationDeck: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [agencyName, setAgencyName] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_AGENCY) || 'AETHER STUDIOS';
  });
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'fullscreen'>('mobile');
  const [audioLevel, setAudioLevel] = useState<number[]>(new Array(8).fill(4));

  // Touch Swipe tracking
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Sync agency name to local storage
  const handleUpdateAgencyName = (newName: string) => {
    setAgencyName(newName);
    localStorage.setItem(STORAGE_KEY_AGENCY, newName);
  };

  const currentSlide = SLIDES[currentSlideIndex];

  // Navigation handlers
  const goToNextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      audioEngine.playSlideWhoosh();
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      audioEngine.playSlideWhoosh();
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < SLIDES.length && index !== currentSlideIndex) {
      audioEngine.playTapClick();
      setCurrentSlideIndex(index);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if inside an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key.toLowerCase() === 'm') {
        toggleSound();
      } else if (e.key.toLowerCase() === 'n') {
        setIsNotesOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  // Touch gesture listeners
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Minimum swipe threshold
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Audio Toggle
  const toggleSound = () => {
    const playing = audioEngine.toggleAmbient();
    setIsAudioPlaying(playing);
  };

  // Visualizer loop when playing
  useEffect(() => {
    if (!isAudioPlaying) {
      setAudioLevel(new Array(8).fill(4));
      return;
    }
    let animId: number;
    const updateVisualizer = () => {
      const data = audioEngine.getVisualizerData();
      if (data && data.length >= 8) {
        const levels = [];
        for (let i = 0; i < 8; i++) {
          const val = data[i * 2] || 0;
          levels.push(Math.max(4, Math.min(22, (val / 255) * 22)));
        }
        setAudioLevel(levels);
      }
      animId = requestAnimationFrame(updateVisualizer);
    };
    animId = requestAnimationFrame(updateVisualizer);
    return () => cancelAnimationFrame(animId);
  }, [isAudioPlaying]);

  return (
    <div className="relative min-h-screen w-full bg-[#07080B] text-slate-100 flex flex-col items-center justify-center p-0 sm:p-4 select-none overflow-hidden">
      {/* Top Global Utility Bar (Presenter & Mode Controls) */}
      <header className="w-full max-w-4xl hidden sm:flex items-center justify-between px-4 py-2.5 text-xs text-slate-400 z-30">
        <div className="flex items-center gap-3">
          <span className="font-display font-semibold text-white tracking-wider">
            {agencyName}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-emerald-400 font-mono text-[11px]">Florianópolis Deck</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-2 ${
              isAudioPlaying
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
            }`}
            title="Activar o pausar atmósfera sonora binaural generativa"
          >
            {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{isAudioPlaying ? 'Ambiente Activo' : 'Sonido Inmersivo'}</span>
            {isAudioPlaying && (
              <div className="flex items-center gap-0.5 h-3">
                {audioLevel.slice(0, 4).map((h, idx) => (
                  <span
                    key={idx}
                    className="w-0.5 bg-emerald-400 rounded-full transition-all duration-75"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            )}
          </button>

          {/* View Mode Toggle */}
          <button
            onClick={() => setViewMode((m) => (m === 'mobile' ? 'fullscreen' : 'mobile'))}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1.5"
            title="Alternar entre simulador smartphone y pantalla completa"
          >
            {viewMode === 'mobile' ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-slate-400" />
                <span>Expandir Fullscreen</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Modo Smartphone</span>
              </>
            )}
          </button>

          {/* Settings modal button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-colors"
            title="Personalizar datos de agencia"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container: Mobile Frame or Fullscreen */}
      <main
        className={`relative z-10 w-full transition-all duration-300 flex flex-col justify-between ${
          viewMode === 'mobile'
            ? 'sm:max-w-[420px] sm:h-[840px] sm:max-h-[92vh] sm:rounded-[42px] sm:border-[8px] sm:border-slate-800/80 sm:shadow-[0_25px_70px_rgba(0,0,0,0.85)] sm:ring-1 sm:ring-white/10 h-screen overflow-hidden bg-[#0A0C11]'
            : 'w-full max-w-5xl h-screen sm:h-[88vh] sm:rounded-3xl sm:border sm:border-white/10 shadow-2xl overflow-hidden bg-[#0A0C11]'
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Mobile Device Bezel Speaker & Status Notch (Only in Mobile Frame mode) */}
        {viewMode === 'mobile' && (
          <div className="absolute top-0 left-0 right-0 h-7 z-40 flex items-center justify-between px-7 text-[11px] font-mono text-slate-400 pointer-events-none">
            <span>22:00</span>
            <div className="w-20 h-4 bg-slate-900/90 rounded-full border border-white/10 mx-auto -mt-1 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 mr-2" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            </div>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
          </div>
        )}

        {/* Ambient Interactive Reactive Canvas */}
        <ReactiveCanvas isAudioPlaying={isAudioPlaying} />

        {/* Slide Progress Bar (Top) */}
        <div className="relative z-30 pt-8 sm:pt-4 px-5">
          <div className="flex items-center gap-1.5 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            {SLIDES.map((_item: SlideData, idx: number) => (
              <div
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-full flex-1 rounded-full cursor-pointer transition-all duration-300 ${
                  idx === currentSlideIndex
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-300'
                    : idx < currentSlideIndex
                    ? 'bg-emerald-600/70'
                    : 'bg-white/15 hover:bg-white/30'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-slate-400">
            <span>{currentSlide.kicker}</span>
            <span className="text-emerald-400 font-medium">
              {currentSlideIndex + 1} / {SLIDES.length}
            </span>
          </div>
        </div>

        {/* Active Slide Body with Smooth AnimatePresence */}
        <div className="relative z-20 flex-1 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full flex flex-col justify-between"
            >
              {currentSlideIndex === 0 && <Slide1Diagnosis />}
              {currentSlideIndex === 1 && (
                <Slide2Identity
                  agencyName={agencyName}
                  onUpdateAgencyName={handleUpdateAgencyName}
                />
              )}
              {currentSlideIndex === 2 && <Slide3Ecosystem />}
              {currentSlideIndex === 3 && <Slide4Formats />}
              {currentSlideIndex === 4 && <Slide5Architecture />}
              {currentSlideIndex === 5 && (
                <Slide6Closing
                  agencyName={agencyName}
                  onReset={() => goToSlide(0)}
                  onOpenNotes={() => setIsNotesOpen(true)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Thumb Navigation Toolbar */}
        <footer className="relative z-30 px-5 py-3.5 bg-slate-950/80 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
          {/* Audio Quick Button (Mobile-friendly) */}
          <button
            onClick={toggleSound}
            className={`p-2.5 rounded-xl border transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] ${
              isAudioPlaying
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
            }`}
            title="Audio ambiental binaural"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Speaker Notes Toggle */}
          <button
            onClick={() => {
              audioEngine.playTapClick();
              setIsNotesOpen((v) => !v);
            }}
            className={`px-3 py-2 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 min-h-[44px] ${
              isNotesOpen
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-white/5 text-slate-300 border-white/10 hover:text-white'
            }`}
            title="Guía de orador / notas para presentar"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Notas</span>
          </button>

          {/* Navigation Arrows (Thumb-friendly hits) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={goToPrevSlide}
              disabled={currentSlideIndex === 0}
              className={`p-2.5 rounded-xl border transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
                currentSlideIndex === 0
                  ? 'opacity-30 border-transparent text-slate-600 cursor-not-allowed'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white active:scale-95'
              }`}
              title="Slide anterior (←)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={goToNextSlide}
              disabled={currentSlideIndex === SLIDES.length - 1}
              className={`p-2.5 rounded-xl border transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
                currentSlideIndex === SLIDES.length - 1
                  ? 'opacity-30 border-transparent text-slate-600 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold border-transparent shadow-lg shadow-emerald-500/20 active:scale-95'
              }`}
              title="Slide siguiente (→)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </footer>

        {/* Presenter Speaker Notes Drawer */}
        <AnimatePresence>
          {isNotesOpen && (
            <motion.div
              initial={{ opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 150 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-0 bottom-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-emerald-500/30 rounded-t-3xl p-5 shadow-2xl max-h-[70%] overflow-y-auto"
            >
              <div className="w-10 h-1.5 bg-slate-700 rounded-full mx-auto mb-3" />

              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-semibold text-white">
                    Guía de Pitch · {currentSlide.title}
                  </h3>
                </div>
                <button
                  onClick={() => setIsNotesOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-3 space-y-2">
                <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                  Puntos Clave para Decir en Voz Alta:
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {currentSlide.presenterNotes.map((note: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span className="leading-relaxed">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Atajo: tecla 'N' para cerrar</span>
                <span className="text-emerald-300">Floripa Tech-Wellness Ecosystem</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings / Customize Agency Modal */}
        <AnimatePresence>
          {isSettingsOpen && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-slate-900 border border-white/15 rounded-2xl p-5 space-y-4 shadow-2xl text-slate-100"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-semibold text-white">Personalizar Pitch Deck</h3>
                  </div>
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1 font-medium">
                      Nombre de la Productora / Agencia
                    </label>
                    <input
                      type="text"
                      value={agencyName}
                      onChange={(e) => handleUpdateAgencyName(e.target.value)}
                      placeholder="Ej: AETHER STUDIOS"
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-emerald-400 text-sm font-display font-semibold"
                    />
                  </div>

                  {/* Quick Name Presets */}
                  <div>
                    <div className="text-[11px] text-slate-400 mb-1.5">Sugerencias Rápidas:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'AETHER IMMERSIVE',
                        'KÓSMOS FLORIPA',
                        'LUMINA LAB',
                        'PORTAL ILHA',
                        'AURA WELLNESS TECH',
                      ].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => handleUpdateAgencyName(preset)}
                          className="px-2 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-white/10 text-[11px] transition-colors"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sound Controls */}
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-300">Ambiente Sonoro (Web Audio API)</span>
                      <button
                        onClick={toggleSound}
                        className="text-emerald-400 hover:underline"
                      >
                        {isAudioPlaying ? 'Pausar' : 'Iniciar'}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Sintetizador generativo en tiempo real basado en frecuencia armónica 432 Hz y brisa marina de Florianópolis.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl text-xs transition-colors"
                  >
                    Guardar y Continuar Presentación
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Keyboard Shortcuts Hint for Desktop Users */}
      <footer className="w-full max-w-4xl hidden sm:flex items-center justify-center gap-6 py-2.5 text-[11px] font-mono text-slate-500">
        <span>[← / →] Cambiar Slide</span>
        <span>[Espacio] Avanzar</span>
        <span>[M] Sonido On/Off</span>
        <span>[N] Notas del Orador</span>
      </footer>
    </div>
  );
};
