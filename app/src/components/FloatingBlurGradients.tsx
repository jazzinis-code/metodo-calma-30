import { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  color: string;
  opacity: number;
}

interface FloatingBlurGradientsProps {
  variant?: 'blush' | 'sage' | 'warm' | 'mixed';
  intensity?: 'subtle' | 'medium' | 'strong';
}

const COLORSETS = {
  blush: ['rgba(239, 214, 214, OPACITY)', 'rgba(216, 167, 167, OPACITY)', 'rgba(245, 239, 230, OPACITY)'],
  sage: ['rgba(220, 229, 220, OPACITY)', 'rgba(200, 215, 200, OPACITY)', 'rgba(245, 239, 230, OPACITY)'],
  warm: ['rgba(239, 214, 214, OPACITY)', 'rgba(245, 239, 230, OPACITY)', 'rgba(220, 229, 220, OPACITY)'],
  mixed: ['rgba(239, 214, 214, OPACITY)', 'rgba(220, 229, 220, OPACITY)', 'rgba(216, 167, 167, OPACITY)'],
};

const OPACITY_MAP = {
  subtle: 0.35,
  medium: 0.5,
  strong: 0.7,
};

export default function FloatingBlurGradients({ variant = 'mixed', intensity = 'subtle' }: FloatingBlurGradientsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.offsetWidth || window.innerWidth;
    const h = container.offsetHeight || 600;
    const colors = COLORSETS[variant];
    const baseOpacity = OPACITY_MAP[intensity];

    // Create 3-5 floating orbs
    orbsRef.current = Array.from({ length: 4 }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 200 + Math.random() * 300,
      dx: (Math.random() - 0.5) * 0.15,
      dy: (Math.random() - 0.5) * 0.12,
      color: colors[i % colors.length].replace('OPACITY', String(baseOpacity)),
      opacity: baseOpacity * (0.6 + Math.random() * 0.4),
    }));

    let lastTime = 0;
    const animate = (time: number) => {
      // Throttle to ~20fps for calm, slow movement
      if (time - lastTime < 50) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      const w2 = container.offsetWidth || window.innerWidth;
      const h2 = container.offsetHeight || 600;

      orbsRef.current.forEach((orb) => {
        orb.x += orb.dx;
        orb.y += orb.dy;

        if (orb.x < -orb.r) orb.x = w2 + orb.r;
        if (orb.x > w2 + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = h2 + orb.r;
        if (orb.y > h2 + orb.r) orb.y = -orb.r;
      });

      const children = container.children;
      orbsRef.current.forEach((orb, i) => {
        if (children[i]) {
          (children[i] as HTMLElement).style.transform = `translate3d(${orb.x - orb.r}px, ${orb.y - orb.r}px, 0)`;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [variant, intensity]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            filter: 'blur(120px)',
            willChange: 'transform',
            background: 'radial-gradient(circle, rgba(239,214,214,0.4) 0%, rgba(239,214,214,0) 70%)',
          }}
        />
      ))}
    </div>
  );
}
