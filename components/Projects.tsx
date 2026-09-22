import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';
import { portfolioData, type Project, type ProjectTag } from '@/data/portfolio';
import { getSection } from '@/data/sections';
import { withBase } from '@/lib/paths';
import Section from './Section';
import Tags from './Tags';

const tagLabels: Record<ProjectTag, string> = {
  client: 'client',
  pro: 'pro',
  formation: 'formation',
  perso: 'perso',
};

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-4 font-mono text-xs">
      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline underline-offset-4">
          voir le site <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only">de {project.title}</span>
        </a>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-fg">
          <Github size={14} aria-hidden="true" /> code source
          <span className="sr-only">de {project.title}</span>
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-strong">
      {project.image ? (
        <div className="aspect-video overflow-hidden border-b border-line bg-surface-2">
          <Image
            src={withBase(project.image)}
            alt={`Aperçu de ${project.title}`}
            width={1280}
            height={720}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div aria-hidden="true" className="flex aspect-video items-end border-b border-line bg-bg p-5 font-mono text-xs text-faint">
          <span>
            <span className="text-accent">~/</span>
            {project.title.toLowerCase().replace(/\s+/g, '-')}
            <span className="caret ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-accent" />
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-xs text-faint">
          <span className="text-accent">{tagLabels[project.tag]}</span> · {project.context}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-fg">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>

        {project.highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-sm text-muted">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-faint">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-5">
          <Tags items={project.stack} />
          <div className="mt-4">
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const section = getSection('projects');
  const current = portfolioData.projects.filter((project) => !project.archived);
  const archived = portfolioData.projects.filter((project) => project.archived);

  return (
    <Section id={section.id} index={section.index} label={section.label} title={section.title}>
      <div className="grid gap-6 md:grid-cols-2">
        {current.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {archived.length > 0 && (
        <details className="group mt-10 rounded-xl border border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-mono text-xs text-muted hover:text-fg [&::-webkit-details-marker]:hidden">
            <span>
              <span className="text-accent">archives/</span> projets plus anciens ({archived.length})
            </span>
            <span aria-hidden="true" className="transition-transform group-open:rotate-90">›</span>
          </summary>
          <ul className="divide-y divide-line border-t border-line">
            {archived.map((project) => (
              <li key={project.title} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-fg">
                    {project.title} <span className="font-mono text-xs text-faint">· {project.context}</span>
                  </p>
                  <p className="mt-1 text-sm text-muted">{project.description}</p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                  <Tags items={project.stack} />
                  <ProjectLinks project={project} />
                </div>
              </li>
            ))}
          </ul>
        </details>
      )}
    </Section>
  );
}
