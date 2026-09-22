import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { getSection } from '@/data/sections';
import CopyButton from './CopyButton';
import Section from './Section';

export default function Contact() {
  const { personal, interests } = portfolioData;
  const section = getSection('contact');

  const links = [
    { label: 'LinkedIn', value: 'sean-hardel', href: personal.social.linkedin },
    { label: 'GitHub', value: personal.handle, href: personal.social.github },
  ];

  const facts = [
    { label: 'Localisation', value: personal.location },
    { label: 'Langues', value: personal.languages.join(' · ') },
    { label: 'Centres d’intérêt', value: interests.join('\u00a0· ') },
  ];

  return (
    <Section
      id={section.id}
      index={section.index}
      label={section.label}
      title="Un poste, un projet, une question ?"
      lead="Je suis ouvert aux opportunités, en France ou ailleurs selon le poste. Le plus simple reste l’e-mail."
    >
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="break-all text-xl font-medium text-fg underline decoration-line-strong underline-offset-8 transition-colors hover:text-accent hover:decoration-accent sm:text-2xl"
            >
              {personal.email}
            </a>
            <CopyButton value={personal.email} label="Copier l’adresse e-mail" />
          </div>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between py-4 transition-colors hover:text-accent"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">{link.label}</span>
                  <span className="flex items-center gap-1 text-fg group-hover:text-accent">
                    {link.value}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <dl className="space-y-5">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-faint">{fact.label}</dt>
              <dd className="mt-1 text-muted">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
