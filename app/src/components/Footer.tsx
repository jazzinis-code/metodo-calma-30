const FOOTER_LINKS = {
  guia: [
    { label: 'O Guia', href: '#guia' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'FAQ', href: '#faq' },
  ],
  legal: [
    { label: 'Política de Privacidade', href: '#' },
    { label: 'Termos de Uso', href: '#' },
  ],
};

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-parchment border-t border-blush/30">
      <div className="max-w-[1120px] mx-auto px-6 pt-20 pb-10 max-md:px-5 max-md:pt-14 max-md:pb-8">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Brand */}
          <div>
            <h3
              className="text-2xl max-md:text-xl text-dark-ink"
              style={{ fontFamily: '"Cormorant Garamond", "Lora", serif', fontWeight: 600 }}
            >
              Método CALMA 30
            </h3>
            <p className="font-body text-[13px] text-body-text mt-2">
              Sobrevivendo ao Pós-Parto
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16 max-md:gap-10">
            <div>
              <h4 className="font-body text-xs font-medium tracking-[0.08em] uppercase text-body-text/60 mb-4">
                Links
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.guia.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="font-body text-[13px] text-body-text hover:text-hero-accent transition-colors bg-transparent border-none cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-body text-xs font-medium tracking-[0.08em] uppercase text-body-text/60 mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-[13px] text-body-text hover:text-hero-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-12 flex justify-center">
          <div className="bg-sage/40 rounded-2xl px-8 py-5 max-md:px-6 max-md:py-4 max-w-2xl">
            <p className="font-body text-xs text-body-text leading-relaxed text-center">
              💚 Este material é educativo e emocional. Não substitui acompanhamento médico, psicológico ou pediátrico.
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-10 pt-6 border-t border-body-text/[0.08] flex flex-col md:flex-row md:justify-between gap-3">
          <p className="font-body text-[11px] text-body-text/60">
            Atendimento nacional • 100% online
          </p>
          <p className="font-body text-[11px] text-body-text/60">
            © 2025 Método CALMA 30
          </p>
        </div>
      </div>
    </footer>
  );
}
