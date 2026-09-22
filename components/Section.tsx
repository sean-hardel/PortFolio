import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  index?: string;
  label?: string;
  title?: string;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, index, label, title, lead, children, className = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={title ? `${id}-title` : undefined} className={`px-4 py-20 sm:px-6 md:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl">
        {title && (
          <header className="mb-12 md:mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
              {index && <span className="text-accent">{index}</span>}
              {index && <span className="mx-2">/</span>}
              {label ?? id}
            </p>
            <h2 id={`${id}-title`} className="mt-3 text-3xl font-semibold tracking-tight text-fg md:text-4xl">
              {title}
            </h2>
            {lead && <p className="mt-4 max-w-2xl text-muted">{lead}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
