import { useState, useEffect } from 'react';
import { handleConversionClick } from '@/lib/metaPixel';

const NAV_LINKS = [
  { label: 'O Guia', href: '#guia' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'FAQ', href: '#faq' },
];

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 max-md:h-14 transition-all duration-400 ${
        scrolled
          ? 'bg-parchment/[0.92] backdrop-blur-[16px] border-b border-blush/30 shadow-[0_1px_20px_rgba(0,0,0,0.04)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1120px] mx-auto h-full flex items-center justify-between px-6 max-md:px-5">
        {/* Brand */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-xl max-md:text-lg text-dark-ink tracking-tight"
          style={{ fontFamily: '"Cormorant Garamond", "Lora", serif', fontWeight: 600 }}
        >
          CALMA 30
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="font-body text-xs font-medium tracking-[0.08em] uppercase text-body-text hover:text-hero-accent transition-colors duration-250 bg-transparent border-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="https://pay.hotmart.com/Y105898564N"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (typeof window !== 'undefined' && (window as any).fbq) {
              (window as any).fbq('track', 'InitiateCheckout');
            }
            handleConversionClick();
          }}
          className="hidden md:inline-flex items-center justify-center bg-hero-accent text-white rounded-pill px-6 py-2.5 font-body text-xs font-semibold tracking-[0.04em] hover:bg-cta-dark transition-colors duration-300"
        >
          Quero Acessar
        </a>

        {/* Mobile: CTA + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="https://pay.hotmart.com/Y105898564N"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'InitiateCheckout');
              }
              handleConversionClick();
            }}
            className="inline-flex items-center justify-center bg-hero-accent text-white rounded-pill px-4 py-2 font-body text-[11px] font-semibold tracking-[0.04em]"
          >
            Quero Acessar
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-dark-ink"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {mobileOpen ? (
                <>
                  <path d="M4 4L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <path d="M3 6H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-parchment/[0.96] backdrop-blur-[16px] border-t border-blush/20 px-6 py-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="block w-full text-left py-3 font-body text-sm font-medium text-body-text hover:text-hero-accent transition-colors bg-transparent border-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
