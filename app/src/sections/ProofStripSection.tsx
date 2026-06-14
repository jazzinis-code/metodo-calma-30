import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  target: number;
  prefix?: string;
  suffix: string;
  decimals: number;
  label: string;
}

const STATS: StatItem[] = [
  { target: 300, prefix: '+', suffix: '', decimals: 0, label: 'mães impactadas' },
  { target: 30, prefix: '', suffix: ' dias', decimals: 0, label: 'de acolhimento e prática' },
  { target: 1, prefix: '', suffix: '', decimals: 0, label: 'método simples para aplicar em casa' },
];

function AnimatedStat({ stat }: { stat: StatItem }) {
  const [value, setValue] = useState(0);
  const [showSuffix, setShowSuffix] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(
          { val: 0 },
          {
            val: stat.target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              setValue(this.targets()[0].val);
            },
            onComplete: () => {
              setShowSuffix(true);
            },
          }
        );
      },
    });

    return () => st.kill();
  }, [stat.target]);

  const displayValue =
    stat.decimals > 0
      ? value.toFixed(stat.decimals)
      : Math.floor(value).toLocaleString('pt-BR');

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-display text-dark-ink"
        style={{
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(36px, 4vw, 52px)',
          letterSpacing: '-0.02em',
        }}
      >
        {displayValue}
        <span
          className="transition-opacity duration-500"
          style={{ opacity: showSuffix ? 1 : 0 }}
        >
          {stat.suffix}
        </span>
      </div>
      <p className="font-body text-[13px] text-body-text mt-2">{stat.label}</p>
    </div>
  );
}

export default function ProofStripSection() {
  return (
    <section className="bg-stone-white border-y border-blush/25 py-[60px] px-6">
      <div className="max-w-[800px] mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-[60px]">
        {STATS.map((stat, i) => (
          <AnimatedStat key={i} stat={stat} />
        ))}
      </div>
    </section>
  );
}
