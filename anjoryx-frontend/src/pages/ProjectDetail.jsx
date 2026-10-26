import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import SEO from '../components/SEO';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import BorrowLifecycle from '../components/BorrowLifecycle';
import NotFound from './NotFound';
import { projects } from '../data/projects';

const BLOCKS = [
  { key: 'problem', title: 'The problem', tint: 'bg-tint-peach' },
  { key: 'solution', title: 'The solution', tint: 'bg-tint-sky' },
  { key: 'challenges', title: 'Challenges', tint: 'bg-tint-lilac' },
  { key: 'outcome', title: 'Outcome', tint: 'bg-tint-mint' },
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <NotFound />;

  return (
    <>
      <SEO
        title={`${project.name} case study`}
        path={`/projects/${project.slug}`}
        description={project.description}
      />

      <header className="container-x pb-10 pt-32 sm:pt-40">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-textMuted hover:text-accent"
        >
          <ArrowLeft size={15} /> All projects
        </Link>
        <Reveal y={14} className="mt-6 max-w-3xl">
          <p className="text-sm font-semibold text-accent">{project.tagline}</p>
          <h1 className="headline-ink mt-2 font-display text-4xl font-semibold text-text sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-textMuted sm:text-lg">{project.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.technology.map((t) => (
              <li key={t} className="chip text-xs">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={project.liveUrl}>
              Live demo <ExternalLink size={15} />
            </Button>
            <Button href={project.githubUrl} variant="secondary">
              GitHub <Github size={15} />
            </Button>
          </div>
        </Reveal>
      </header>

      <section className="container-x pb-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-tint-sky via-tint-mint to-tint-peach p-6 sm:p-10">
          <BorrowLifecycle className="mx-auto max-w-2xl" />
        </div>
      </section>

      <section className="container-x pb-24 pt-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.key} delay={(i % 2) * 0.06}>
              <div className={`h-full rounded-[1.8rem] p-7 sm:p-8 ${b.tint}`}>
                <h2 className="font-display text-xl font-semibold text-text">{b.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-textMuted">{project[b.key]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
