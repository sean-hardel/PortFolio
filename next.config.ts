import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

// GitHub Pages sert le site sous /PortFolio. PAGES_BASE_PATH="" permet de le servir
// à la racine (Docker, Lighthouse CI).
const basePath = isProd ? (process.env.PAGES_BASE_PATH ?? '/PortFolio') : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    BASE_PATH: basePath,
    COMMIT_SHA: (process.env.GITHUB_SHA ?? 'local').slice(0, 7),
    BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
};

export default nextConfig;
