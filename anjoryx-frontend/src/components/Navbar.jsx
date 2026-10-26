import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Button from './Button';
import Logo from './Logo';
import { useTheme } from '../hooks/useTheme';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes (logo, CTA, back button…)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock page scroll while the menu is open; close on Escape
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-4'}`}
    >
      {/* z-[60] keeps the bar (and its close button) above the mobile overlay */}
      <div
        className={`container-x relative z-[60] flex items-center justify-between rounded-full py-2 pl-4 pr-2 transition-all duration-300 ${
          scrolled
            ? 'border border-border/80 bg-surface/80 shadow-card backdrop-blur-xl'
            : 'border border-transparent'
        }`}
      >
        <Link to="/" aria-label="ANJORYX Technologies home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-tint-sky text-accent'
                    : 'text-textMuted hover:bg-surfaceAlt hover:text-text'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-textMuted transition-colors hover:border-accent/50 hover:text-accent"
          >
            <ThemeIcon size={16} />
          </button>
          <Button to="/contact" className="!py-2.5">
            Start a project
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <nav
              className="container-x flex min-h-full flex-col justify-center gap-1 pb-12 pt-28"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `block border-b border-border py-4 font-display text-2xl ${
                        isActive ? 'text-accent' : 'text-text'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="mt-8 flex items-center gap-3">
                <Button to="/contact">Start a project</Button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-textMuted"
                  aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                >
                  <ThemeIcon size={18} />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
