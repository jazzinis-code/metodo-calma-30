import { useEffect, useRef, useState } from 'react';

export default function MouseFollower() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const targetRef = useRef({ x: -200, y: -200 });
  const currentRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number | null>(null);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.innerWidth < 768;
    if (isMobile.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.12;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.12;
      setPosition({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <div
      className="fixed pointer-events-none z-[999] w-[120px] h-[120px] rounded-full hidden md:block"
      style={{
        background: 'rgba(239, 214, 214, 0.15)',
        filter: 'blur(40px)',
        transform: `translate3d(${position.x - 60}px, ${position.y - 60}px, 0)`,
        willChange: 'transform',
      }}
    />
  );
}
