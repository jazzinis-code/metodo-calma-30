import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PillButton from '@/components/PillButton';
import FloatingBlurGradients from '@/components/FloatingBlurGradients';
import { handleConversionClick } from '@/lib/metaPixel';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { icon: '💙', text: 'Entender melhor o seu bebê e se sentir mais confiante' },
  { icon: '🌿', text: 'Reduzir a culpa que vem sem ser chamada' },
  { icon: '🤍', text: 'Se sentir emocionalmente acolhida e compreendida' },
  { icon: '🌙', text: 'Criar uma rotina mais leve para você e seu bebê' },
  { icon: '💚', text: 'Se sentir menos sozinha nessa jornada' },
];

export default function OfferSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const breatheRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(breatheRef.current, {
        opacity: 0, y: 30, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          opacity: 0, y: 30, duration: 0.9,
          stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
        });
      }

      gsap.from(priceRef.current, {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: priceRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="oferta"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FAF9F7 0%, rgba(239,214,214,0.12) 40%, rgba(239,214,214,0.08) 60%, #FAF9F7 100%)',
        paddingTop: '120px',
        paddingBottom: '120px',
      }}
    >
      <FloatingBlurGradients variant="blush" intensity="subtle" />

      <div className="relative z-10 max-w-[640px] mx-auto px-6 text-center">
        {/* Emotional breathing space */}
        <div ref={breatheRef} className="mb-14">
          <p className="section-label mb-6">RESPIRA</p>
          <h2 className="heading-section" style={{ fontSize: 'clamp(30px, 4vw, 48px)' }}>
            Você não precisa acertar tudo agora
          </h2>
          <p className="font-body text-body-text/70 text-[15px] leading-[1.85] max-w-[440px] mx-auto mt-5">
            Esse guia foi criado para acolher você exatamente onde você está.
            Sem julgamento. Sem pressão. Só apoio real.
          </p>
        </div>

        <div ref={contentRef}>
          {/* What changes emotionally */}
          <p className="font-body text-[13px] font-medium tracking-[0.1em] uppercase text-body-text/45 mb-5">
            O QUE MUDA QUANDO VOCê TEM ESSE GUIA
          </p>

          <div className="text-left max-w-[420px] mx-auto space-y-1">
            {ITEMS.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 px-4 rounded-xl transition-colors duration-300 hover:bg-white/40"
              >
                <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                <p className="font-body text-[15px] text-body-text leading-[1.7]">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-10 flex justify-center">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-blush/50 to-transparent" />
          </div>

          {/* What's included */}
          <p className="font-body text-[13px] font-medium tracking-[0.1em] uppercase text-body-text/45 mb-4">
            O QUE VOCê RECEBE
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[
              'E-book PDF completo',
              'Método CALMA 30',
              'Checklist 7 dias',
              'Checklist 30 dias',
              'Acesso imediato',
            ].map((item, i) => (
              <span key={i} className="font-body text-[13px] text-body-text/60 flex items-center gap-1.5">
                <span className="text-sage">✓</span> {item}
              </span>
            ))}
          </div>
        </div>

        {/* Price */}
        <div ref={priceRef} className="relative mt-4">
          <p className="font-body text-sm text-body-text/50 mb-3">
            Um investimento menor que um café com uma amiga
          </p>
          <p
            className="text-dark-ink"
            style={{
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(52px, 8vw, 72px)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
            }}
          >
            R$ 27,90
          </p>
          <p className="font-body text-[13px] text-body-text/50 mt-4">
            Pagamento único • Acesso vitalício • Leitura no celular
          </p>

          {/* CTA - softer, no excessive glow */}
          <div className="mt-8">
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
              Preciso desse acolhimento
            </PillButton>
          </div>

          {/* Guarantee */}
          <div className="mt-7 flex justify-center">
            <div className="bg-sage/25 border border-sage/30 rounded-pill px-7 py-2.5">
              <p className="font-body text-[12px] text-body-text/70">
                🛡️ 7 dias de garantia — se não sentir acolhimento, devolvemos 100%
              </p>
            </div>
          </div>

          <p className="font-body text-[11px] text-body-text/40 mt-4">
            Pagamento seguro pela Hotmart
          </p>
        </div>
      </div>
    </section>
  );
}
