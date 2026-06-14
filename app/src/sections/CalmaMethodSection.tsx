import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GenerativeCanvas from '@/components/GenerativeCanvas';
import FloatingBlurGradients from '@/components/FloatingBlurGradients';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    letter: 'C',
    title: 'Compreender o bebê',
    icon: '💙',
    text: 'Cada choro, cada espirro, cada movimento é uma forma de comunicação. Você vai aprender a interpretar os sinais do seu bebê com calma — e perceber que já está fazendo mais certo do que imagina.',
  },
  {
    letter: 'A',
    title: 'Acolher a si mesma',
    icon: '💚',
    text: 'A melhor mãe que seu bebê pode ter é uma mãe que se cuida. Você merece gentileza, descanso e compaixão — especialmente vinda de você mesma.',
  },
  {
    letter: 'L',
    title: 'Leveza na rotina',
    icon: '🌿',
    text: 'Rotinas que funcionam na vida real, não na teoria. Flexíveis, humanas e sem perfeccionismo. Porque uma rotina que te prende não é rotina — é prisão.',
  },
  {
    letter: 'M',
    title: 'Minimizar o esgotamento',
    icon: '🌙',
    text: 'Estratégias práticas para descansar, pedir ajuda e proteger sua energia emocional. Você não precisa estar disponível 24h por dia para ser uma boa mãe.',
  },
  {
    letter: 'A',
    title: 'Ajustar expectativas',
    icon: '🤍',
    text: 'Sua maternidade não precisa parecer com a de ninguém. Liberte-se das expectativas irreais e encontre seu próprio ritmo — ele é válido, ele é seu.',
  },
];

export default function CalmaMethodSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lettersRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      lettersRef.current.forEach((letterEl, i) => {
        if (!letterEl) return;

        gsap.fromTo(letterEl,
          { opacity: 0.04, textShadow: 'none' },
          {
            opacity: 0.85,
            textShadow: '0 0 100px rgba(220, 229, 220, 0.5)',
            ease: 'none',
            scrollTrigger: {
              trigger: letterEl,
              start: 'top 85%',
              end: 'top 25%',
              scrub: 1.5,
            },
          }
        );

        const cardEl = cardsRef.current[i];
        if (cardEl) {
          const fromX = i % 2 === 0 ? -100 : 100;
          gsap.fromTo(cardEl,
            { opacity: 0, x: fromX, y: 30 },
            {
              opacity: 1, x: 0, y: 0, duration: 1.2, ease: 'power2.out',
              scrollTrigger: {
                trigger: letterEl,
                start: 'top 75%',
                end: 'top 35%',
                scrub: 1,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="metodo"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F5EFE6 0%, rgba(220,229,220,0.15) 40%, rgba(239,214,214,0.2) 60%, #F5EFE6 100%)',
        paddingTop: '140px',
        paddingBottom: '120px',
      }}
    >
      <FloatingBlurGradients variant="mixed" intensity="subtle" />
      <GenerativeCanvas color="rgba(220, 229, 220, OPACITY)" baseOpacity={0.05} sectionRef={sectionRef} />

      <div className="relative z-10 max-w-[900px] mx-auto px-6">
        <p className="section-label mb-4">O MÉTODO</p>

        <h2 className="heading-display text-center" style={{ fontSize: 'clamp(44px, 5vw, 68px)' }}>
          CALMA 30
        </h2>

        <p className="font-body text-body-text text-center text-base leading-[1.85] max-w-[480px] mx-auto mt-5">
          Cinco pilares que guiam você pelos primeiros 30 dias com mais
          presença, mais leveza e menos culpa.
        </p>

        <div className="flex justify-center mt-5 mb-20">
          <div className="w-[60px] h-[2px] bg-hero-accent/25 rounded-full" />
        </div>

        {/* Letter + Card pairs */}
        <div className="space-y-0">
          {PILLARS.map((pillar, i) => (
            <div key={i} className="relative min-h-[45vh] flex items-center">
              {/* Large Letter */}
              <div
                ref={(el) => { lettersRef.current[i] = el; }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                style={{
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(140px, 22vw, 260px)',
                  color: '#3D3833',
                  opacity: 0.04,
                  willChange: 'opacity, text-shadow',
                  zIndex: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {pillar.letter}
              </div>

              {/* Pillar Card */}
              <div
                ref={(el) => { cardsRef.current[i] = el; }}
                className={`relative z-10 bg-parchment/90 backdrop-blur-sm border border-sage/40 rounded-3xl p-10 max-w-[500px] shadow-[0_12px_48px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(109,106,103,0.1)] ${i % 2 === 0 ? 'mr-auto' : 'ml-auto'
                  } max-md:mx-auto max-md:w-full`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{pillar.icon}</span>
                  <h3 className="font-body font-bold text-lg text-dark-ink">
                    {pillar.letter} — {pillar.title}
                  </h3>
                </div>
                <p className="font-body text-[15px] text-body-text/85 leading-[1.8]">
                  {pillar.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
