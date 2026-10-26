import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import ProjectCard from '../components/ProjectCard';
import { projects, upcomingProjectsNote } from '../data/projects';

export default function ProjectsPage() {
  return (
    <>
      <SEO
        title="Projects"
        path="/projects"
        description="Real projects built by ANJORYX Technologies — full-stack platforms with React, Spring Boot and modern cloud tooling."
      />
      <PageHeader
        title="Real projects, real code."
        description="No inflated metrics — just what we've actually built, and how it works under the hood."
      />
      <section className="pb-24">
        <div className="container-x space-y-6">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
          <div className="rounded-3xl border border-dashed border-border bg-surface/50 p-6 text-center text-sm text-textMuted">
            {upcomingProjectsNote}
          </div>
        </div>
      </section>
    </>
  );
}
