import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingBlurGradients from '@/components/FloatingBlurGradients';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ROW1 = [
  'Me senti acolhida desde as primeiras páginas',
  'Parecia que alguém finalmente entendia o que eu estava vivendo',
  'Esse guia me trouxe calma em um momento muito difícil',
  'Li durante a amamentação e chorei de alívio',
  'Finalmente algo que não me julga',
];

const MARQUEE_ROW2 = [
  'O melhor investimento que fiz no meu pós-parto',
  'Recomendo para toda mãe de primeira viagem',
  'A linguagem é tão humana, tão real',
  'Me deu coragem para pedir ajuda',
  'O método CALMA virou minha âncora',
];

const TESTIMONIALS = [
  {
    quote: 'Parecia que alguém finalmente entendia o que eu estava vivendo.',
    text: 'Li durante as madrugadas de amamentação e chorei de alívio. Finalmente alguém falava a verdade sobre o pós-parto sem me julgar. Me senti vista pela primeira vez.',
    name: 'Fernanda, 31 anos',
    role: 'mãe de Valentina',
    image: '/assets/testimonial-2.webp',
  },
  {
    quote: 'Me senti acolhida desde as primeiras páginas.',
    text: 'Ninguém me preparou para o que eu sentiria. Esse guia me fez entender que tudo o que eu estava sentindo — o cansaço, a culpa, a solidão — era normal.',
    name: 'Camila, 28 anos',
    role: 'mãe de Lucas',
    image: '/assets/testimonial-1.webp',
  },
  {
    quote: 'Esse guia me trouxe calma em um momento muito difícil.',
    text: 'Os primeiros 7 dias foram caóticos, mas o checklist me deu uma estrutura. Me senti menos perdida. E o capítulo sobre o emocional da mãe me salvou.',
    name: 'Juliana, 26 anos',
    role: 'mãe de Pedro',
    image: '/assets/testimonial-3.webp',
  },
  {
    quote: 'A maternidade não precisa ser perfeita para ser bonita.',
    text: 'Esse guia me ensinou que ser mãe é aprender junto com o bebê. Hoje me sinto mais calma, mais segura e menos culpada por não ser "perfeita".',
    name: 'Larissa, 29 anos',
    role: 'mãe de Sofia',
    image: '/assets/testimonial-4.webp',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          opacity: 0, y: 60, duration: 1,
          stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
      className="relative overflow-hidden"
      style={{ background: '#FAF9F7', paddingTop: '100px', paddingBottom: '80px' }}
    >
      <FloatingBlurGradients variant="warm" intensity="subtle" />

      <div className="relative z-10">
        <p className="section-label mb-4">MAES QUE JA ENCONTRARAM CALMA</p>

        <h2 className="heading-section text-center max-w-[600px] mx-auto px-6">
          Elas também se sentiram sozinhas. Até encontrarem esse acolhimento.
        </h2>

        {/* Marquee Row 1 - Left */}
        <div className="mt-10 overflow-hidden group" style={{ background: 'rgba(239,214,214,0.12)' }}>
          <div className="flex animate-marquee-left group-hover:[animation-play-state:paused] py-4 whitespace-nowrap">
            {[...MARQUEE_ROW1, ...MARQUEE_ROW1].map((text, i) => (
              <span key={i} className="font-body italic text-[15px] text-body-text/45 mx-5 flex-shrink-0">
                "{text}" <span className="text-blush/40 mx-2">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 - Right */}
        <div className="overflow-hidden group" style={{ background: 'rgba(220,229,220,0.12)' }}>
          <div className="flex animate-marquee-right group-hover:[animation-play-state:paused] py-4 whitespace-nowrap">
            {[...MARQUEE_ROW2, ...MARQUEE_ROW2].map((text, i) => (
              <span key={i} className="font-body italic text-[15px] text-body-text/45 mx-5 flex-shrink-0">
                "{text}" <span className="text-sage/60 mx-2">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Featured Testimonials Grid */}
        <div
          ref={cardsRef}
          className="max-w-[960px] mx-auto mt-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-7"
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="group relative bg-white/80 backdrop-blur-sm border border-blush/25 rounded-[28px] p-9 shadow-[0_4px_32px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(109,106,103,0.12)] hover:border-blush/50"
            >
              {/* Quote */}
              <p className="font-body italic text-[17px] text-dark-ink/90 leading-[1.7]">
                "{t.quote}"
              </p>

              {/* Story */}
              <p className="font-body text-[15px] text-body-text/80 mt-4 leading-[1.75]">
                {t.text}
              </p>

              {/* Divider */}
              <div className="w-10 h-[1px] bg-gradient-to-r from-blush to-sage mt-7" />

              {/* Author */}
              <div className="flex items-center gap-3 mt-5">
                <img
                  src={t.image}
                  alt={t.name}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-blush/20"
                />
                <div>
                  <p className="font-body font-semibold text-sm text-dark-ink">{t.name}</p>
                  <p className="font-body text-xs text-body-text/60">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
