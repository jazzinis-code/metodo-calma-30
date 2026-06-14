import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PillButton from '@/components/PillButton';
import { handleConversionClick } from '@/lib/metaPixel';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { icon: '📱', text: 'Leia pelo celular, tablet ou computador — onde você estiver' },
  { icon: '⚡', text: 'Acesso imediato após a compra — comece a ler em minutos' },
  { icon: '📄', text: 'Formato PDF otimizado — navegação fácil e confortável' },
  { icon: '💙', text: 'Conteúdo acolhedor e direto — sem enrolação técnica' },
];

export default function ProductShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(mockupRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });

      if (textRef.current) {
        gsap.from(textRef.current.children, {
          opacity: 0,
          x: 30,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-stone-white"
    >
      <div className="content-max-width flex flex-col lg:flex-row items-center gap-12 lg:gap-[60px]">
        {/* Mockup */}
        <div ref={mockupRef} className="w-full lg:w-1/2 flex justify-center">
          <div
            className="max-w-[360px] w-full transition-transform duration-700"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                'perspective(800px) rotateY(-4deg) rotateX(2deg)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                'perspective(800px) rotateY(0deg) rotateX(0deg)';
            }}
          >
            <img
              src="/assets/ebook-cover.webp"
              alt="E-book Sobrevivendo ao Pós-Parto"
              width={864}
              height={1184}
              loading="lazy"
              decoding="async"
              className="w-full rounded-2xl"
              style={{
                filter: 'drop-shadow(0 30px 60px rgba(109, 106, 103, 0.1))',
              }}
            />
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} className="w-full lg:w-1/2">
          <p className="section-label text-left mb-5">SEU GUIA</p>

          <h2
            className="heading-section"
          >
            Leitura simples pelo celular. Acesso imediato. Conteúdo que acolhe.
          </h2>

          <div className="mt-8 space-y-5">
            {FEATURES.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{feature.icon}</span>
                <p className="font-body text-[15px] text-body-text leading-relaxed">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 bg-sage/25 rounded-2xl px-6 py-5">
            <p className="font-body text-sm text-body-text/80 leading-relaxed">
              Tudo entregue digitalmente. Sem espera, sem complicação. Você
              recebe um link seguro logo após a confirmação do pagamento.
            </p>
          </div>

          <div className="mt-8">
            <PillButton onClick={() => {
              if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'InitiateCheckout');
              }
              handleConversionClick();
              window.open("https://pay.hotmart.com/Y105898564N", "_blank");
            }}>
              Quero meu guia agora — R$ 27,90
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
