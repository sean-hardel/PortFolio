import Link from 'next/link';
import { ArrowDown, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import Terminal from './Terminal';

export default function Hero() {
  const { personal, status } = portfolioData;

  const socials = [
    { label: 'GitHub', href: personal.social.github, icon: Github },
    { label: 'LinkedIn', href: personal.social.linkedin, icon: Linkedin },
    { label: 'E-mail', href: `mailto:${personal.email}`, icon: Mail },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-6 md:pt-36 md:pb-28">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
            {personal.role} · {personal.location}
          </p>

          <h1 id="hero-title" className="mt-4 text-5xl font-semibold tracking-tight text-fg sm:text-6xl">
            {personal.name}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{personal.tagline}</p>

          <p className="mt-6 inline-flex items-center gap-2.5 rounded-md border border-line bg-surface px-3 py-2 font-mono text-xs text-muted">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span>
              {status.current} chez <span className="text-fg">{status.company}</span>
              {status.open && <> · {status.label.toLowerCase()}</>}
            </span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              Voir mes projets
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <Link
              href={personal.social.cv}
              className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <FileText size={16} aria-hidden="true" />
              Mon CV
            </Link>
            <ul className="ml-1 flex items-center gap-1">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    title={label}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="grid h-10 w-10 place-items-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Terminal />
      </div>
    </section>
  );
}
