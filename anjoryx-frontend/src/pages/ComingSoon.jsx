import { Hammer } from 'lucide-react';
import SEO from '../components/SEO';
import Button from '../components/Button';

/**
 * Placeholder for pages that are still being written (Solutions, About, FAQ,
 * legal pages). Honest about status rather than inventing content.
 */
export default function ComingSoon({ title = 'Coming soon' }) {
  return (
    <>
      <SEO title={title} description={`${title} — ANJORYX Technologies.`} noIndex />
      <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pb-16 pt-32 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-tint-sky text-accent">
          <Hammer size={26} />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold text-text sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-md text-textMuted">
          This page is still being written. In the meantime, you can tell us about your project
          and we'll reply directly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/contact">Contact us</Button>
          <Button to="/" variant="secondary">
            Back to home
          </Button>
        </div>
      </section>
    </>
  );
}
