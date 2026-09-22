import { portfolioData } from '@/data/portfolio';
import { getSection } from '@/data/sections';
import Section from './Section';

export default function Stack() {
  const section = getSection('stack');

  return (
    <Section
      id={section.id}
      index={section.index}
      label={section.label}
      title={section.title}
      lead="Les outils que j’ai utilisés en entreprise, en formation ou sur mes projets."
    >
      <dl className="divide-y divide-line border-y border-line">
        {portfolioData.stack.map((group) => (
          <div key={group.label} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-faint sm:pt-0.5">{group.label}</dt>
            <dd>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-fg">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
