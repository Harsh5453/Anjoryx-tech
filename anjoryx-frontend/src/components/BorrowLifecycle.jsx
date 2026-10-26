import { motion, useReducedMotion } from 'framer-motion';

// The ShareUp borrow/return lifecycle, taken from the real case-study copy.
const STATES = ['Listed', 'Requested', 'Borrowed', 'Returned'];

/** Small animated state-machine strip: the active step walks through the cycle. */
export default function BorrowLifecycle({ className = '' }) {
  const reduce = useReducedMotion();
  return (
    <div className={`rounded-2xl bg-surface/80 p-5 shadow-card backdrop-blur ${className}`}>
      <ol className="flex items-center justify-between gap-2">
        {STATES.map((state, i) => (
          <li key={state} className="flex flex-1 items-center gap-2 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <motion.span
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-accent/30 bg-surface text-xs font-bold text-accent"
                animate={
                  reduce
                    ? undefined
                    : {
                        backgroundColor: ['rgb(255 255 255)', 'rgb(37 99 235)', 'rgb(255 255 255)'],
                        color: ['rgb(37 99 235)', 'rgb(255 255 255)', 'rgb(37 99 235)'],
                      }
                }
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  repeatDelay: STATES.length * 0.8 - 1.6,
                  delay: i * 0.8,
                  ease: 'easeInOut',
                }}
              >
                {i + 1}
              </motion.span>
              <span className="text-xs font-semibold text-text">{state}</span>
            </div>
            {i < STATES.length - 1 && (
              <span className="mb-6 h-0.5 flex-1 rounded-full bg-accent/25" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
