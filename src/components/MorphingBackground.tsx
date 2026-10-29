import React, { useEffect, useRef } from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

interface MorphingBackgroundProps {
  scrollYProgress: MotionValue<number>;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  pulseSpeed: number;
  phase: number;
}

export const MorphingBackground: React.FC<MorphingBackgroundProps> = ({ scrollYProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic color shift across the palette as user scrolls
  // Palette: White, Black, Fluorescent Green (#00FF66), Fluorescent Pink (#FF007F)
  const bgGradient = useTransform(
    scrollYProgress,
    [0, 0.22, 0.45, 0.68, 0.88, 1],
    [
      'linear-gradient(160deg, #FFFFFF 0%, #F6FFF9 45%, #FFFFFF 100%)',
      'linear-gradient(150deg, #FFFFFF 0%, #FFF5F8 45%, #FAFAFA 100%)',
      'linear-gradient(165deg, #FAFAFA 0%, #F4FFF8 40%, #FFF7FA 80%, #FFFFFF 100%)',
      'linear-gradient(155deg, #FFFFFF 0%, #FFF4F8 50%, #FAFAFA 100%)',
      'linear-gradient(160deg, #FFFFFF 0%, #F5FFF8 40%, #FAFAFA 100%)',
      'linear-gradient(170deg, #FAFAFA 0%, #FFF5F9 50%, #F5FFF8 100%)',
    ]
  );

  // Position shifts tied to scroll depth
  const ring1Y = useTransform(scrollYProgress, [0, 0.5, 1], ['12%', '45%', '80%']);
  const ring1X = useTransform(scrollYProgress, [0, 0.5, 1], ['80%', '20%', '75%']);
  const ring1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.3, 1.1]);

  const ring2Y = useTransform(scrollYProgress, [0, 0.5, 1], ['22%', '65%', '35%']);
  const ring2X = useTransform(scrollYProgress, [0, 0.5, 1], ['15%', '85%', '30%']);
  const ring2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.25, 1.05]);

  const ring3Y = useTransform(scrollYProgress, [0, 0.5, 1], ['50%', '25%', '70%']);
  const ring3X = useTransform(scrollYProgress, [0, 0.5, 1], ['45%', '75%', '15%']);

  const blob1Y = useTransform(scrollYProgress, [0, 0.5, 1], ['10%', '55%', '85%']);
  const blob1X = useTransform(scrollYProgress, [0, 0.5, 1], ['20%', '75%', '25%']);

  const blob2Y = useTransform(scrollYProgress, [0, 0.5, 1], ['70%', '20%', '60%']);
  const blob2X = useTransform(scrollYProgress, [0, 0.5, 1], ['75%', '25%', '80%']);

  // Subtle Particles Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Palette colors for subtle particles
    const particleColors = [
      '#00FF66', // Fluorescent Green
      '#FF007F', // Fluorescent Pink
      '#0A0A0A', // Subtle Black / Charcoal
      '#00FF66',
      '#FF007F',
    ];

    // Generate 35 delicate particles
    const particleCount = Math.min(38, Math.floor((width * height) / 22000) || 28);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.28 + 0.12;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.45 - 0.15, // Gentle upward drift like warm island mist
        size: Math.random() * 2.2 + 0.8,
        alpha: baseAlpha,
        baseAlpha,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle sinusoidal movement
        p.x += p.vx + Math.sin(time + p.phase) * 0.25;
        p.y += p.vy;

        // Twinkle
        p.alpha = p.baseAlpha + Math.sin(time * 2 + p.phase) * 0.1;

        // Wrap around viewport edges
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw particle with gentle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.5, p.alpha));
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-1000"
      style={{ background: bgGradient }}
    >
      {/* 1. Fluid Ambient Gradient Auras (Green & Pink) */}
      <motion.div
        className="absolute w-[340px] h-[340px] sm:w-[650px] sm:h-[650px] rounded-full filter blur-[80px] sm:blur-[120px] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: blob1X,
          top: blob1Y,
          backgroundColor: 'rgba(0, 255, 102, 0.12)',
        }}
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] rounded-full filter blur-[80px] sm:blur-[120px] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: blob2X,
          top: blob2Y,
          backgroundColor: 'rgba(255, 0, 127, 0.10)',
        }}
        animate={{
          scale: [1.2, 0.95, 1.2],
          opacity: [0.65, 0.85, 0.65],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================================================
          CONTINUOUS 360° ANIMATED CIRCLES & ORBITS (MOVING ALL THE TIME)
          ========================================================================= */}

      {/* 2. Primary 360° Rotating Concentric Rings (Clockwise 32s) */}
      <motion.div
        className="absolute w-[280px] h-[280px] sm:w-[480px] sm:h-[480px] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: ring1X,
          top: ring1Y,
          scale: ring1Scale,
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full opacity-45 sm:opacity-55">
            {/* Outer Orbit with Dashed Neon Gradient */}
            <circle
              cx="100"
              cy="100"
              r="92"
              fill="none"
              stroke="url(#ringGradA)"
              strokeWidth="1.5"
              strokeDasharray="18 10 6 10"
            />
            {/* Middle Continuous Pink Ring */}
            <circle
              cx="100"
              cy="100"
              r="68"
              fill="none"
              stroke="#FF007F"
              strokeWidth="1"
              opacity="0.65"
              strokeDasharray="40 12"
            />
            {/* Inner Green Harmonic Ring */}
            <circle
              cx="100"
              cy="100"
              r="44"
              fill="none"
              stroke="#00FF66"
              strokeWidth="1"
              opacity="0.75"
              strokeDasharray="4 6"
            />
            {/* Orbiting Satellite Node in Green */}
            <circle cx="100" cy="8" r="4.5" fill="#00FF66" opacity="0.9" />
            <circle cx="100" cy="192" r="3.5" fill="#FF007F" opacity="0.85" />
            <defs>
              <linearGradient id="ringGradA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00FF66" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#0A0A0A" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FF007F" stopOpacity="0.95" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>

      {/* 3. Secondary 360° Counter-Rotating Circle (Counter-Clockwise 24s) */}
      <motion.div
        className="absolute w-[220px] h-[220px] sm:w-[380px] sm:h-[380px] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: ring2X,
          top: ring2Y,
          scale: ring2Scale,
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ rotate: -360 }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 160 160" className="w-full h-full opacity-35 sm:opacity-45">
            <circle
              cx="80"
              cy="80"
              r="72"
              fill="none"
              stroke="#FF007F"
              strokeWidth="1.2"
              strokeDasharray="14 10 4 10"
              opacity="0.75"
            />
            <circle
              cx="80"
              cy="80"
              r="50"
              fill="none"
              stroke="#00FF66"
              strokeWidth="1"
              opacity="0.8"
            />
            <circle
              cx="80"
              cy="28"
              r="3.5"
              fill="#FF007F"
            />
            <circle
              cx="132"
              cy="80"
              r="3"
              fill="#00FF66"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* 4. Third Delicate Floating Harmonic Orbit (Clockwise 40s + Float) */}
      <motion.div
        className="absolute w-[180px] h-[180px] sm:w-[300px] sm:h-[300px] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: ring3X,
          top: ring3Y,
        }}
        animate={{
          y: [-15, 15, -15],
          x: [10, -10, 10],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 140 140" className="w-full h-full opacity-30 sm:opacity-40">
            <circle
              cx="70"
              cy="70"
              r="62"
              fill="none"
              stroke="url(#ringGradB)"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
            <circle
              cx="70"
              cy="70"
              r="38"
              fill="none"
              stroke="#00FF66"
              strokeWidth="0.8"
              opacity="0.7"
            />
            <circle cx="70" cy="8" r="3" fill="#00FF66" />
            <defs>
              <linearGradient id="ringGradB" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF007F" />
                <stop offset="100%" stopColor="#00FF66" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>

      {/* 5. Subtle Canvas Particles Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 6. Subtle Tactile Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />
    </motion.div>
  );
};
