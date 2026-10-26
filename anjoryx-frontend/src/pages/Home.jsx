import SEO from '../components/SEO';
import Hero from '../sections/Hero';
import TechMarquee from '../sections/TechMarquee';
import Values from '../sections/Values';
import Services from '../sections/Services';
import Technology from '../sections/Technology';
import HowWeWork from '../sections/HowWeWork';
import ProjectsPreview from '../sections/ProjectsPreview';
import PricingPreview from '../sections/PricingPreview';
import CtaSection from '../sections/CtaSection';

export default function Home() {
  return (
    <>
      <SEO path="/" />
      <Hero />
      <TechMarquee />
      <Values />
      <Services />
      <Technology />
      <HowWeWork />
      <ProjectsPreview />
      <PricingPreview />
      <CtaSection />
    </>
  );
}
