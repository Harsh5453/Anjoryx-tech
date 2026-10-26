import { technologyCategories } from '../data/technologies';

// Flatten the real technology list from the data file, de-duplicated.
const ALL = [...new Set(technologyCategories.flatMap((c) => c.items))];
const ROW_A = ALL.filter((_, i) => i % 2 === 0);
const ROW_B = ALL.filter((_, i) => i % 2 === 1);

function Row({ items, className }) {
  // Duplicated once so the -50% keyframe loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul className={`flex shrink-0 items-center gap-3 pr-3 ${className}`}>
        {loop.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= items.length ? 'true' : undefined}
            className="chip whitespace-nowrap shadow-card"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Slow, pausable ticker of the real stack — sits right under the hero. */
export default function TechMarquee() {
  return (
    <section aria-label="Technologies we work with" className="py-6">
      <div className="space-y-3 [&:hover_ul]:[animation-play-state:paused]">
        <Row items={ROW_A} className="animate-marquee" />
        <Row items={ROW_B} className="animate-marquee-slow [animation-direction:reverse]" />
      </div>
    </section>
  );
}
