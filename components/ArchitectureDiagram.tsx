const before = ['Fichiers Excel', 'TEMPO / Armado', 'Documents sur le serveur'];

const after = [
  { name: 'Application Vue 3', detail: 'hébergée sur Netlify, déployée depuis GitHub' },
  { name: 'Supabase · PostgreSQL', detail: 'intérimaires, entreprises, contrats' },
  { name: 'Génération de documents', detail: 'modèles docx / pdf remplis automatiquement' },
  { name: 'Script Python', detail: 'envoi des e-mails via Outlook' },
];

function Node({ name, detail, muted = false }: { name: string; detail?: string; muted?: boolean }) {
  return (
    <div
      className={`rounded-md border px-3 py-2 font-mono text-xs ${
        muted ? 'border-dashed border-line-strong text-muted' : 'border-line-strong bg-surface text-fg'
      }`}
    >
      <p>{name}</p>
      {detail && <p className="mt-0.5 text-[11px] text-faint">{detail}</p>}
    </div>
  );
}

export default function ArchitectureDiagram() {
  return (
    <figure className="rounded-lg border border-line bg-bg p-4 sm:p-6">
      <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1.4fr]">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">avant</p>
          <div className="space-y-2">
            {before.map((item) => (
              <Node key={item} name={item} muted />
            ))}
          </div>
          <p className="mt-2 font-mono text-[11px] text-danger">doubles saisies · erreurs · rien de centralisé</p>
        </div>

        <div aria-hidden="true" className="flex justify-center font-mono text-accent">
          <span className="md:hidden">↓</span>
          <span className="hidden md:inline">→</span>
        </div>

        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">après</p>
          <div className="space-y-2 border-l border-accent/40 pl-3">
            {after.map((item) => (
              <Node key={item.name} {...item} />
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-4 font-mono text-[11px] text-faint">
        Schéma simplifié · aucune donnée de l’agence n’est présentée
      </figcaption>
    </figure>
  );
}
