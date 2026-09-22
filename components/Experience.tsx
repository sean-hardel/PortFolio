import { portfolioData, type Experience as Job } from '@/data/portfolio';
import { getSection } from '@/data/sections';
import ArchitectureDiagram from './ArchitectureDiagram';
import Section from './Section';
import Tags from './Tags';

function JobHeader({ job }: { job: Job }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
      <h3 className="text-xl font-semibold text-fg">
        {job.title} <span className="text-muted">· {job.company}</span>
      </h3>
      <p className="font-mono text-xs text-faint">
        {job.contract} · {job.period} · {job.location}
      </p>
    </div>
  );
}

function CaseStudy({ job }: { job: Job }) {
  const study = job.caseStudy!;

  return (
    <article className="rounded-xl border border-line bg-surface p-5 sm:p-8">
      <JobHeader job={job} />
      <p className="mt-3 max-w-3xl text-muted">{job.summary}</p>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Le problème</h4>
          <p className="mt-3 text-sm leading-relaxed text-muted">{study.problem}</p>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">La démarche</h4>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
            {study.approach.map((step, i) => (
              <li key={step} className="flex gap-2">
                <span className="font-mono text-faint">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">La solution</h4>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
            {study.solution.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-faint">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <ArchitectureDiagram />
      </div>

      <Tags items={job.stack} className="mt-6" />
    </article>
  );
}

export default function Experience() {
  const { experience, education } = portfolioData;
  const section = getSection('experience');
  const [featured, ...others] = experience;

  return (
    <Section id={section.id} index={section.index} label={section.label} title={section.title}>
      {featured.caseStudy ? <CaseStudy job={featured} /> : null}

      <ol className="mt-6 divide-y divide-line border-y border-line">
        {others.map((job) => (
          <li key={job.company} className="py-6">
            <JobHeader job={job} />
            <p className="mt-2 text-sm text-muted">{job.summary}</p>
            <Tags items={job.stack} className="mt-3" />
          </li>
        ))}
      </ol>

      <div className="mt-14">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Formation</h3>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {education.map((item) => (
            <li key={item.degree} className="rounded-lg border border-line p-4">
              <p className="font-mono text-xs text-faint">{item.year}</p>
              <p className="mt-1 font-medium text-fg">{item.degree}</p>
              <p className="text-sm text-muted">{item.school}</p>
              <p className="mt-2 text-xs text-faint">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
