import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'anjoryx-theme';

function readStoredTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* storage can be blocked (private mode) — fall through to default */
  }
  return 'light';
}

function applyTheme(theme) {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#081121' : '#F4F9FD');
}

/**
 * Persists and applies the light/dark theme by toggling a class on <html>,
 * which drives the CSS custom properties in index.css. Light is the default.
 * The matching pre-paint script lives in index.html.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof window === 'undefined' ? 'light' : readStoredTheme()
  );

  useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}
