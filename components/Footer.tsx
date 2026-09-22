import { portfolioData } from '@/data/portfolio';

const repo = 'https://github.com/sean-hardel/PortFolio';

export default function Footer() {
  const sha = process.env.COMMIT_SHA ?? 'local';
  const date = process.env.BUILD_DATE ?? '';

  return (
    <footer className="border-t border-line px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 font-mono text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {portfolioData.personal.name}
        </p>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>
            build{' '}
            {sha === 'local' ? (
              <span className="text-muted">local</span>
            ) : (
              <a href={`${repo}/commit/${sha}`} className="text-muted underline-offset-4 hover:text-accent hover:underline">
                {sha}
              </a>
            )}
            {date && <> · {date}</>}
          </span>
          <span aria-hidden="true">·</span>
          <a href={repo} className="underline-offset-4 hover:text-accent hover:underline">
            code source
          </a>
        </p>
      </div>
    </footer>
  );
}
