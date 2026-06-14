import { useRef, useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';

interface PillButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  href?: string;
  onClick?: () => void;
  size?: 'default' | 'large';
  className?: string;
}

export default function PillButton({
  children,
  variant = 'primary',
  href,
  onClick,
  size = 'default',
  className = '',
}: PillButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.15;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.15;
    setTransform({ x: currentRef.current.x, y: currentRef.current.y });
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const btn = buttonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDist = 60;
      const maxMove = 12;

      if (distance < maxDist) {
        const factor = 1 - distance / maxDist;
        targetRef.current = {
          x: distX * factor * (maxMove / maxDist),
          y: distY * factor * (maxMove / maxDist),
        };
      } else {
        targetRef.current = { x: 0, y: 0 };
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    gsap.to(targetRef.current, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: 'elastic.out(1, 0.5)',
      onUpdate: () => {
        currentRef.current.x = targetRef.current.x;
        currentRef.current.y = targetRef.current.y;
      },
    });
  }, []);

  const baseStyles =
    'inline-flex items-center justify-center rounded-pill font-body font-bold tracking-[0.02em] transition-all duration-350 ease-out cursor-pointer select-none';

  const sizeStyles =
    size === 'large'
      ? 'px-12 py-[18px] text-lg max-md:px-8 max-md:py-4 max-md:text-base'
      : 'px-10 py-4 text-base max-md:px-8 max-md:py-3.5 max-md:text-[15px]';

  const variantStyles =
    variant === 'primary'
      ? 'bg-hero-accent text-white hover:bg-cta-dark hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_12px_48px_rgba(30,99,255,0.2)]'
      : 'bg-transparent border-[1.5px] border-hero-accent/20 text-hero-accent hover:bg-hero-accent/[0.04] hover:border-hero-accent/50 hover:shadow-[0_8px_24px_rgba(30,99,255,0.08)]';

  const combinedClassName = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  const style = {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  };

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
        style={style}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={combinedClassName}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
