import Reveal from './Reveal';

export default function SectionHeading({ title, description, align = 'left', className = '' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';
  return (
    <Reveal className={`mb-12 max-w-2xl ${alignment} ${className}`}>
      <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-text sm:text-4xl lg:text-[2.6rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-textMuted sm:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
