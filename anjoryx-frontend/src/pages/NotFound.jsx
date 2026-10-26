import SEO from '../components/SEO';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found" description="The page you're looking for doesn't exist." noIndex />
      <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pb-16 pt-32 text-center">
        <p className="font-display text-8xl font-bold tracking-tight text-accent">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-text">Page not found</h1>
        <p className="mt-3 max-w-md text-textMuted">
          The page you're looking for may have been moved or no longer exists.
        </p>
        <Button to="/" className="mt-8">
          Back to home
        </Button>
      </section>
    </>
  );
}
