import Button from '../components/Button';
import Reveal from '../components/Reveal';

export default function CtaSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-accent via-[#2F7BF0] to-accentAlt px-8 py-16 text-center text-white shadow-lift sm:px-16 dark:text-bg">
          <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/15 blur-2xl animate-drift" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-coral/30 blur-3xl animate-drift [animation-delay:-6s]" aria-hidden="true" />
          <h2 className="relative font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Let's build what's next.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg dark:text-bg/80">
            Have an idea, project or technical challenge? Tell us about it and we'll help you
            figure out the right approach.
          </p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/contact" className="!bg-white !text-[#2663EB] !shadow-card hover:!shadow-lift">
              Start a project
            </Button>
            <Button to="/pricing" variant="ghost" className="!text-white hover:!text-white/80 dark:!text-bg">
              See pricing
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
