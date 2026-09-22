// Préfixe les fichiers statiques (images, PDF) avec le basePath de GitHub Pages
export function withBase(path: string) {
  return `${process.env.BASE_PATH ?? ''}${path}`;
}

// Généré en CI par scripts/generate-cv-pdf.mjs
export const CV_PDF_PATH = '/cv-sean-hardel.pdf';
