import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  'Bem-vinda à fase que ninguém explica',
  'Por que o bebê não dorme (e o que fazer)',
  'Como descansar mesmo dormindo pouco',
  'Amamentação sem pressão',
  'O emocional da mãe — o que ninguém conta',
  'Rotina leve para dias mais tranquilos',
  'Sinais importantes — quando buscar ajuda',
  'Checklist Premium dos Primeiros 7 Dias',
  'Checklist dos Primeiros 30 Dias',
];

export default function InsideEbookSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const bonusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      if (listRef.current) {
        gsap.from(listRef.current.children, {
          opacity: 0,
          x: -20,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 75%' },
        });
      }

      gsap.from(bonusRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: bonusRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="conteudo"
      className="section-padding bg-parchment"
    >
      <div className="max-w-[1000px] mx-auto px-6">
        <p className="section-label mb-4">O QUE TEM DENTRO</p>

        <h2
          ref={titleRef}
          className="heading-section text-center max-w-[640px] mx-auto"
        >
          Cada capítulo foi escrito como uma conversa de mãe para mãe
        </h2>

        {/* Chapter List */}
        <div ref={listRef} className="max-w-[720px] mx-auto mt-12">
          {CHAPTERS.map((chapter, i) => (
            <div
              key={i}
              className="flex items-center gap-4 py-5 border-b border-blush/30 group hover:bg-blush/[0.08] transition-colors duration-300 px-2 -mx-2 rounded-lg"
            >
              <span className="font-display italic text-2xl text-blush/60 w-8 flex-shrink-0">
                {i + 1}
              </span>
              <span className="font-body font-medium text-[17px] text-dark-ink flex-1">
                {chapter}
              </span>
              <span className="text-sm text-sage flex-shrink-0">🌿</span>
            </div>
          ))}
        </div>

        {/* Bonus Banner */}
        <div ref={bonusRef} className="mt-9 max-w-[720px] mx-auto">
          <div
            className="rounded-[20px] px-9 py-7 max-md:px-6 max-md:py-5 text-center border border-sage/50"
            style={{
              background: 'linear-gradient(135deg, rgba(220,229,220,0.4) 0%, rgba(239,214,214,0.3) 100%)',
            }}
          >
            <span className="text-xl mb-3 block">✨</span>
            <p className="font-body font-medium text-[15px] text-dark-ink leading-relaxed">
              Bônus Premium Incluso: Método CALMA 30 — um framework completo com
              5 pilares para transformar seus primeiros 30 dias de maternidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
