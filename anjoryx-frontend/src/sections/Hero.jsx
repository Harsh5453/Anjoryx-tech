import { motion, useReducedMotion } from 'framer-motion';
import Button from '../components/Button';
import StackRoller from '../components/StackRoller';

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduce = useReducedMotion();

  // One orchestrated page-load moment: copy settles in, then the roller arrives.
  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section className="relative overflow-x-clip pb-12 pt-28 sm:pt-36 lg:pb-16">
      <div className="container-x relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div>
          <motion.h1
            {...rise(0)}
            className="headline-ink font-display text-[2.6rem] font-semibold leading-[1.02] text-text sm:text-6xl lg:text-[4.5rem]"
          >
            Engineering the Next Era.
          </motion.h1>
          <motion.p
            {...rise(0.1)}
            className="mt-6 max-w-xl text-base leading-relaxed text-textMuted sm:text-lg"
          >
            We design and build modern digital products, software systems and intelligent
            solutions that help businesses turn ideas into real-world technology.
          </motion.p>
          <motion.div {...rise(0.2)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button to="/contact" arrow>
              Start a project
            </Button>
            <Button to="/projects" variant="secondary">
              Explore our work
            </Button>
          </motion.div>
          <motion.p {...rise(0.3)} className="mt-8 max-w-md text-sm leading-relaxed text-textMuted">
            Full-stack delivery on React, Spring Boot, MySQL and MongoDB — from the first
            sketch to a deployed product.
          </motion.p>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
        >
          <StackRoller />
          <p className="mt-1 hidden text-center text-xs text-textMuted lg:block">
            Drag to roll the stack
          </p>
        </motion.div>
      </div>
    </section>
  );
}
