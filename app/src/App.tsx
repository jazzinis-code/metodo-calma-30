import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import MouseFollower from '@/components/MouseFollower';
import HeroSection from '@/sections/HeroSection';
import PainSection from '@/sections/PainSection';
import SolutionSection from '@/sections/SolutionSection';
import CalmaMethodSection from '@/sections/CalmaMethodSection';
import InsideEbookSection from '@/sections/InsideEbookSection';
import ProductShowcaseSection from '@/sections/ProductShowcaseSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import ProofStripSection from '@/sections/ProofStripSection';
import OfferSection from '@/sections/OfferSection';
import FAQSection from '@/sections/FAQSection';
import FinalCTASection from '@/sections/FinalCTASection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
    };
  }, []);

  return (
    <div className="relative">
      <MouseFollower />
      <NavigationBar />
      <main>
        <HeroSection />
        <PainSection />
        <SolutionSection />
        <CalmaMethodSection />
        <InsideEbookSection />
        <ProductShowcaseSection />
        <TestimonialsSection />
        <ProofStripSection />
        <OfferSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
