export interface Social {
  github: string;
  linkedin: string;
  site: string;
  cv: string;
}

export interface Personal {
  name: string;
  handle: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  languages: string[];
  social: Social;
}

export interface Status {
  current: string;
  company: string;
  open: boolean;
  label: string;
}

export interface CaseStudy {
  problem: string;
  approach: string[];
  solution: string[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  contract: string;
  summary: string;
  tasks: string[];
  stack: string[];
  caseStudy?: CaseStudy;
}

export type ProjectTag = 'client' | 'pro' | 'formation' | 'perso';

export interface Project {
  title: string;
  tag: ProjectTag;
  context: string;
  description: string;
  highlights: string[];
  stack: string[];
  image: string | null;
  link: string | null;
  repo: string | null;
  archived: boolean;
}

export interface LabItem {
  title: string;
  description: string;
  items: string[];
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  description: string;
}

export interface Portfolio {
  personal: Personal;
  status: Status;
  experience: Experience[];
  projects: Project[];
  lab: LabItem[];
  stack: StackGroup[];
  education: Education[];
  interests: string[];
}

export const portfolioData: Portfolio = {
  personal: {
    name: 'Sean Hardel',
    handle: 'sean-hardel',
    role: 'Développeur full stack',
    tagline: 'Je construis des applications web utiles, et j’aime comprendre ce qui se passe sous le capot.',
    bio: 'Développeur full stack formé en BTS SIO puis en Licence Pro MIAW. Je remplace des process faits d’Excel et de doubles saisies par des outils web simples et maintenables. Linux au quotidien, curieux d’infra, de cybersécurité et d’IA, que je pratique à côté sans me prétendre expert.',
    location: 'Vienne (86) · mobile',
    email: 'sean.hardel.pro@tuta.com',
    languages: ['Français (natif)', 'Anglais (B1/B2)'],
    social: {
      github: 'https://github.com/sean-hardel',
      linkedin: 'https://www.linkedin.com/in/sean-hardel-2b4201355/',
      site: 'https://sean-hardel.github.io/PortFolio/',
      cv: '/cv',
    },
  },

  status: {
    current: 'Développeur full stack',
    company: 'Scope37',
    open: true,
    label: 'Ouvert aux opportunités',
  },

  experience: [
    {
      title: 'Développeur full stack',
      company: 'Scope37',
      location: 'Avoine (37)',
      period: '2026',
      contract: 'Stage puis CDD',
      summary: 'Conception d’une application interne de gestion des intérimaires, des entreprises clientes et des contrats pour une agence d’intérim.',
      tasks: [
        'Analyse de l’existant et recueil des besoins avec l’équipe',
        'Conception du schéma de base de données PostgreSQL (Supabase)',
        'Génération automatique des documents (contrats)',
        'Script Python d’envoi d’e-mails via Outlook, packagé en exécutable',
        'Exploration des données de l’ERP existant (HFSQL)',
      ],
      stack: ['Vue 3', 'Vite', 'Supabase', 'PostgreSQL', 'Netlify', 'GitHub', 'Python', 'docxtemplater', 'pdf-lib'],
      caseStudy: {
        problem: 'Les informations étaient réparties entre des fichiers Excel, des logiciels métier (TEMPO, Armado) et des documents sur le serveur : doubles saisies, erreurs et aucune vue centralisée.',
        approach: [
          'Première piste : une application Power Apps + SharePoint, pour qu’elle reste maintenable sans développeur après mon départ.',
          'En avançant, les limites de la plateforme sont apparues face aux besoins réels de l’agence.',
          'Décision prise avec l’agence : repartir sur une application full code, versionnée et hébergée simplement.',
        ],
        solution: [
          'Base PostgreSQL centralisée sur Supabase (intérimaires, entreprises, contrats)',
          'Front Vue 3 déployé sur Netlify, code versionné sur GitHub',
          'Génération des contrats et documents à partir de modèles (docxtemplater, pdf-lib)',
          'Automatisation des envois d’e-mails Outlook avec un script Python',
        ],
      },
    },
    {
      title: 'Développeur (stage)',
      company: 'Altrad Endel',
      location: 'Avoine (37)',
      period: '2025',
      contract: 'Stage BTS SIO',
      summary: 'Développement d’applications web internes dans un contexte industriel.',
      tasks: [
        'Développement de fonctionnalités web',
        'Mise en place d’imports de données',
        'Requêtes et gestion de bases SQL Server',
      ],
      stack: ['C#', 'Kendo UI', 'JavaScript', 'PHP', 'SQL Server', 'Git'],
    },
    {
      title: 'Développeur (stage)',
      company: 'Nexti Informatique',
      location: 'Thouars (79)',
      period: '2024',
      contract: 'Stage BTS SIO',
      summary: 'Développement d’applications bureau et web.',
      tasks: [
        'Applications bureau et web',
        'Création de sites web',
        'Gestion de bases de données',
      ],
      stack: ['C#', 'JavaScript', 'PHP', 'SQL Server', 'Git'],
    },
  ],

  projects: [
    {
      title: 'Violet’s Bookshop',
      tag: 'client',
      context: 'Librairie-café à Saumur · en ligne',
      description: 'Site vitrine et e-commerce d’une librairie-café indépendante. Démarré en groupe pendant la licence, puis repris et poursuivi seul après la formation.',
      highlights: [
        'Site en production pour une vraie commerçante',
        'Boutique WooCommerce et contenus éditables par la cliente',
        'Prochaine étape : click-and-collect relié au logiciel d’inventaire Librisoft',
      ],
      stack: ['WordPress', 'WooCommerce', 'PHP', 'CSS'],
      image: null,
      link: 'https://www.violetsbookshop.fr/',
      repo: null,
      archived: false,
    },
    {
      title: 'Agence Ancreo',
      tag: 'formation',
      context: 'Licence Pro MIAW · projet de groupe',
      description: 'Création d’une agence web fictive et de son site vitrine immersif, de la maquette Figma à l’intégration.',
      highlights: [
        'Identité et maquettes sur Figma',
        'Animations au scroll avec GSAP, scène 3D avec Three.js',
      ],
      stack: ['Figma', 'Tailwind', 'GSAP', 'Three.js', 'JavaScript'],
      image: '/assets/img/ancreo-preview.png',
      link: 'https://agence-ancreo.lpmiaw.univ-lr.fr/',
      repo: null,
      archived: false,
    },
    {
      title: 'Hardware Shop',
      tag: 'formation',
      context: 'Licence Pro MIAW · projet de cours',
      description: 'Boutique de composants PC en monorepo, avec stock synchronisé en temps réel entre l’administration et les clients.',
      highlights: [
        'Mises à jour de stock en temps réel via WebSockets',
        'Panier, rôles utilisateurs et back-office',
      ],
      stack: ['Next.js', 'Fastify', 'TypeScript', 'WebSockets', 'Tailwind'],
      image: '/assets/img/ecommerce-platform.png',
      link: null,
      repo: 'https://github.com/sean-hardel/hardware-shop',
      archived: false,
    },
    {
      title: 'Ce portfolio',
      tag: 'perso',
      context: 'Projet personnel · open source',
      description: 'Site statique généré avec Next.js, pensé comme un petit projet de bout en bout : workflow Git, CI/CD, image Docker et CV généré automatiquement.',
      highlights: [
        'CI GitHub Actions : lint, typecheck, build, audit',
        'Déploiement automatique sur GitHub Pages',
        'Image Docker nginx avec en-têtes de sécurité',
      ],
      stack: ['Next.js', 'TypeScript', 'Tailwind', 'GitHub Actions', 'Docker'],
      image: null,
      link: null,
      repo: 'https://github.com/sean-hardel/PortFolio',
      archived: false,
    },
    {
      title: 'Gestion de bibliothèque',
      tag: 'formation',
      context: 'BTS SIO',
      description: 'Application web de gestion de bibliothèque : CRUD, rôles, sécurité et tableau de bord administrateur.',
      highlights: [],
      stack: ['Symfony', 'PHP', 'PostgreSQL'],
      image: '/assets/img/library-dashboard.png',
      link: null,
      repo: 'https://github.com/sean-hardel/BibliothequeGoldberg',
      archived: true,
    },
    {
      title: 'To-Do List Android',
      tag: 'formation',
      context: 'BTS SIO',
      description: 'Application Android native de gestion de tâches partagées entre équipes, avec catégories.',
      highlights: [],
      stack: ['Java', 'Android', 'SQLite'],
      image: null,
      link: null,
      repo: null,
      archived: true,
    },
  ],

  lab: [
    {
      title: 'Veille & IA',
      description: 'L’IA change notre métier : je l’utilise tous les jours et je suis l’actualité de près.',
      items: [
        'Veille tech automatisée : tâches planifiées avec Claude, synthèses rangées dans Obsidian',
        'Claude Code au quotidien pour coder, relire et documenter',
      ],
    },
    {
      title: 'Cybersécurité',
      description: 'Le domaine qui m’attire le plus, parce qu’il touche à tout : réseau, système, dev. J’en suis au début.',
      items: [
        'Parcours de formation Hack The Box en cours',
        'VM Kali Linux pour pratiquer',
      ],
    },
    {
      title: 'Self-hosting',
      description: 'Un petit homelab sur mon PC fixe pour apprendre en faisant.',
      items: [
        'Serveur multimédia Jellyfin',
        'Services conteneurisés avec Docker',
      ],
    },
    {
      title: 'Hygiène numérique',
      description: 'Je reprends la main sur mes données, étape par étape.',
      items: [
        'Linux au quotidien (CachyOS + Hyprland)',
        'Android sans services Google, mail chiffré',
        'Gestionnaire de mots de passe, 2FA locale, VPN, Tailscale',
      ],
    },
  ],

  stack: [
    { label: 'Front', items: ['Vue 3', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Figma'] },
    { label: 'Back & données', items: ['PHP', 'Symfony', 'C#', 'Node.js', 'Fastify', 'Supabase', 'PostgreSQL', 'SQL Server', 'MySQL'] },
    { label: 'CMS', items: ['WordPress', 'WooCommerce'] },
    { label: 'Outils', items: ['Git', 'GitHub', 'GitHub Actions', 'Docker', 'Linux', 'Python', 'Claude Code'] },
  ],

  education: [
    {
      degree: 'Licence Pro MIAW',
      school: 'Université de La Rochelle',
      year: '2025 – 2026',
      description: 'Métiers de l’informatique : applications web',
    },
    {
      degree: 'BTS SIO option SLAM',
      school: 'Lycée Guy Chauvet, Loudun',
      year: '2023 – 2025',
      description: 'Solutions logicielles et applications métiers',
    },
    {
      degree: 'Bac général',
      school: 'Lycée Guy Chauvet, Loudun',
      year: '2022',
      description: 'Spécialités LLCE anglais et physique-chimie',
    },
  ],

  interests: ['Rétro-gaming', 'Hardware PC', 'Homelab', 'Cybersécurité', 'OSINT'],
};
