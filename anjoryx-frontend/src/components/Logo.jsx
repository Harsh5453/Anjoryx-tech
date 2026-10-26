import { useId } from 'react';

/** ANJORYX mark: an "A" chevron with a coral crossbar. Pure SVG, theme-safe. */
export function LogoMark({ size = 36 }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2663EB" />
          <stop offset="1" stopColor="#08A6C4" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id})`} />
      <path d="M18 46 32 17l14 29" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 38h16" stroke="#FF7A59" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ showName = true, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      {showName && (
        <span className="font-display text-xl font-bold tracking-tight text-text">ANJORYX</span>
      )}
    </span>
  );
}
