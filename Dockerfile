# syntax=docker/dockerfile:1

# --- Build : export statique + PDF du CV --------------------------------------
# L'image Playwright fournit Node et Chromium pour générer le PDF.
FROM mcr.microsoft.com/playwright:v1.63.0-noble AS build
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1 \
    PAGES_BASE_PATH="" \
    BASE_PATH=""

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build && npm run cv:pdf

# --- Run : nginx non-root ------------------------------------------------------
FROM nginxinc/nginx-unprivileged:1.29-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/out /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/ || exit 1
