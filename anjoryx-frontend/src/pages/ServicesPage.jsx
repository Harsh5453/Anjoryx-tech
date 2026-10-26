import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import CtaSection from '../sections/CtaSection';
import { services, serviceTints } from '../data/services';

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Services"
        path="/services"
        description="Web development, custom software, backend APIs, full-stack builds, cloud deployment, AI automation and MVP development from ANJORYX Technologies."
      />
      <PageHeader
        title="Services built around real business needs."
        description="From a single landing page to a full-stack platform — each engagement starts with understanding the problem, not pushing a template."
      />

      <section className="pb-8">
        <div className="container-x grid grid-cols-1 gap-5 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} delay={(i % 2) * 0.06}>
                <article
                  id={service.slug}
                  className={`scroll-mt-28 rounded-[1.8rem] p-7 transition-shadow target:ring-2 target:ring-accent sm:p-8 ${
                    serviceTints[i % serviceTints.length]
                  }`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-accent shadow-card">
                    <Icon size={22} />
                  </span>
                  <h2 className="mt-6 font-display text-2xl font-semibold text-text">{service.title}</h2>
                  <p className="mt-3 text-base leading-relaxed text-textMuted">{service.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.stack.map((item) => (
                      <li key={item} className="chip !py-1 text-xs">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex text-sm font-semibold text-accent hover:underline"
                  >
                    Discuss this service
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
