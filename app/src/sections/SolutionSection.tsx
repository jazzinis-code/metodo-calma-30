import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PillButton from '@/components/PillButton';
import FloatingBlurGradients from '@/components/FloatingBlurGradients';

gsap.registerPlugin(ScrollTrigger);

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);
  const para3Ref = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on image
      if (imageRef.current) {
        gsap.to(imageRef.current.querySelector('img'), {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      gsap.from(imageRef.current, {
        opacity: 0, x: -50, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      const textEls = [labelRef, titleRef, para1Ref, para2Ref, para3Ref, ctaRef];
      textEls.forEach((ref, i) => {
        gsap.from(ref.current, {
          opacity: 0, x: 40, y: 20, duration: 1,
          delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="guia" className="relative section-padding bg-parchment overflow-hidden">
      <FloatingBlurGradients variant="sage" intensity="subtle" />

      <div className="relative z-10 content-max-width flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
        {/* Image */}
        <div ref={imageRef} className="w-full lg:w-[44%] flex-shrink-0">
          <div className="relative overflow-hidden rounded-[28px]">
            <picture>
              <source
                media="(max-w: 768px)"
                srcSet="/assets/hero-mother-mobile.webp"
                width={480}
                height={658}
              />
              <img
                src="/assets/hero-mother-desktop.webp"
                alt="Mãe em momento de conexão com seu bebê"
                width={864}
                height={1184}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/5] object-cover"
                style={{ willChange: 'transform' }}
              />
            </picture>
            <div className="absolute inset-0 rounded-[28px] pointer-events-none"
              style={{ background: 'linear-gradient(to top right, rgba(220,229,220,0.15) 0%, transparent 50%)' }} />
          </div>
        </div>

        {/* Text */}
        <div className="w-full lg:w-[56%]">
          <p ref={labelRef} className="section-label text-left mb-5">CONHEÇA O GUIA</p>

          <h2 ref={titleRef} className="heading-section">
            Um caminho mais leve para atravessar os primeiros dias
          </h2>

          <p ref={para1Ref} className="font-body text-body-text text-base leading-[1.85] mt-6">
            <strong>Sobrevivendo ao Pós-Parto</strong> não é um manual técnico.
            É um abraço escrito para mães de primeira viagem que estão vivendo
            uma das transições mais intensas — e mais silenciadas — da vida de
            uma mulher.
          </p>

          <p ref={para2Ref} className="font-body text-body-text text-base leading-[1.85] mt-5">
            Criado pelo <strong>Método CALMA 30</strong>, este guia une orientação
            prática com acolhimento emocional profundo. Cada capítulo foi
            escrito como uma conversa sincera entre amigas — para que você se
            sinta verdadeiramente compreendida.
          </p>

          <p ref={para3Ref} className="font-body text-body-text text-base leading-[1.85] mt-5">
            Aqui não existe julgamento. Não existe pressão por perfeição. Não
            existe linguagem hospitalar. Só a verdade real da maternidade — e
            como atravessá-la com mais leveza, mais calma e mais você.
          </p>

          <div ref={ctaRef} className="mt-9">
            <PillButton onClick={() => {
              const el = document.querySelector('#metodo');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              Conhecer o Método CALMA 30
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
