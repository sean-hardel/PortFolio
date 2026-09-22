import { portfolioData } from '@/data/portfolio';

// URL publique du site, basePath compris (sans slash final)
export const SITE_URL = portfolioData.personal.social.site.replace(/\/$/, '');

export const SITE_TITLE = `${portfolioData.personal.name} · ${portfolioData.personal.role}`;

export const SITE_DESCRIPTION =
  'Portfolio de Sean Hardel, développeur full stack web : applications métier, automatisation, et une vraie curiosité pour l’infra, la cybersécurité et l’IA.';

// Origine seule : Next ajoute lui-même le basePath aux fichiers de métadonnées
export const SITE_ORIGIN = new URL(SITE_URL).origin;
