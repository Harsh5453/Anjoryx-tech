import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import PriceCard from '../components/PriceCard';
import Reveal from '../components/Reveal';
import CtaSection from '../sections/CtaSection';
import { pricingTiers, pricingDisclaimer } from '../data/pricing';

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Pricing"
        path="/pricing"
        description="Transparent starting prices for websites, web applications, MVPs and AI automation from ANJORYX Technologies."
      />
      <PageHeader title="Transparent starting points." description={pricingDisclaimer} />

      <section className="pb-8 pt-4">
        <div className="container-x grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={(i % 3) * 0.06} className="h-full">
              <PriceCard tier={tier} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
