import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router does not restore scroll on navigation, so moving between pages
 * used to leave the visitor halfway down the next page. This scrolls to the
 * top on route change, and to the target element for in-page hash links
 * (e.g. /services#web-development).
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // wait a frame so the destination page has rendered
      const raf = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return undefined;
  }, [pathname, hash]);

  return null;
}
