import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import { pricingTiers, pricingDisclaimer } from '../data/pricing';
import PriceCard from '../components/PriceCard';

export default function PricingPreview() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading title="Transparent starting points." description={pricingDisclaimer} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-stretch">
          {pricingTiers.slice(0, 3).map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.07} className="h-full">
              <PriceCard tier={tier} max={5} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button to="/pricing" variant="secondary">
            Compare all plans
          </Button>
          <Button to="/contact" arrow>
            Request a custom quote
          </Button>
        </div>
      </div>
    </section>
  );
}
