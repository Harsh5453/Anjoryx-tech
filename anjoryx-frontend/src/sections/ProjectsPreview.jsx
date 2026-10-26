import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import { projects, upcomingProjectsNote } from '../data/projects';

export default function ProjectsPreview() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          title="Real projects, real code."
          description="No inflated metrics — just what we've actually built, and how it works under the hood."
        />
        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
          <div className="rounded-3xl border border-dashed border-border bg-surface/50 p-6 text-center text-sm text-textMuted">
            {upcomingProjectsNote}
          </div>
        </div>
      </div>
    </section>
  );
}
