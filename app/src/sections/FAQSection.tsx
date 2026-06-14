import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingBlurGradients from '@/components/FloatingBlurGradients';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Para quem é este guia?',
    answer:
      'Este guia foi criado para mães de primeira viagem que estão atravessando os primeiros 30 dias do pós-parto. Se você está se sentindo cansada, insegura, sobrecarregada ou sozinha — mesmo com pessoas ao redor — este material foi feito para acolher você exatamente onde você está.',
  },
  {
    question: 'Como recebo o material após a compra?',
    answer:
      'Assim que seu pagamento for confirmado (isso leva apenas alguns minutos), você recebe um e-mail com um link seguro para download do PDF. É imediato, simples e você pode acessar pelo celular, tablet ou computador. Sem espera, sem complicação.',
  },
  {
    question: 'Posso ler no celular?',
    answer:
      'Sim, e foi justamente pensando nisso que o guia foi formatado. Muitas mães leem durante a amamentação, nos momentos de descanso ou até nas madrugadas. O PDF é otimizado para leitura confortável em qualquer tela.',
  },
  {
    question: 'Serve tanto para cesárea quanto parto normal?',
    answer:
      'Com certeza. O conteúdo abrange a experiência emocional e prática do pós-parto, independentemente do tipo de parto. Cada maternidade é única, e o guia respeita e acolhe todas as experiências.',
  },
  {
    question: 'Este material substitui acompanhamento médico?',
    answer:
      'Não. Este guia é educativo e emocional, feito para complementar — nunca substituir — o acompanhamento médico, psicológico ou pediátrico. Sempre consulte seus profissionais de saúde para questões clínicas. Mas para o que ninguém te preparou emocionalmente, este guia está aqui.',
  },
];

function AccordionItem({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-blush/30">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-7 text-left bg-transparent border-none cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="font-body font-semibold text-[15px] text-dark-ink pr-10 group-hover:text-hero-accent transition-colors duration-300 leading-snug">
          {item.question}
        </span>
        <span
          className="text-body-text/70 text-xl flex-shrink-0 transition-all duration-400"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? '350px' : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <p className="font-body text-[15px] text-body-text/85 leading-[1.85] pb-7 pr-12">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const disclaimerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (itemsRef.current) {
        gsap.from(itemsRef.current.children, {
          opacity: 0, y: 25, duration: 0.6,
          stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: itemsRef.current, start: 'top 80%' },
        });
      }
      gsap.from(disclaimerRef.current, {
        opacity: 0, y: 30, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: disclaimerRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="relative section-padding bg-parchment overflow-hidden">
      <FloatingBlurGradients variant="sage" intensity="subtle" />

      <div className="relative z-10 max-w-[800px] mx-auto px-6">
        <p className="section-label mb-4">DÚVIDAS COMUNS</p>

        <h2 className="heading-section text-center">
          Tire suas dúvidas
        </h2>

        <div ref={itemsRef} className="mt-14">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              item={faq}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <div
          ref={disclaimerRef}
          className="mt-10 bg-sage/25 border border-sage/40 rounded-2xl px-8 py-6 max-md:px-6 max-md:py-5"
        >
          <p className="font-body text-sm text-body-text/85 leading-[1.8]">
            <strong className="font-semibold text-dark-ink">💚 Aviso importante:</strong>{' '}
            O Método CALMA 30 e o guia <em>Sobrevivendo ao Pós-Parto</em> são
            materiais educativos e de apoio emocional. Não substituem
            acompanhamento médico, psicológico ou pediátrico. Em caso de
            emergência ou dúvidas de saúde, consulte sempre um profissional
            qualificado.
          </p>
        </div>
      </div>
    </section>
  );
}
