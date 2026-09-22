import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-lg border border-line-strong bg-surface font-mono text-sm">
        <div className="border-b border-line bg-surface-2 px-4 py-2.5 text-xs text-faint">fish — sean@portfolio</div>
        <div className="space-y-2 p-5">
          <p>
            <span className="text-accent">sean</span>
            <span className="text-faint">@</span>portfolio <span className="text-faint">~&gt;</span> cd ./cette-page
          </p>
          <p className="text-danger">cd: le dossier n’existe pas (erreur 404)</p>
          <p className="text-muted">La page demandée a peut-être été déplacée ou supprimée.</p>
          <p className="pt-3">
            <Link href="/" className="text-accent underline underline-offset-4 hover:no-underline">
              cd ~ (retour à l’accueil)
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
