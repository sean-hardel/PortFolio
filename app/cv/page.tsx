import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { CV_PDF_PATH, withBase } from '@/lib/paths';

export const metadata: Metadata = {
  title: 'CV · Sean Hardel',
  description: 'CV de Sean Hardel, développeur full stack.',
};

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 border-b border-neutral-300 pb-1 font-mono text-[9.5px] font-medium uppercase text-[#13703f]">
      {children}
    </h2>
  );
}

export default function CV() {
  const { personal, experience, projects, stack, education, interests, lab } = portfolioData;
  const site = personal.social.site.replace(/^https:\/\//, '').replace(/\/$/, '');

  const contacts = [
    { label: personal.email, href: `mailto:${personal.email}` },
    { label: site, href: personal.social.site },
    { label: `github.com/${personal.handle}`, href: personal.social.github },
    { label: 'linkedin.com/in/sean-hardel', href: personal.social.linkedin },
  ];

  return (
    <div className="min-h-screen bg-neutral-200 py-10 print:bg-white print:py-0">
      <div className="mx-auto mb-6 flex w-[210mm] max-w-full items-center justify-between px-4 font-mono text-xs print:hidden">
        <Link href="/" className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900">
          <ArrowLeft size={14} aria-hidden="true" /> retour au site
        </Link>
        <a
          href={withBase(CV_PDF_PATH)}
          download
          className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-3 py-2 text-white hover:bg-neutral-700"
        >
          <Download size={14} aria-hidden="true" /> télécharger le PDF
        </a>
      </div>

      <main
        id="cv"
        className="mx-auto box-border min-h-[297mm] w-[210mm] max-w-full bg-white px-[14mm] py-[12mm] text-[10.5px] leading-snug text-neutral-800 shadow-xl print:shadow-none"
      >
        <header className="border-b border-neutral-900 pb-4">
          <h1 className="text-[26px] font-semibold tracking-tight text-neutral-950">{personal.name}</h1>
          <p className="mt-0.5 text-[13px] font-medium text-[#13703f]">{personal.role}</p>
          <p className="mt-2 max-w-[150mm] text-neutral-600">{personal.bio}</p>
          <ul className="mt-2 flex flex-wrap gap-x-4 font-mono text-[9px] text-neutral-600">
            {contacts.map((contact) => (
              <li key={contact.href}>
                <a href={contact.href} className="inline-block py-1.5 hover:text-neutral-950 print:py-0">
                  {contact.label}
                </a>
              </li>
            ))}
            <li className="py-1.5 print:py-0">{personal.location}</li>
          </ul>
        </header>

        <div className="mt-5 grid grid-cols-[1fr_52mm] gap-[8mm]">
          <div className="space-y-5">
            <section>
              <Heading>Expérience</Heading>
              <div className="space-y-3.5">
                {experience.map((job) => (
                  <article key={job.company}>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-semibold text-neutral-950">
                        {job.title} · {job.company}
                      </h3>
                      <p className="shrink-0 font-mono text-[9px] text-neutral-500">
                        {job.period} · {job.location}
                      </p>
                    </div>
                    <p className="text-[9.5px] text-neutral-500">{job.contract}</p>
                    <p className="mt-1">{job.summary}</p>
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-neutral-700 marker:text-neutral-400">
                      {job.tasks.map((task) => (
                        <li key={task}>{task}</li>
                      ))}
                    </ul>
                    <p className="mt-1 font-mono text-[8.5px] text-neutral-500">{job.stack.join(' · ')}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <Heading>Projets</Heading>
              <div className="space-y-2.5">
                {projects
                  .filter((project) => !project.archived && project.tag !== 'perso')
                  .map((project) => (
                    <article key={project.title}>
                      <h3 className="font-semibold text-neutral-950">
                        {project.title} <span className="font-normal text-neutral-500">· {project.context}</span>
                      </h3>
                      <p className="mt-0.5 text-neutral-700">{project.description}</p>
                      <p className="mt-0.5 font-mono text-[8.5px] text-neutral-500">
                        {project.stack.join(' · ')}
                        {project.link && <> · {project.link.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</>}
                      </p>
                    </article>
                  ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <section>
              <Heading>Compétences</Heading>
              <div className="space-y-2">
                {stack.map((group) => (
                  <div key={group.label}>
                    <h3 className="font-medium text-neutral-950">{group.label}</h3>
                    <p className="text-neutral-700">{group.items.join(', ')}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Heading>Formation</Heading>
              <div className="space-y-2">
                {education.map((item) => (
                  <div key={item.degree}>
                    <h3 className="font-medium text-neutral-950">{item.degree}</h3>
                    <p className="text-neutral-700">{item.school}</p>
                    <p className="font-mono text-[9px] text-neutral-500">{item.year}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Heading>En ce moment</Heading>
              <ul className="space-y-1 text-neutral-700">
                {lab.slice(0, 3).map((item) => (
                  <li key={item.title}>
                    <span className="font-medium text-neutral-950">{item.title}</span> — {item.items[0]}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <Heading>Langues</Heading>
              <p className="text-neutral-700">{personal.languages.join(' · ')}</p>
            </section>

            <section>
              <Heading>Centres d’intérêt</Heading>
              <p className="text-neutral-700">{interests.join(' · ')}</p>
            </section>
          </aside>
        </div>
      </main>

      <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          html, body { background: #fff !important; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}
