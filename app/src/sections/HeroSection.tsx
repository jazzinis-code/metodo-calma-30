import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PillButton from '@/components/PillButton';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const hookRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on image
      if (imageRef.current) {
        gsap.to(imageRef.current.querySelector('img'), {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      const tl = gsap.timeline({ delay: 0.4 });

      tl.to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power3.out',
      })
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.8')
        .to(hookRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.7')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
        .to(trustRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    }, sectionRef);

    const handleScroll = () => {
      if (chevronRef.current && window.scrollY > 120) {
        chevronRef.current.style.opacity = '0';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ minHeight: '700px' }}
    >
      {/* Video Background - very subtle */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.12, zIndex: 0 }}
      >
        <source src="/assets/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient base */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(160deg, #FAF9F7 0%, #F5EFE6 50%, rgba(239,214,214,0.2) 100%)',
        }}
      />

      {/* Soft blur orbs - reduced intensity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        <div
          className="absolute w-[450px] h-[450px] rounded-full"
          style={{
            top: '15%',
            left: '-15%',
            background: 'radial-gradient(circle, rgba(239,214,214,0.35) 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />
        <div
          className="absolute w-[350px] h-[350px] rounded-full"
          style={{
            bottom: '10%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(220,229,220,0.3) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-6 py-20 max-md:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Image */}
          <div ref={imageRef} className="w-full lg:w-[42%] flex-shrink-0">
            <div className="relative overflow-hidden rounded-[28px]">
              <picture>
                <source
                  media="(max-w: 768px)"
                  srcSet="/assets/hero-mother-baby-mobile.webp"
                  width={480}
                  height={658}
                />
                <img
                  src="/assets/hero-mother-baby-desktop.webp"
                  alt="Mãe abraçando seu recém-nascido com ternura"
                  width={864}
                  height={1184}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full aspect-[3/4] object-cover shadow-[0_30px_80px_rgba(109,106,103,0.1)]"
                  style={{ willChange: 'transform' }}
                />
              </picture>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(250,249,247,0.5) 0%, transparent 35%, rgba(250,249,247,0.08) 100%)',
                }}
              />
            </div>
          </div>

          {/* Right: Text content */}
          <div className="w-full lg:w-[58%] flex flex-col items-start">
            {/* Emotional micro-tag */}
            <div className="flex items-center gap-2 mb-5 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blush/50 inline-block" />
              <span className="font-body text-[11px] font-medium tracking-[0.12em] uppercase text-body-text/45">
                Um guia para mães de primeira viagem
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="heading-display opacity-0 translate-y-8 text-left"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              Talvez ninguém tenha te contado o quanto o pós-parto pode ser{' '}
              <em className="animate-breathe">solitário</em>
            </h1>

            <div
              ref={subtitleRef}
              className="font-body text-body-text text-[17px] max-md:text-[15px] leading-[1.85] max-w-[480px] mt-8 opacity-0 translate-y-6"
            >
              <p>Você ama seu bebê.</p>
              <p className="mt-2">Mas também está cansada.</p>
              <p className="mt-2 text-body-text/75">
                E talvez ninguém esteja falando sobre isso.
              </p>
            </div>

            <p
              ref={hookRef}
              className="font-body text-body-text/65 text-[15px] leading-[1.8] max-w-[420px] mt-6 opacity-0 translate-y-6"
            >
              Mais de 2.800 mães já encontraram aqui o acolhimento que não sabiam
              que precisavam.
              <br className="hidden sm:block" />
              Você não precisa carregar tudo sozinha.
            </p>

            {/* CTA */}
            <div ref={ctaRef} className="mt-10 opacity-0 translate-y-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <PillButton onClick={() => scrollToSection('#oferta')}>
                  Quero me sentir mais segura
                </PillButton>
                <PillButton
                  variant="outline"
                  onClick={() => scrollToSection('#conteudo')}
                >
                  Ver o que tem dentro
                </PillButton>
              </div>
            </div>

            <div
              ref={trustRef}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-8 opacity-0 translate-y-4"
            >
              <span className="font-body text-[11px] text-body-text/50">
                💙 2.847 mães acolhidas
              </span>
              <span className="text-blush/30">|</span>
              <span className="font-body text-[11px] text-body-text/50">
                Acesso imediato
              </span>
              <span className="text-blush/30">|</span>
              <span className="font-body text-[11px] text-body-text/50">
                7 dias de garantia
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={chevronRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-500"
        style={{ opacity: 0.2 }}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-body-text">
          <path d="M5 7L10 12L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
