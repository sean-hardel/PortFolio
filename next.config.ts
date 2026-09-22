import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = "PortFolio"; // Nom exact de ton dépôt GitHub

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  env: {
    BASE_PATH: isProd ? `/${repoName}` : '',
    COMMIT_SHA: (process.env.GITHUB_SHA ?? 'local').slice(0, 7),
    BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
};

export default nextConfig;