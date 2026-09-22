import type { ReactNode } from 'react';
import { portfolioData } from '@/data/portfolio';

export interface CommandContext {
  clear: () => void;
  openCv: () => void;
  toggleTheme: () => void;
}

export type CommandResult = ReactNode | null;

interface Command {
  description?: string;
  run: (args: string[], context: CommandContext) => CommandResult;
}

const { personal, status, experience, projects, lab, stack } = portfolioData;

const accent = (text: ReactNode) => <span className="text-accent">{text}</span>;
const faint = (text: ReactNode) => <span className="text-faint">{text}</span>;
const link = (href: string, text: ReactNode) => (
  <a
    href={href}
    className="text-accent underline underline-offset-4 hover:no-underline"
    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
  >
    {text}
  </a>
);

function sectionLink(id: string) {
  return <p className="mt-1">{faint('→ ')}{link(`#${id}`, `voir la section ${id}`)}</p>;
}

export const commands: Record<string, Command> = {
  help: {
    description: 'liste des commandes',
    run: () => (
      <div>
        <p>Commandes disponibles :</p>
        <ul className="mt-1">
          {Object.entries(commands)
            .filter(([, command]) => command.description)
            .map(([name, command]) => (
              <li key={name} className="grid grid-cols-[7.5rem_1fr] gap-2">
                {accent(name)}
                {faint(command.description)}
              </li>
            ))}
        </ul>
        <p className="mt-1">{faint('Astuce : Tab pour compléter, ↑ ↓ pour l’historique.')}</p>
      </div>
    ),
  },

  whoami: {
    description: 'qui je suis',
    run: () => (
      <div>
        <p>
          {accent(personal.name)} — {personal.role.toLowerCase()}
        </p>
        <p className="text-muted">{personal.bio}</p>
      </div>
    ),
  },

  experience: {
    description: 'parcours pro',
    run: () => (
      <div>
        {experience.map((job) => (
          <p key={job.company}>
            {faint(job.period)} {accent(job.company)} {faint('·')} {job.contract.toLowerCase()}
          </p>
        ))}
        {sectionLink('experience')}
      </div>
    ),
  },

  projects: {
    description: 'projets',
    run: () => (
      <div>
        {projects
          .filter((project) => !project.archived)
          .map((project) => (
            <p key={project.title}>
              {accent(project.title)} {faint(`— ${project.context}`)}
            </p>
          ))}
        {sectionLink('projects')}
      </div>
    ),
  },

  stack: {
    description: 'technos utilisées',
    run: () => (
      <div>
        {stack.map((group) => (
          <p key={group.label} className="grid grid-cols-[7.5rem_1fr] gap-2">
            {accent(group.label.toLowerCase())}
            <span>{group.items.join(' · ')}</span>
          </p>
        ))}
      </div>
    ),
  },

  lab: {
    description: 'veille, cyber, self-hosting',
    run: () => (
      <div>
        {lab.map((item) => (
          <p key={item.title}>
            {accent(item.title)} {faint(`— ${item.items[0]}`)}
          </p>
        ))}
        {sectionLink('lab')}
      </div>
    ),
  },

  contact: {
    description: 'me joindre',
    run: () => (
      <div>
        <p className="grid grid-cols-[7.5rem_1fr] gap-2">{faint('email')}{link(`mailto:${personal.email}`, personal.email)}</p>
        <p className="grid grid-cols-[7.5rem_1fr] gap-2">{faint('linkedin')}{link(personal.social.linkedin, 'sean-hardel')}</p>
        <p className="grid grid-cols-[7.5rem_1fr] gap-2">{faint('github')}{link(personal.social.github, personal.handle)}</p>
      </div>
    ),
  },

  cv: {
    description: 'ouvrir le CV',
    run: (_, context) => {
      context.openCv();
      return <p>{faint('Ouverture du CV…')}</p>;
    },
  },

  neofetch: {
    description: 'infos système',
    run: () => (
      <div>
          <p>
            {accent('sean')}@{accent('portfolio')}
          </p>
          <p className="text-faint">-----------------</p>
          {[
            ['OS', 'CachyOS x86_64'],
            ['WM', 'Hyprland'],
            ['Shell', 'fish'],
            ['Éditeur', 'VS Code + Claude Code'],
            ['Poste', `${status.current} @ ${status.company}`],
            ['Statut', status.label.toLowerCase()],
          ].map(([key, value]) => (
            <p key={key}>
              {accent(key)}: {value}
            </p>
          ))}
      </div>
    ),
  },

  theme: {
    description: 'basculer clair / sombre',
    run: (_, context) => {
      context.toggleTheme();
      return <p>{faint('Thème mis à jour.')}</p>;
    },
  },

  clear: {
    description: 'effacer le terminal',
    run: (_, context) => {
      context.clear();
      return null;
    },
  },

  // Commandes cachées
  sudo: {
    run: (args) =>
      args.join(' ') === 'hire-me' ? (
        <div>
          <p>{faint('[sudo] mot de passe pour recruteur : ********')}</p>
          <p>
            {accent('✓')} Accès accordé. La suite se passe par {link(`mailto:${personal.email}`, 'e-mail')}.
          </p>
        </div>
      ) : (
        <p>recruteur n’est pas dans le fichier sudoers. Cet incident sera signalé.</p>
      ),
  },
  ls: {
    run: () => <p>experience/ projects/ lab/ stack/ contact/ {accent('cv.pdf')}</p>,
  },
  pwd: {
    run: () => <p>/home/sean/portfolio</p>,
  },
  echo: {
    run: (args) => <p>{args.join(' ')}</p>,
  },
  date: {
    run: () => <p>{new Date().toLocaleString('fr-FR')}</p>,
  },
  rm: {
    run: () => <p>rm: permission refusée. Bien essayé.</p>,
  },
  exit: {
    run: () => <p>Il n’y a pas d’échappatoire. Essaie {accent('contact')}.</p>,
  },
};

export function runCommand(input: string, context: CommandContext): CommandResult {
  const [name, ...args] = input.trim().split(/\s+/);
  if (!name) return null;
  const key = name.toLowerCase();
  const command = Object.hasOwn(commands, key) ? commands[key] : undefined;
  if (!command) {
    return (
      <p>
        fish: commande inconnue : {accent(name)}. Tape {accent('help')}.
      </p>
    );
  }
  return command.run(args, context);
}

export function complete(input: string): string[] {
  const value = input.trimStart().toLowerCase();
  if (!value || value.includes(' ')) return [];
  return Object.keys(commands)
    .filter((name) => commands[name].description && name.startsWith(value));
}
