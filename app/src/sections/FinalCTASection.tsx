import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PillButton from '@/components/PillButton';
import FloatingBlurGradients from '@/components/FloatingBlurGradients';
import { handleConversionClick } from '@/lib/metaPixel';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0, y: 30, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      gsap.from(messageRef.current, {
        opacity: 0, y: 20, duration: 0.9, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      gsap.from(heartRef.current, {
        opacity: 0, duration: 0.8, delay: 0.4, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      gsap.from(ctaRef.current, {
        opacity: 0, y: 20, duration: 0.8, delay: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.15, zIndex: 0 }}
      >
        <source src="/assets/hero-bg.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(135deg, #F5EFE6 0%, rgba(239,214,214,0.25) 50%, #F5EFE6 100%)',
        }}
      />

      <FloatingBlurGradients variant="warm" intensity="subtle" />

      <div className="relative z-10 max-w-[560px] mx-auto px-6 text-center">
        <h2
          ref={titleRef}
          className="heading-display"
          style={{ fontSize: 'clamp(34px, 5vw, 60px)' }}
        >
          Você está fazendo o melhor que pode
        </h2>

        <div
          ref={messageRef}
          className="font-body text-body-text/80 text-[17px] max-md:text-[15px] leading-[1.85] max-w-[440px] mx-auto mt-6"
        >
          <p>A maternidade não precisa ser perfeita para ser bonita.</p>
          <p className="mt-2">Você e seu bebê estão aprendendo juntos.</p>
          <p className="mt-2 text-body-text/65">
            E você não precisa carregar tudo sozinha.
          </p>
        </div>

        <div ref={heartRef} className="mt-8 text-[32px] max-md:text-[28px] animate-heart-pulse">
          💚
        </div>

        <div ref={ctaRef} className="mt-10">
          <PillButton
            href="https://pay.hotmart.com/Y105898564N"
            size="large"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'InitiateCheckout');
              }
              handleConversionClick();
            }}
          >
            Quero atravessar isso com mais calma
          </PillButton>
        </div>

        <p className="font-body text-[11px] text-body-text/40 mt-6">
          Acesso imediato • Leitura pelo celular • 7 dias de garantia
        </p>
      </div>
    </section>
  );
}
