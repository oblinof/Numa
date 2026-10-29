import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import {
  Compass,
  Sparkles,
  Share2,
  Check,
  MapPin,
  ChevronDown,
  ArrowUpRight,
  Send,
  Eye,
  Heart,
  Sun,
  Layers,
  CheckCircle2,
  Maximize2,
  Image as ImageIcon,
} from 'lucide-react';
import {
  BRAND_NAME,
  EXPERIENCE_FORMATS,
  ISLAND_LOCATIONS,
  GALLERY_MOMENTS,
  ARCHITECTURE_PILLARS,
  SECTIONS,
} from '../data/presentationData';
import { ExperienceFormatId } from '../types';
import { MorphingBackground } from './MorphingBackground';

export const InteractiveScrollPitch: React.FC = () => {
  const agencyName = BRAND_NAME;
  const [activeFormat, setActiveFormat] = useState<ExperienceFormatId>('night');
  const [selectedLocation, setSelectedLocation] = useState<string>('praia-sul');
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sunset Interactive Scrub Step
  const [sunsetTimeStep, setSunsetTimeStep] = useState<number>(1);

  // Inquiry form states
  const [inquiryFormat, setInquiryFormat] = useState('Conscious Sunsets & Gatherings');
  const [inquiryLocation, setInquiryLocation] = useState('Secret Beach in the South');
  const [inquiryContact, setInquiryContact] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  // Scroll Progress Tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSectionId, setActiveSectionId] = useState('paradigm');
  const [scrollDepthPercent, setScrollDepthPercent] = useState<number>(0);

  // Parallax transforms for hero and featured imagery
  const heroImageScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.15]);
  const heroImageY = useTransform(scrollYProgress, [0, 0.25], ['0%', '8%']);
  const portalImageScale = useTransform(scrollYProgress, [0.75, 1], [0.95, 1.08]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollDepthPercent(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 280;
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSectionId(sec.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${agencyName} · Florianópolis`,
          text: 'Turning ordinary spaces into living portals of art and conscious wellness in Florianópolis.',
          url: window.location.href,
        });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    } catch {}
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryContact('');
    }, 4000);
  };

  const activeFormatData =
    EXPERIENCE_FORMATS.find((f) => f.id === activeFormat) || EXPERIENCE_FORMATS[0];
  const activeLocationData =
    ISLAND_LOCATIONS.find((l) => l.id === selectedLocation) || ISLAND_LOCATIONS[0];

  const sunsetTimes = [
    {
      time: '17:00 · Golden Hour',
      vibe: 'Warm amber light over white coastal dunes',
      focus: 'Opening Harmony & Botanical Infusions',
    },
    {
      time: '18:15 · Horizon Ocaso',
      vibe: 'Soft violet skies and gentle neon hues over the ocean',
      focus: '360° Spatial Sound & Collective Flow',
    },
    {
      time: '19:30 · Starfall Twilight',
      vibe: 'Living light sculptures responding to movement',
      focus: 'Acoustic Stillness & Sensory Integration',
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-white text-black selection:bg-[#00FF66]/30 selection:text-black font-sans antialiased overflow-x-hidden"
    >
      {/* Dynamic Animated Morphing Shapes in Background */}
      <MorphingBackground scrollYProgress={scrollYProgress} />

      {/* Kinetic Scroll Progress Bar at very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00FF66] via-black to-[#FF007F] origin-left z-50 shadow-[0_0_12px_rgba(0,255,102,0.7)]"
        style={{ scaleX }}
      />

      {/* Floating Minimal Glass Header */}
      <header className="fixed top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 z-40 max-w-4xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/90 backdrop-blur-xl border border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        {/* Brand Name */}
        <div className="flex items-center gap-2.5">
          <a
            href="#paradigm"
            className="font-display font-bold tracking-tight text-base sm:text-lg text-black flex items-center gap-2"
          >
            <span>{agencyName}</span>
            <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
          </a>
          <span className="text-black/20 hidden sm:inline">/</span>
          <span className="text-[11px] text-black/50 hidden sm:inline font-mono">
            Florianópolis
          </span>
        </div>

        {/* Section Quick Jump Pill (Desktop) */}
        <nav className="hidden md:flex items-center gap-2 text-xs text-black/60 font-medium">
          {SECTIONS.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className={`transition-all py-1 px-2 rounded-lg hover:text-black ${
                activeSectionId === sec.id ? 'text-black font-semibold bg-black/5' : ''
              }`}
            >
              {sec.kicker.split('·')[1]?.trim() || sec.kicker}
            </a>
          ))}
        </nav>

        {/* Actions (Scroll progress counter + Share) */}
        <div className="flex items-center gap-2">
          {/* Scroll depth indicator */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/[0.04] text-[10px] font-mono text-black/70">
            <span>{scrollDepthPercent}%</span>
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-black text-white hover:bg-black/85 transition-colors shadow-sm"
            title="Share presentation link"
          >
            {copiedLink ? (
              <Check className="w-3.5 h-3.5 text-[#00FF66]" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </header>

      {/* Floating Side Chapter Navigator (Desktop) */}
      <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3.5">
        {SECTIONS.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            className="group flex items-center gap-2.5 justify-end"
            title={sec.title}
          >
            <span className="text-[10px] font-mono text-black/50 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-0.5 rounded shadow border border-black/5 whitespace-nowrap">
              {sec.kicker}
            </span>
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSectionId === sec.id
                  ? 'bg-black scale-150 ring-4 ring-[#00FF66]/50'
                  : 'bg-black/25 hover:bg-black/60'
              }`}
            />
          </a>
        ))}
      </aside>

      {/* =========================================================================
          01 · THE CULTURAL SHIFT / PARADIGM
          ========================================================================= */}
      <section
        id="paradigm"
        className="relative z-10 min-h-screen pt-32 sm:pt-40 pb-20 px-5 sm:px-12 max-w-4xl mx-auto flex flex-col justify-between"
      >
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Neon Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-xs font-mono tracking-wider uppercase text-black shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
            <span>01 · The Shift</span>
            <span className="text-black/20">/</span>
            <span className="text-[#FF007F] font-semibold">Florianópolis</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-light text-black tracking-tight leading-[1.08] max-w-3xl text-balance">
            The world is saturated with <br className="hidden sm:inline" />
            <span className="font-semibold underline decoration-2 decoration-[#00FF66] underline-offset-8">
              superficial stimuli
            </span>
            .
          </h1>

          <p className="text-lg sm:text-2xl text-black/70 font-light leading-relaxed max-w-2xl text-balance">
            Traditional forms of entertainment and disconnection no longer resonate. People seek
            meaning, immersion, and community—alongside{' '}
            <span className="text-black font-medium border-b-2 border-[#FF007F] pb-0.5">
              beauty and transcendence
            </span>
            .
          </p>
        </motion.div>

        {/* Hero Visual: Yoga, Light Installation & Ocean Horizon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="my-10 relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-black/10 group max-h-[460px]"
        >
          <motion.div style={{ scale: heroImageScale, y: heroImageY }} className="w-full h-full">
            <img
              src="/src/assets/images/paradise_yoga_light_1793242933753.jpg"
              alt="Cliffside yoga with glowing circular halo art over turquoise ocean in Florianópolis"
              className="w-full h-[360px] sm:h-[460px] object-cover filter brightness-95 contrast-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#00FF66] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                Florianópolis Sanctuaries
              </span>
              <h2 className="text-lg sm:text-2xl font-display font-medium text-white">
                Mindfulness, Nature & Halo Art Installations
              </h2>
            </div>
            <div className="hidden sm:block text-xs font-mono text-white/80 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              Praia Secreta Sul
            </div>
          </div>
        </motion.div>

        {/* Scroll Prompt Arrow */}
        <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between text-xs text-black/50 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" />
            Scroll to discover Numa
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-black/40" />
        </div>
      </section>

      {/* =========================================================================
          02 · OUR IDENTITY: NUMA
          ========================================================================= */}
      <section
        id="identity"
        className="relative z-10 py-24 sm:py-36 px-5 sm:px-12 border-t border-black/[0.06]"
      >
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="text-xs font-mono tracking-wider uppercase text-black/50 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF007F] shadow-[0_0_8px_#FF007F]" />
              <span>02 · Studio Identity & Purpose</span>
            </div>

            {/* Studio Name Headline */}
            <div className="space-y-1">
              <span className="text-xs sm:text-sm text-black/50 uppercase tracking-widest font-mono">
                We are
              </span>
              <h2 className="text-5xl sm:text-7xl font-display font-bold text-black tracking-tight">
                {agencyName}
              </h2>
            </div>

            <p className="text-xl sm:text-2xl text-black/80 font-light max-w-3xl leading-relaxed text-balance">
              The premier event production studio in Florianópolis dedicated to merging{' '}
              <strong className="text-black font-semibold">technological art</strong>,{' '}
              <strong className="text-black font-semibold">immersive installations</strong>, and{' '}
              <strong className="text-black font-semibold">conscious wellness</strong>.
            </p>

            <blockquote className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.02)] text-base sm:text-lg text-black font-serif italic max-w-2xl leading-relaxed">
              "We do not create conventional events; we design living, multisensory experiences that transform spaces and those who inhabit them."
            </blockquote>
          </motion.div>

          {/* Triad of Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'Technological Art',
                kicker: 'Light & Responsive Code',
                accent: '#00FF66',
                desc: 'Living kinetic illumination and parametric light sculptures responsive to human presence and spatial rhythms.',
                image: '/src/assets/images/forest_reactive_light_1793241346579.jpg',
              },
              {
                title: 'Immersive Pavilions',
                kicker: 'Ephemeral Architecture',
                accent: '#FF007F',
                desc: 'Temporary architecture woven into the island: 360° soundscapes, travertine water decks, and luminous ocean portals.',
                image: '/src/assets/images/lagoon_zen_pavilion_1793242934529.jpg',
              },
              {
                title: 'Conscious Wellness',
                kicker: 'Restorative Presence',
                accent: '#00FF66',
                desc: 'Sensory harmony: botanical elixirs, acoustic meditations, and restorative gatherings framed by natural beauty.',
                image: '/src/assets/images/cliff_sound_bath_1793243278252.jpg',
              },
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-white border border-black/[0.08] hover:border-black/30 shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between transition-all"
              >
                <div className="relative h-44 w-full overflow-hidden bg-black">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pillar.accent }} />
                </div>
                <div className="p-6 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-black/50">
                    {pillar.kicker}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-black">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          03 · LIVING PORTALS / VISUAL PARADISE SHOWCASE
          ========================================================================= */}
      <section
        id="gallery"
        className="relative z-10 py-24 sm:py-36 px-5 sm:px-12 border-t border-black/[0.06] bg-[#FAFAFA]"
      >
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <div className="text-xs font-mono tracking-wider uppercase text-black/50 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
              <span>03 · Living Portals Gallery</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-light text-black tracking-tight leading-tight text-balance">
              Where paradise meets{' '}
              <span className="font-semibold underline decoration-2 decoration-[#00FF66] underline-offset-8">
                immersive art & meditation
              </span>
              .
            </h2>
            <p className="text-base sm:text-lg text-black/70 font-light max-w-2xl leading-relaxed text-balance">
              Explore how we transform cliffside lookouts, calm lagoons, white beaches, and lush rainforests into living stages of contemplation.
            </p>
          </motion.div>

          {/* Interactive Visual Carousel / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {GALLERY_MOMENTS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-white border border-black/10 overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.04)] group cursor-pointer"
                onClick={() => setSelectedGalleryIdx(idx)}
              >
                <div className="relative h-60 w-full overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-medium text-black border border-black/10">
                    {item.tag}
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-display font-semibold text-black">
                      {item.title}
                    </h3>
                    <div className="text-xs text-black/50 font-mono mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#FF007F]" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <span className="p-2 rounded-full bg-black/5 group-hover:bg-[#00FF66]/20 transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          04 · AGILE ECOSYSTEM & FLORIANÓPOLIS
          ========================================================================= */}
      <section
        id="ecosystem"
        className="relative z-10 py-24 sm:py-36 px-5 sm:px-12 border-t border-black/[0.06] max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="text-xs font-mono tracking-wider uppercase text-black/50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
            <span>04 · Agile Ecosystem Model</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-light text-black tracking-tight leading-tight max-w-3xl text-balance">
            We don’t depend on four fixed walls:{' '}
            <span className="font-semibold underline decoration-2 decoration-[#FF007F] underline-offset-8">
              we produce turnkey ephemeral universes
            </span>
            .
          </h2>

          <p className="text-base sm:text-lg text-black/70 font-light max-w-2xl leading-relaxed text-balance">
            Through strategic alliances with boutique hotels, luxury resorts, cultural spaces, and natural locations across the island, we bring transformative worlds to life.
          </p>

          {/* Location Explorer (Mobile Touch Friendly) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-4">
            {/* Location selector buttons */}
            <div className="lg:col-span-5 space-y-2.5">
              <div className="text-xs font-mono uppercase text-black/50 tracking-wider mb-1">
                Island Sanctuaries (Tap to select):
              </div>

              {ISLAND_LOCATIONS.map((loc) => {
                const isSelected = selectedLocation === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc.id)}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-200 border flex items-center justify-between ${
                      isSelected
                        ? 'bg-black text-white border-black shadow-lg shadow-black/10'
                        : 'bg-white text-black border-black/10 hover:border-black/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-[#00FF66] text-black font-bold' : 'bg-black/5 text-black'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold leading-tight">{loc.name}</div>
                        <div
                          className={`text-xs ${
                            isSelected ? 'text-white/70' : 'text-black/50'
                          }`}
                        >
                          {loc.region}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Location Card Preview */}
            <motion.div
              key={activeLocationData.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-[0_12px_40px_rgba(0,0,0,0.04)] space-y-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF007F] font-semibold">
                    {activeLocationData.type}
                  </span>
                  <h3 className="text-2xl font-display font-semibold text-black mt-0.5">
                    {activeLocationData.name}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#00FF66]/15 text-black border border-[#00FF66]/30 text-xs font-mono font-medium">
                  Turnkey
                </span>
              </div>

              <p className="text-sm sm:text-base text-black/75 font-light leading-relaxed">
                {activeLocationData.description}
              </p>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAFAFA] border border-black/[0.06] flex items-center gap-3 text-xs sm:text-sm text-black font-mono">
                <Sparkles className="w-4 h-4 text-[#00A843] shrink-0" />
                <span>{activeLocationData.specs}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          05 · EXPERIENTIAL SPECTRUM & CONSCIOUS SUNSETS
          ========================================================================= */}
      <section
        id="spectrum"
        className="relative z-10 py-24 sm:py-36 px-5 sm:px-12 border-t border-black/[0.06]"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <div className="text-xs font-mono tracking-wider uppercase text-black/50 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF007F] shadow-[0_0_8px_#FF007F]" />
              <span>05 · Experiential Spectrum</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-light text-black tracking-tight leading-tight text-balance">
              Our offer spans a total spectrum:{' '}
              <br className="hidden sm:inline" />
              <span className="font-semibold">
                sunsets, retreats, micro pop-ups, and bespoke brands
              </span>
              .
            </h2>
          </motion.div>

          {/* Interactive Sunset Cycle Scrubber */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-black/10 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-xs font-mono text-black/50 uppercase tracking-wider flex items-center gap-2">
                <Sun className="w-3.5 h-3.5 text-[#FF007F]" />
                <span>Solar Arc · The Rhythm of a Conscious Sunset</span>
              </div>
              <span className="text-xs font-mono font-semibold text-[#D60068]">
                {sunsetTimes[sunsetTimeStep].focus}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {sunsetTimes.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSunsetTimeStep(idx)}
                  className={`p-3 rounded-2xl text-left transition-all duration-200 border ${
                    sunsetTimeStep === idx
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-[#FAFAFA] text-black border-black/5 hover:border-black/20'
                  }`}
                >
                  <div className="text-xs font-semibold">{item.time}</div>
                  <div
                    className={`text-[11px] truncate ${
                      sunsetTimeStep === idx ? 'text-white/70' : 'text-black/50'
                    }`}
                  >
                    {item.vibe}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Format Selector Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white border border-black/10 max-w-2xl">
            {EXPERIENCE_FORMATS.map((f) => {
              const isSelected = activeFormat === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFormat(f.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-black text-white shadow-md'
                      : 'text-black/60 hover:text-black hover:bg-black/5'
                  }`}
                >
                  <span>{f.shortLabel}</span>
                  {isSelected && (
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: f.accentColor }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Format Showcase Card */}
          <motion.div
            key={activeFormatData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-white border border-black/10 overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.06)] grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Photography Showcase */}
            <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[400px] bg-black overflow-hidden group">
              <img
                src={activeFormatData.image}
                alt={activeFormatData.name}
                className="w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-mono font-medium text-black border border-black/10 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
                <span>{activeFormatData.vibe}</span>
              </div>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-black/50">
                  Curated Format
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-semibold text-black leading-snug">
                  {activeFormatData.name}
                </h3>
                <p className="text-sm font-medium text-[#D60068]">
                  "{activeFormatData.headline}"
                </p>
                <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed">
                  {activeFormatData.description}
                </p>
              </div>

              {/* Specs pill list */}
              <div className="pt-4 border-t border-black/[0.08] space-y-2">
                {activeFormatData.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-black/80 font-mono">
                    <Check className="w-3.5 h-3.5 text-[#00A843] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          06 · TURNKEY ARCHITECTURE: 100% END-TO-END
          ========================================================================= */}
      <section
        id="architecture"
        className="relative z-10 py-24 sm:py-36 px-5 sm:px-12 border-t border-black/[0.06] max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="text-xs font-mono tracking-wider uppercase text-black/50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
            <span>06 · 100% Experience Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-light text-black tracking-tight leading-tight max-w-3xl text-balance">
            We handle{' '}
            <span className="font-semibold text-black underline decoration-2 decoration-[#00FF66] underline-offset-8">
              100% of the architecture
            </span>{' '}
            of the experience.
          </h2>

          <p className="text-base sm:text-lg text-black/70 font-light max-w-2xl leading-relaxed text-balance">
            From artistic curation, immersive design, and spatial production, to logistics, wellness, and assembly in any setting: a secret beach in the south, a forest in the north, or an exclusive pavilion at Lagoa.
          </p>

          {/* 5-Step Pipeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-4">
            {ARCHITECTURE_PILLARS.map((p, idx) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl bg-white border border-black/10 hover:border-black/30 transition-all flex flex-col justify-between space-y-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${p.accent}20`,
                        color: p.accent === '#00FF66' ? '#008736' : '#C4005F',
                        border: `1px solid ${p.accent}40`,
                      }}
                    >
                      {p.num}
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: p.accent }}
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-black leading-tight">
                    {p.title}
                  </h3>
                </div>
                <p className="text-xs text-black/60 font-light leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Turnkey Assurance Banner (Pure Hospitality & Staging) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-black text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1.5 max-w-xl">
              <h4 className="text-base sm:text-lg font-display font-semibold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66] shadow-[0_0_10px_#00FF66]" />
                <span>Turnkey Freedom in Any Environment</span>
              </h4>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Complete technical, spatial, and hosting production so you and your guests simply arrive, immerse, and experience.
              </p>
            </div>
            <a
              href="#portal"
              className="px-6 py-3 rounded-full bg-[#00FF66] text-black text-xs font-bold hover:bg-[#00e55c] transition-colors shrink-0 flex items-center gap-2 shadow-lg shadow-[#00FF66]/20"
            >
              <span>Design Experience</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          07 · THE PORTAL & CONVERSATION
          ========================================================================= */}
      <section
        id="portal"
        className="relative z-10 py-24 sm:py-36 px-5 sm:px-12 border-t border-black/[0.06]"
      >
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/10 text-xs font-mono tracking-wider uppercase text-black shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF007F] shadow-[0_0_8px_#FF007F]" />
              <span>07 · The Portal</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-display font-light text-black tracking-tight leading-tight max-w-3xl mx-auto text-balance">
              "We turn ordinary spaces into{' '}
              <span className="font-semibold underline decoration-2 decoration-[#00FF66] underline-offset-8">
                portals of art and wellness
              </span>
              ."
            </h2>

            <p className="text-xl sm:text-2xl text-black/70 font-light max-w-xl mx-auto leading-relaxed">
              Welcome to the new era of entertainment in the Magic Island.
            </p>

            <div className="text-sm font-mono tracking-widest uppercase text-black/50">
              — {agencyName} · Florianópolis —
            </div>
          </motion.div>

          {/* Interactive Inquiries Card */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-black/10 shadow-[0_16px_50px_rgba(0,0,0,0.06)] text-left max-w-xl mx-auto space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-display font-semibold text-black">
                Plan Your Experience in Florianópolis
              </h3>
              <p className="text-xs text-black/60">
                Select your preferred format and location to receive a bespoke turnkey curatorial proposal.
              </p>
            </div>

            {inquirySent ? (
              <div className="p-6 rounded-2xl bg-[#00FF66]/15 border border-[#00FF66]/40 text-center space-y-2">
                <Check className="w-8 h-8 text-[#00A843] mx-auto" />
                <h4 className="text-sm font-semibold text-black">Proposal Request Received</h4>
                <p className="text-xs text-black/75">
                  The {agencyName} team will reach out with curated dates, spatial concepts, and staging proposals.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-4 text-xs">
                <div>
                  <label className="text-black/80 font-medium block mb-1.5">
                    Experience Format
                  </label>
                  <select
                    value={inquiryFormat}
                    onChange={(e) => setInquiryFormat(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-black/10 text-black text-xs focus:outline-none focus:border-black font-medium"
                  >
                    <option value="Conscious Sunsets & Gatherings">Conscious Sunsets & Gatherings</option>
                    <option value="Weekend Immersive Retreats">Weekend Immersive Retreats</option>
                    <option value="Natural & Urban Micro Pop-ups">Natural & Urban Micro Pop-ups</option>
                    <option value="Tailored Brand Activations & Executive Retreats">Tailored Brand Activations & Executive Retreats</option>
                  </select>
                </div>

                <div>
                  <label className="text-black/80 font-medium block mb-1.5">
                    Preferred Island Setting
                  </label>
                  <select
                    value={inquiryLocation}
                    onChange={(e) => setInquiryLocation(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-black/10 text-black text-xs focus:outline-none focus:border-black font-medium"
                  >
                    <option value="Secret Beach in the South">Secret Beach in the South (Ocean Sanctuaries)</option>
                    <option value="Exclusive Pavilion at Lagoa">Exclusive Pavilion at Lagoa da Conceição</option>
                    <option value="Canopy Forest in the North">Canopy Forest in the North (Rainforest)</option>
                    <option value="Boutique Hotels & Eco-Resorts">Boutique Hotel / Luxury Eco-Resort</option>
                  </select>
                </div>

                <div>
                  <label className="text-black/80 font-medium block mb-1.5">
                    Email or WhatsApp
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryContact}
                    onChange={(e) => setInquiryContact(e.target.value)}
                    placeholder="name@company.com or +55..."
                    className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-black/10 text-black text-xs focus:outline-none focus:border-black font-medium"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-5 bg-black hover:bg-black/85 text-white font-medium rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5 text-[#00FF66]" />
                    <span>Request Curatorial Proposal</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="py-3 px-4 bg-white hover:bg-black/5 border border-black/10 text-black font-medium rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedLink ? (
                      <Check className="w-3.5 h-3.5 text-[#00A843]" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-5 sm:px-12 border-t border-black/[0.08] bg-white text-xs text-black/50 font-mono">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-black">{agencyName}</span>
            <span>·</span>
            <span>Florianópolis, Santa Catarina, Brazil</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#paradigm" className="hover:text-black">
              Back to top ↑
            </a>
            <span>·</span>
            <span className="text-[#00A843]">Living Art & Immersive Portals</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
