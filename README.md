# Portfolio · Sean Hardel

[![CI](https://github.com/sean-hardel/PortFolio/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/sean-hardel/PortFolio/actions/workflows/ci.yml)
[![Deploy](https://github.com/sean-hardel/PortFolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/sean-hardel/PortFolio/actions/workflows/deploy.yml)

Portfolio de développeur full stack : **[sean-hardel.github.io/PortFolio](https://sean-hardel.github.io/PortFolio/)**

Un site statique volontairement simple, traité comme un vrai projet : workflow Git, intégration continue, déploiement automatique, image Docker et CV généré depuis les mêmes données que le site.

## Ce qu'il y a dedans

- **Contenu centralisé** : tout le texte vit dans [`data/portfolio.ts`](data/portfolio.ts), typé. Le site, le terminal et le CV le lisent.
- **Mini terminal** dans le hero (`help`, `whoami`, `projects`, `neofetch`…) : historique, autocomplétion, accessible au clavier.
- **Thème clair / sombre** : suit le système par défaut, le choix est mémorisé.
- **CV** : une page A4 imprimable (`/cv/`) et un PDF généré automatiquement en CI.
- **Accessibilité et performance** vérifiées par Lighthouse CI à chaque PR.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, export statique), React 19, TypeScript |
| Style | Tailwind CSS 4, design tokens en variables CSS |
| Qualité | ESLint, `tsc`, Lighthouse CI, `npm audit`, Dependabot |
| CV | Playwright (impression de `/cv/` en PDF) |
| Déploiement | GitHub Actions → GitHub Pages |
| Auto-hébergement | Docker multi-stage, nginx non-root avec en-têtes de sécurité |

## Développer

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm run build        # export statique dans out/
npm run cv:pdf       # après build : génère out/cv-sean-hardel.pdf (1 page max)
```

Pour modifier le contenu, il suffit d'éditer [`data/portfolio.ts`](data/portfolio.ts).

## Structure

```
app/            pages (accueil, /cv, 404), métadonnées, sitemap, robots
components/     sections du site (Hero, Terminal, Experience, Projects…)
data/           contenu du site et liste des sections
lib/            commandes du terminal, thème, chemins, constantes du site
scripts/        génération du PDF du CV
docker/         configuration nginx et en-têtes de sécurité
```

## Workflow Git

- `main` : production, protégée, déployée automatiquement
- `develop` : intégration, protégée
- une issue par tâche, une branche par issue (`feat/7-hero-terminal`, `ci/12-deploy-pages`…), une PR vers `develop`
- commits au format [Conventional Commits](https://www.conventionalcommits.org/fr/) (`feat:`, `fix:`, `ci:`, `docs:`…)
- release : PR `develop` → `main`, puis tag

La CI (lint, typecheck, build, audit) est obligatoire pour merger. Un second job vérifie que le CV tient sur une page et lance Lighthouse sur `/` et `/cv/`.

## Docker

L'image construit le site (et le PDF du CV) puis le sert avec nginx à la racine :

```bash
docker build -t portfolio .
docker run --rm -p 8080:8080 portfolio   # http://localhost:8080
```

nginx tourne sans root et ajoute CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` et HSTS (voir [`docker/security-headers.conf`](docker/security-headers.conf)).

L'ancienne version du site est conservée sur la branche [`legacy/v1`](https://github.com/sean-hardel/PortFolio/tree/legacy/v1) (tag `v1.0.0`).
