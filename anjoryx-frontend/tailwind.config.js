/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic, theme-aware tokens (values live in src/index.css so light
        // and dark mode can remap them without touching component code).
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        surfaceAlt: 'rgb(var(--surface-alt) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        text: 'rgb(var(--text) / <alpha-value>)',
        textMuted: 'rgb(var(--text-muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accentAlt: 'rgb(var(--accent-alt) / <alpha-value>)',
        coral: 'rgb(var(--coral) / <alpha-value>)',
        onAccent: 'rgb(var(--on-accent) / <alpha-value>)',
        tint: {
          sky: 'rgb(var(--tint-sky) / <alpha-value>)',
          mint: 'rgb(var(--tint-mint) / <alpha-value>)',
          peach: 'rgb(var(--tint-peach) / <alpha-value>)',
          lilac: 'rgb(var(--tint-lilac) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', '"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(15 31 61 / 0.04), 0 14px 34px -18px rgb(15 31 61 / 0.22)',
        lift: '0 2px 4px rgb(15 31 61 / 0.04), 0 24px 48px -20px rgb(var(--accent) / 0.35)',
        glow: '0 10px 30px -10px rgb(var(--accent) / 0.55)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(24px,-18px,0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'marquee-slow': 'marquee 52s linear infinite',
        drift: 'drift 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
