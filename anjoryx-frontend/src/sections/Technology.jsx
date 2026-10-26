import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { technologyCategories } from '../data/technologies';

const ROW_TINTS = ['bg-tint-sky', 'bg-tint-mint', 'bg-tint-lilac', 'bg-tint-peach', 'bg-tint-sky'];

export default function Technology() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          title="The stack behind every build."
          description="We work with a focused, modern toolset rather than claiming expertise across every framework that exists."
        />

        <Reveal className="card-surface divide-y divide-border/80 overflow-hidden">
          {technologyCategories.map((cat, i) => (
            <div
              key={cat.category}
              className="grid grid-cols-1 gap-4 p-6 sm:p-7 md:grid-cols-[200px_1fr] md:items-center"
            >
              <h3 className="flex items-center gap-3 font-display text-lg font-semibold text-text">
                <span className={`h-3 w-3 rounded-full ${ROW_TINTS[i % ROW_TINTS.length]} ring-2 ring-accent/40`} aria-hidden="true" />
                {cat.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li key={item} className="chip bg-surfaceAlt/60 text-textMuted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
