import { motion, useReducedMotion } from 'framer-motion';

/**
 * Gentle one-time entrance used on section headings and grouped content —
 * deliberately NOT applied to every card, so motion stays purposeful.
 * Renders statically when the visitor prefers reduced motion.
 */
export default function Reveal({ children, delay = 0, y = 18, className = '', as = 'div' }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
