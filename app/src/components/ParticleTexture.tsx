import { useEffect, useRef } from 'react';

interface ParticleTextureProps {
  density?: number;
  color?: string;
  sectionRef: React.RefObject<HTMLElement | null>;
}

export default function ParticleTexture({ density = 25, color = 'rgba(239, 214, 214, 0.3)', sectionRef }: ParticleTextureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number; pulse: number; pulseSpeed: number }[] = [];

    const resize = () => {
      const rect = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      return { w: rect.width, h: rect.height };
    };

    const { w, h } = resize();

    particles = Array.from({ length: density }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 2.5,
      dx: (Math.random() - 0.5) * 0.08,
      dy: (Math.random() - 0.5) * 0.06,
      alpha: 0.15 + Math.random() * 0.25,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.005 + Math.random() * 0.01,
    }));

    let frameCount = 0;

    const draw = () => {
      frameCount++;
      if (frameCount % 3 !== 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const sw = section.offsetWidth;
      const sh = section.offsetHeight;
      ctx.clearRect(0, 0, sw, sh);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.pulse += p.pulseSpeed;

        if (p.x < 0) p.x = sw;
        if (p.x > sw) p.x = 0;
        if (p.y < 0) p.y = sh;
        if (p.y > sh) p.y = 0;

        const breathingAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${breathingAlpha.toFixed(3)})`);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [density, color, sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1, opacity: 0.6 }}
    />
  );
}
