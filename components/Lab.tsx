import { Bot, Fingerprint, Server, ShieldCheck, type LucideIcon } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { getSection } from '@/data/sections';
import Section from './Section';

const icons: LucideIcon[] = [Bot, ShieldCheck, Server, Fingerprint];

export default function Lab() {
  const section = getSection('lab');

  return (
    <Section
      id={section.id}
      index={section.index}
      label={section.label}
      title={section.title}
      lead="Ce que je fais en dehors du travail pour continuer à apprendre. Des sujets sur lesquels je débute, présentés tels qu’ils sont."
    >
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        {portfolioData.lab.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <article key={item.title} className="bg-bg p-6 sm:p-8">
              <Icon size={20} className="text-accent" aria-hidden="true" />
              <h3 className="mt-4 font-semibold text-fg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              <ul className="mt-4 space-y-1.5 font-mono text-xs text-muted">
                {item.items.map((entry) => (
                  <li key={entry} className="flex gap-2">
                    <span className="text-accent">›</span>
                    <span>{entry}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
