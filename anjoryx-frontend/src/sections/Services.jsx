import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { services, serviceTints } from '../data/services';

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          title="Services built around real business needs."
          description="From a single landing page to a full-stack platform — each engagement starts with understanding the problem, not pushing a template."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            const tint = serviceTints[i % serviceTints.length];
            return (
              <Reveal key={service.slug} delay={(i % 4) * 0.05}>
                <Link
                  to={`/services#${service.slug}`}
                  className={`group relative flex h-full min-h-[220px] flex-col rounded-[1.6rem] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift ${tint}`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-accent shadow-card">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-text">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-textMuted">{service.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Learn more
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
