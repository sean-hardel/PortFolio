// Préfixe les fichiers statiques (images, PDF) avec le basePath de GitHub Pages
export function withBase(path: string) {
  return `${process.env.BASE_PATH ?? ''}${path}`;
}
