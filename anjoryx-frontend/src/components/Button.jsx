import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BASE =
  'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60';

const VARIANTS = {
  primary:
    'bg-accent text-onAccent shadow-glow hover:-translate-y-0.5 hover:shadow-lift disabled:hover:translate-y-0',
  secondary:
    'border border-border bg-surface text-text hover:border-accent/50 hover:text-accent',
  ghost: 'text-text hover:text-accent',
};

/**
 * Unified CTA button.
 *  - `to`   → internal router <Link>
 *  - `href` → external anchor (opens in a new tab)
 *  - neither → plain <button> (forms, toggles)
 * `arrow` adds a small trailing arrow for primary navigation CTAs.
 */
export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  arrow = false,
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
