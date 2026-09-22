'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { sections } from '@/data/sections';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { personal, status } = portfolioData;

  // Met en évidence la section visible, comme un workspace actif
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const { id } of sections) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-4 px-4 font-mono text-xs sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-2 text-fg">
          <span className="text-accent">❯</span>
          <span>{personal.handle}</span>
          <span className="text-faint">~</span>
        </a>

        <nav aria-label="Navigation principale" className="hidden flex-1 justify-center md:flex">
          <ul className="flex items-center gap-1">
            {sections.map((section, i) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 transition-colors ${
                      isActive ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-surface-2 hover:text-fg'
                    }`}
                  >
                    <span className={isActive ? 'text-accent' : 'text-faint'}>{i + 1}</span>
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {status.open && (
            <span className="hidden items-center gap-2 text-muted lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {status.label.toLowerCase()}
            </span>
          )}
          <ThemeToggle />
          <Link
            href={personal.social.cv}
            className="hidden rounded-md border border-line-strong px-3 py-1.5 text-fg transition-colors hover:border-accent hover:text-accent sm:block"
          >
            cv
          </Link>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-md text-muted hover:bg-surface-2 hover:text-fg md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Navigation mobile" className="border-t border-line bg-bg px-4 pb-4 md:hidden">
          <ul className="flex flex-col py-2 font-mono text-sm">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-md px-2 py-3 text-muted hover:bg-surface-2 hover:text-fg"
                >
                  <span className="text-faint">{i + 1}</span>
                  {section.label}
                </a>
              </li>
            ))}
            <li>
              <Link href={personal.social.cv} className="flex items-center gap-3 rounded-md px-2 py-3 text-accent">
                <span className="text-faint">↗</span>
                cv
              </Link>
            </li>
          </ul>
          {status.open && (
            <p className="flex items-center gap-2 px-2 font-mono text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {status.label.toLowerCase()}
            </p>
          )}
        </nav>
      )}
    </header>
  );
}
