import { ExternalLink, Github } from 'lucide-react';
import Button from './Button';
import Reveal from './Reveal';
import BorrowLifecycle from './BorrowLifecycle';

export default function ProjectCard({ project }) {
  return (
    <Reveal className="grid overflow-hidden rounded-[2rem] border border-border/80 bg-surface shadow-card lg:grid-cols-2">
      <div className="p-8 sm:p-10">
        <p className="text-sm font-semibold text-accent">{project.tagline}</p>
        <h3 className="mt-2 font-display text-3xl font-semibold text-text">{project.name}</h3>
        <p className="mt-4 text-base leading-relaxed text-textMuted">{project.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.technology.slice(0, 6).map((tech) => (
            <li key={tech} className="chip bg-surfaceAlt/60 !py-1 text-xs text-textMuted">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Button to={`/projects/${project.slug}`} arrow className="!py-2.5">
            View case study
          </Button>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            Live demo <ExternalLink size={14} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-textMuted hover:text-accent"
          >
            GitHub <Github size={14} />
          </a>
        </div>
      </div>

      <div className="relative flex items-center bg-gradient-to-br from-tint-sky via-tint-mint to-tint-peach p-8 sm:p-10">
        <div className="w-full">
          <p className="mb-3 text-sm font-semibold text-text">How a borrow request moves</p>
          <BorrowLifecycle />
        </div>
      </div>
    </Reveal>
  );
}
