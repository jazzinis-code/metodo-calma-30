import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GenerativeCanvas from '@/components/GenerativeCanvas';
import FloatingBlurGradients from '@/components/FloatingBlurGradients';

gsap.registerPlugin(ScrollTrigger);

const PAIN_CARDS = [
  {
    icon: '🌙',
    title: 'Você dorme, mas não descansa',
    text: 'O sono fragmentado mexe com a sua cabeça. Você acorda exausta e ainda assim precisa ser a versão "ok" da mãe.',
  },
  {
    icon: '😔',
    title: 'Exaustão que ninguém vê',
    text: 'Por fora, parece que você está lidando bem. Por dentro, você está sobrevivendo — e se sentindo culpada por não estar "apenas feliz".',
  },
  {
    icon: '😰',
    title: 'O medo de não estar fazendo certo',
    text: 'Cada choro que você não entende parece uma prova de que não é boa o suficiente. E ninguém te preparou para isso.',
  },
  {
    icon: '💔',
    title: 'A culpa que não tem nome',
    text: 'Você se sente culpada por estar cansada, por querer um minuto só sua, por não sentir só gratidão. E ninguém fala sobre isso.',
  },
  {
    icon: '👶',
    title: 'O choro que parece não ter fim',
    text: 'Você já tentou de tudo. Ficou andando pela casa às 3h da manhã sentindo que está fracassando. E ninguém te ensinou a traduzir esse choro.',
  },
  {
    icon: '🌙',
    title: 'A solidão do quarto escuro',
    text: 'Tem gente ao redor, mas naquela cadeira de amamentação às 4h da manhã, você nunca se sentiu tão sozinha.',
  },
];

export default function PainSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.from(textRef.current, {
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          opacity: 0, y: 60, scale: 0.95, duration: 0.9,
          stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 78%' },
        });
      }

      gsap.from(bridgeRef.current, {
        opacity: 0, y: 30, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: bridgeRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dor"
      className="relative section-padding bg-stone-white overflow-hidden"
    >
      <FloatingBlurGradients variant="blush" intensity="subtle" />
      <GenerativeCanvas color="rgba(239, 214, 214, OPACITY)" baseOpacity={0.06} sectionRef={sectionRef} />

      <div className="relative z-10 content-max-width">
        <h2
          ref={titleRef}
          className="heading-section text-center max-w-[660px] mx-auto"
        >
          Se você está sentindo isso,{' '}
          <em>você não está sozinha</em>
        </h2>

        <p
          ref={textRef}
          className="font-body text-body-text text-lg max-md:text-[15px] text-center max-w-[540px] mx-auto mt-6 leading-[1.85]"
        >
          O pós-parto é uma das transições mais intensas da vida de uma mulher.
          E sentir tudo isso não significa que você está fazendo algo errado —
          significa que você está passando por algo muito real.
        </p>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:mt-12"
        >
          {PAIN_CARDS.map((card, i) => (
            <div
              key={i}
              className="group bg-parchment/80 backdrop-blur-sm border border-blush/30 rounded-3xl p-8 min-h-[220px] flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(109,106,103,0.1)] hover:border-blush/60"
              style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              <span className="text-4xl mb-4 block transition-transform duration-500 group-hover:scale-110">{card.icon}</span>
              <h3 className="font-body font-semibold text-[15px] text-dark-ink mb-3 leading-snug">
                {card.title}
              </h3>
              <p className="font-body text-sm text-body-text/80 leading-relaxed mt-auto">
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* Emotional Bridge */}
        <div ref={bridgeRef} className="flex justify-center mt-14">
          <div className="bg-sage/30 backdrop-blur-sm border border-sage/40 rounded-[24px] px-10 py-7 max-w-[640px] max-md:px-7 max-md:py-6">
            <p className="font-body text-base max-md:text-[15px] text-body-text leading-[1.8] text-center">
              💚 Você não precisa ser forte o tempo todo. Precisa de
              acolhimento. E é isso que o <strong>Método CALMA 30</strong> oferece.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
