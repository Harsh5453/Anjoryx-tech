import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';

const STEPS = [
  { title: 'Discover', description: 'Understand the business, problem and requirements.' },
  { title: 'Plan', description: 'Define the architecture, scope and roadmap.' },
  { title: 'Build', description: 'Develop the product using modern technology.' },
  { title: 'Test & refine', description: 'Validate functionality, performance and user experience.' },
  { title: 'Launch & support', description: 'Deploy and provide ongoing improvements.' },
];

/**
 * The process really is a sequence, so numbering is meaningful here.
 * The connecting line draws itself as the section scrolls into view.
 */
export default function HowWeWork() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading title="A clear, five-step process." align="center" />

        <div ref={ref} className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {/* track + progress (desktop) */}
          <div className="absolute left-6 right-6 top-6 hidden h-1 rounded-full bg-border/70 lg:block" aria-hidden="true" />
          <motion.div
            className="absolute left-6 right-6 top-6 hidden h-1 origin-left rounded-full bg-gradient-to-r from-accent to-accentAlt lg:block"
            style={{ scaleX: reduce ? 1 : progress }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-bg bg-accent font-display text-base font-semibold text-onAccent shadow-glow">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-textMuted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
