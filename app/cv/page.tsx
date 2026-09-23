import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CvDownload from '@/components/CvDownload';
import { portfolioData } from '@/data/portfolio';
import { CV_PDF_PATH, withBase } from '@/lib/paths';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'CV',
  description: 'CV de Sean Hardel, développeur full stack.',
  alternates: { canonical: `${SITE_URL}/cv/` },
};

// Mise en page mobile d'abord ; les variantes a4: reproduisent la feuille A4
// (grand écran et impression, donc aussi le PDF généré en CI).

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-neutral-300 pb-1 font-mono text-xs font-medium uppercase text-[#13703f] a4:mb-2 a4:text-[9.5px]">
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
    <div className="min-h-screen bg-white desk:bg-neutral-200 desk:py-10">
      <div className="sticky top-0 z-10 border-b border-neutral-200 bg-white/95 backdrop-blur print:hidden desk:static desk:mx-auto desk:mb-6 desk:w-[210mm] desk:border-0 desk:bg-transparent desk:backdrop-blur-none">
        <div className="flex items-start justify-between gap-4 px-4 py-3 font-mono text-xs desk:py-0">
          <Link href="/" className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap py-2 text-neutral-600 hover:text-neutral-900">
            <ArrowLeft size={14} aria-hidden="true" /> retour au site
          </Link>
          <CvDownload href={withBase(CV_PDF_PATH)} />
        </div>
      </div>

      <main
        id="cv"
        className="mx-auto w-full bg-white px-5 py-8 text-[15px] leading-relaxed text-neutral-800 a4:box-border a4:min-h-[297mm] a4:w-[210mm] a4:px-[14mm] a4:py-[12mm] a4:text-[10.5px] a4:leading-snug desk:shadow-xl"
      >
        <header className="border-b border-neutral-900 pb-5 a4:pb-4">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 a4:text-[26px]">{personal.name}</h1>
          <p className="mt-1 text-base font-medium text-[#13703f] a4:mt-0.5 a4:text-[13px]">{personal.role}</p>
          <p className="mt-3 text-neutral-600 a4:mt-2 a4:max-w-[150mm]">{personal.bio}</p>
          <ul className="mt-4 flex flex-col font-mono text-[13px] text-neutral-600 a4:mt-2 a4:flex-row a4:flex-wrap a4:gap-x-4 a4:text-[9px]">
            {contacts.map((contact) => (
              <li key={contact.href}>
                <a href={contact.href} className="inline-block break-all py-1.5 hover:text-neutral-950 print:py-0">
                  {contact.label}
                </a>
              </li>
            ))}
            <li className="py-1.5 print:py-0">{personal.location}</li>
          </ul>
        </header>

        <div className="mt-8 grid gap-8 a4:mt-5 a4:grid-cols-[1fr_52mm] a4:gap-[8mm]">
          <div className="space-y-8 a4:space-y-5">
            <section>
              <Heading>Expérience</Heading>
              <div className="space-y-6 a4:space-y-3.5">
                {experience.map((job) => (
                  <article key={job.company}>
                    <div className="flex flex-col a4:flex-row a4:items-baseline a4:justify-between a4:gap-2">
                      <h3 className="font-semibold text-neutral-950">
                        {job.title} · {job.company}
                      </h3>
                      <p className="font-mono text-xs text-neutral-500 a4:shrink-0 a4:text-[9px]">
                        {job.period} · {job.location}
                      </p>
                    </div>
                    <p className="text-sm text-neutral-500 a4:text-[9.5px]">{job.contract}</p>
                    <p className="mt-2 a4:mt-1">{job.summary}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-neutral-700 marker:text-neutral-400 a4:mt-1 a4:space-y-0.5 a4:pl-4">
                      {job.tasks.map((task) => (
                        <li key={task}>{task}</li>
                      ))}
                    </ul>
                    <p className="mt-2 font-mono text-xs text-neutral-500 a4:mt-1 a4:text-[8.5px]">{job.stack.join(' · ')}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <Heading>Projets</Heading>
              <div className="space-y-5 a4:space-y-2.5">
                {projects
                  .filter((project) => !project.archived && project.tag !== 'perso')
                  .map((project) => (
                    <article key={project.title}>
                      <h3 className="font-semibold text-neutral-950">
                        {project.title} <span className="font-normal text-neutral-500">· {project.context}</span>
                      </h3>
                      <p className="mt-1 text-neutral-700 a4:mt-0.5">{project.description}</p>
                      <p className="mt-1 wrap-break-word font-mono text-xs text-neutral-500 a4:mt-0.5 a4:text-[8.5px]">
                        {project.stack.join(' · ')}
                        {project.link && <> · {project.link.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</>}
                      </p>
                    </article>
                  ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8 a4:space-y-5">
            <section>
              <Heading>Compétences</Heading>
              <div className="space-y-3 a4:space-y-2">
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
              <div className="space-y-3 a4:space-y-2">
                {education.map((item) => (
                  <div key={item.degree}>
                    <h3 className="font-medium text-neutral-950">{item.degree}</h3>
                    <p className="text-neutral-700">{item.school}</p>
                    <p className="font-mono text-xs text-neutral-500 a4:text-[9px]">{item.year}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Heading>En ce moment</Heading>
              <ul className="space-y-2 text-neutral-700 a4:space-y-1">
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
              <p className="text-neutral-700">{interests.join('\u00a0· ')}</p>
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
