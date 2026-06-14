import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Line {
  points: { x: number; y: number }[];
  offset: number;
  speed: number;
  opacity: number;
}

interface GenerativeCanvasProps {
  color: string;
  baseOpacity?: number;
  sectionRef: React.RefObject<HTMLElement | null>;
}

export default function GenerativeCanvas({ color, baseOpacity = 0.08, sectionRef }: GenerativeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<Line[]>([]);
  const animationRef = useRef<number | null>(null);
  const pulseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resize();

    // Initialize lines
    const lineCount = 8;
    const w = section.offsetWidth;
    const h = section.offsetHeight;
    linesRef.current = Array.from({ length: lineCount }, () => ({
      points: Array.from({ length: 20 }, (_, i) => ({
        x: (w / 20) * i,
        y: h * 0.3 + Math.random() * h * 0.4,
      })),
      offset: Math.random() * 1000,
      speed: 0.2 + Math.random() * 0.3,
      opacity: baseOpacity * (0.5 + Math.random() * 0.5),
    }));

    // Scroll pulse
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        gsap.to(pulseRef, { current: 1, duration: 1, ease: 'power2.out' });
        setTimeout(() => {
          gsap.to(pulseRef, { current: 0, duration: 2, ease: 'power2.out' });
        }, 2000);
      },
      onLeaveBack: () => {
        pulseRef.current = 0;
      },
    });

    let time = 0;

    const draw = () => {
      const sectionW = section.offsetWidth;
      const sectionH = section.offsetHeight;
      ctx.clearRect(0, 0, sectionW, sectionH);

      const pulseAlpha = pulseRef.current;

      linesRef.current.forEach((line) => {
        ctx.beginPath();
        const pts = line.points;

        for (let i = 0; i < pts.length; i++) {
          const px = pts[i].x;
          const py = pts[i].y + Math.sin(time * line.speed + line.offset + i * 0.3) * 30;
          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        const alpha = line.opacity + pulseAlpha * 0.1;
        ctx.strokeStyle = color.replace('OPACITY', String(Math.min(alpha, 0.25)));
        ctx.lineWidth = 1;
        ctx.stroke();

        // Trailing head
        const lastIdx = pts.length - 1;
        const headX = pts[lastIdx].x;
        const headY = pts[lastIdx].y + Math.sin(time * line.speed + line.offset + lastIdx * 0.3) * 30;
        ctx.beginPath();
        ctx.arc(headX, headY, 2, 0, Math.PI * 2);
        ctx.fillStyle = color.replace('OPACITY', String(Math.min(alpha * 1.5, 0.35)));
        ctx.fill();
      });

      time += 0.016;
      animationRef.current = window.setTimeout(() => {
        requestAnimationFrame(draw);
      }, 66); // ~15fps
    };

    draw();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) clearTimeout(animationRef.current);
      st.kill();
    };
  }, [color, baseOpacity, sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
