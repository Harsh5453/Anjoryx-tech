import { Check } from 'lucide-react';
import Button from './Button';

/** Shared pricing card used on the home preview and the full pricing page. */
export default function PriceCard({ tier, max = 99, cta = 'Get a quote' }) {
  const featured = Boolean(tier.highlighted);
  return (
    <div
      className={`relative flex h-full flex-col rounded-[1.8rem] border p-7 transition-shadow ${
        featured
          ? 'border-accent/40 bg-surface shadow-lift'
          : 'border-border/80 bg-surface shadow-card hover:shadow-lift'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-7 rounded-full bg-coral px-3 py-1 text-xs font-bold text-white shadow-card">
          Full-stack
        </span>
      )}
      <h3 className="font-display text-xl font-semibold text-text">{tier.name}</h3>
      <p className="mt-4 text-sm text-textMuted">Starting from</p>
      <p className="font-display text-4xl font-semibold tracking-tight text-text">{tier.startingFrom}</p>

      {tier.suitableFor && (
        <p className="mt-3 text-sm leading-relaxed text-textMuted">{tier.suitableFor.join(' · ')}</p>
      )}

      <ul className="mt-6 flex-1 space-y-3">
        {tier.includes.slice(0, max).map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-text">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tint-mint text-accent">
              <Check size={12} strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <Button
        to="/contact"
        variant={featured ? 'primary' : 'secondary'}
        className="mt-8 !py-2.5"
      >
        {cta}
      </Button>
    </div>
  );
}
