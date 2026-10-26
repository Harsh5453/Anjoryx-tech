import { Target, Cpu, TrendingUp, Briefcase } from 'lucide-react';
import Reveal from '../components/Reveal';

const VALUES = [
  {
    icon: Target,
    title: 'Built for real problems',
    description: 'We focus on practical solutions rather than unnecessary complexity.',
    tint: 'bg-tint-sky',
  },
  {
    icon: Cpu,
    title: 'Modern technology',
    description: 'We use modern frameworks and scalable architecture.',
    tint: 'bg-tint-mint',
  },
  {
    icon: TrendingUp,
    title: 'Designed to scale',
    description: 'Solutions are designed with future growth in mind.',
    tint: 'bg-tint-lilac',
  },
  {
    icon: Briefcase,
    title: 'Business focused',
    description: 'Technology should create measurable value.',
    tint: 'bg-tint-peach',
  },
];

/** One continuous band instead of four separate cards. */
export default function Values() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container-x">
        <Reveal className="card-surface grid grid-cols-1 divide-y divide-border/80 overflow-hidden sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {VALUES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="p-7">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-accent ${item.tint}`}>
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-text">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-textMuted">{item.description}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
