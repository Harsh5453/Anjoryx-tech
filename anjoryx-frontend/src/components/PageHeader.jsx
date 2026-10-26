import Reveal from './Reveal';

/** Shared top-of-page heading for inner pages. */
export default function PageHeader({ title, description, children }) {
  return (
    <header className="container-x pb-10 pt-32 sm:pt-40 sm:pb-14">
      <Reveal y={14} className="max-w-3xl">
        <h1 className="headline-ink font-display text-4xl font-semibold leading-[1.05] text-text sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-textMuted sm:text-lg">{description}</p>
        )}
        {children}
      </Reveal>
    </header>
  );
}
