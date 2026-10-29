import React, { useEffect, useRef } from 'react';

interface ReactiveCanvasProps {
  accentColor?: string;
  isAudioPlaying?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  hueOffset: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const ReactiveCanvas: React.FC<ReactiveCanvasProps> = ({
  accentColor = '#10B981',
  isAudioPlaying = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, isDown: false });
  const ripplesRef = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

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

    // Initialize particles
    const particleCount = Math.min(45, Math.floor((width * height) / 12000) || 30);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2.2 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.15,
        alpha: Math.random() * 0.35 + 0.15,
        hueOffset: (Math.random() - 0.5) * 30,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep dark gradient backdrop
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#07080B');
      grad.addColorStop(0.5, '#0B0D13');
      grad.addColorStop(1, '#08090E');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle luminous ambient aurora orbs
      const audioBoost = isAudioPlaying ? 1.25 : 1.0;
      const orbX1 = width * 0.25 + Math.sin(time * 0.6) * 60;
      const orbY1 = height * 0.35 + Math.cos(time * 0.5) * 50;
      const orbRad1 = Math.min(width, height) * 0.45 * audioBoost;

      const radial1 = ctx.createRadialGradient(orbX1, orbY1, 0, orbX1, orbY1, orbRad1);
      radial1.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
      radial1.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
      radial1.addColorStop(1, 'transparent');
      ctx.fillStyle = radial1;
      ctx.fillRect(0, 0, width, height);

      const orbX2 = width * 0.75 + Math.cos(time * 0.4) * 70;
      const orbY2 = height * 0.65 + Math.sin(time * 0.5) * 60;
      const orbRad2 = Math.min(width, height) * 0.5 * audioBoost;

      const radial2 = ctx.createRadialGradient(orbX2, orbY2, 0, orbX2, orbY2, orbRad2);
      radial2.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
      radial2.addColorStop(0.6, 'rgba(16, 185, 129, 0.02)');
      radial2.addColorStop(1, 'transparent');
      ctx.fillStyle = radial2;
      ctx.fillRect(0, 0, width, height);

      // Process Ripples
      for (let r = ripplesRef.current.length - 1; r >= 0; r--) {
        const rip = ripplesRef.current[r];
        rip.radius += 2.4;
        rip.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${rip.alpha * 0.5})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (rip.alpha < 0.01 || rip.radius > rip.maxRadius) {
          ripplesRef.current.splice(r, 1);
        }
      }

      // Update and draw particles
      const mouse = mouseRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Motion drift + audio pulse
        p.x += p.vx * (isAudioPlaying ? 1.4 : 1.0);
        p.y += p.vy * (isAudioPlaying ? 1.4 : 1.0);

        // Gentle sinusoidal wave push
        p.y += Math.sin(time + p.x * 0.008) * 0.2;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse / Touch interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = mouse.isDown ? 140 : 90;

        if (dist < maxDist && dist > 0) {
          const force = (maxDist - dist) / maxDist;
          p.x -= (dx / dist) * force * 2.8;
          p.y -= (dy / dist) * force * 2.8;
          p.alpha = Math.min(0.9, p.baseAlpha + force * 0.6);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (isAudioPlaying ? 1.2 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 240, 230, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const connDist = Math.sqrt(cdx * cdx + cdy * cdy);
          const maxConn = 85;

          if (connDist < maxConn) {
            const lineAlpha = (1 - connDist / maxConn) * 0.14 * Math.min(p.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      mouseRef.current.x = clientX - rect.left;
      mouseRef.current.y = clientY - rect.top;
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      mouseRef.current.isDown = true;
      handlePointerMove(e);
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      ripplesRef.current.push({
        x: clientX - rect.left,
        y: clientY - rect.top,
        radius: 4,
        maxRadius: 80,
        alpha: 0.6,
      });
    };

    const handlePointerUp = () => {
      mouseRef.current.isDown = false;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mousedown', handlePointerDown, { passive: true });
    window.addEventListener('mouseup', handlePointerUp, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchend', handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchend', handlePointerUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [accentColor, isAudioPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
};
