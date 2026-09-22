// Génère le PDF du CV à partir de l'export statique (out/).
// Usage : npm run build && npm run cv:pdf
import { createReadStream, existsSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';

const OUT_DIR = 'out';
const BASE_PATH = process.env.BASE_PATH ?? '/PortFolio';
const PDF_NAME = 'cv-sean-hardel.pdf';
const MAX_PAGES = 1;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Résout une URL du site (avec basePath) vers un fichier de out/
function resolveFile(url) {
  let path = decodeURIComponent(new URL(url, 'http://localhost').pathname);
  if (!path.startsWith(BASE_PATH)) return null;
  path = normalize(path.slice(BASE_PATH.length) || '/');
  if (path.includes('..')) return null;
  const candidates = [join(OUT_DIR, path), join(OUT_DIR, `${path}.html`), join(OUT_DIR, path, 'index.html')];
  return candidates.find((file) => existsSync(file) && statSync(file).isFile()) ?? null;
}

if (!existsSync(OUT_DIR)) {
  console.error(`Dossier ${OUT_DIR}/ introuvable : lance d'abord "npm run build".`);
  process.exit(1);
}

const server = createServer((req, res) => {
  const file = resolveFile(req.url ?? '/');
  if (!file) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${port}${BASE_PATH}/cv`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const output = join(OUT_DIR, PDF_NAME);
  await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true });

  const pdf = await readFile(output, 'latin1');
  const pages = (pdf.match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  console.log(`${output} généré (${pages} page${pages > 1 ? 's' : ''})`);

  if (pages > MAX_PAGES) {
    console.error(`Le CV dépasse ${MAX_PAGES} page : raccourcis le contenu.`);
    process.exitCode = 1;
  }
} finally {
  await browser.close();
  server.close();
}
