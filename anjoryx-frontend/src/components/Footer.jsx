import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '../utils/config';

const NAV = [
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const LEGAL = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'FAQ', to: '/faq' },
];

const iconLink =
  'flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-textMuted transition-colors hover:border-accent/50 hover:text-accent';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border/80 bg-surface/60">
      <div className="container-x grid grid-cols-1 gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-textMuted">
            Engineering the Next Era. We design and build modern digital products, software
            systems and intelligent solutions.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email ANJORYX Technologies" className={iconLink}>
              <Mail size={16} />
            </a>
            {SOCIAL_LINKS.whatsapp && (
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={iconLink}>
                <MessageCircle size={16} />
              </a>
            )}
            {SOCIAL_LINKS.linkedin && (
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLink}>
                <Linkedin size={16} />
              </a>
            )}
            {SOCIAL_LINKS.github && (
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconLink}>
                <Github size={16} />
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="mb-4 font-display text-base font-semibold text-text">Explore</p>
          <ul className="space-y-3">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-textMuted transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-display text-base font-semibold text-text">Company</p>
          <ul className="space-y-3">
            {LEGAL.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-textMuted transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-6 block break-all text-sm font-medium text-accent hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <div className="border-t border-border/80 py-6">
        <div className="container-x flex flex-col justify-between gap-2 text-xs text-textMuted sm:flex-row">
          <span>© {new Date().getFullYear()} ANJORYX Technologies. All rights reserved.</span>
          <span>Built with React, Tailwind CSS and Spring Boot.</span>
        </div>
      </div>
    </footer>
  );
}
