import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { portfolioData } from "@/data/portfolio";
import { SITE_DESCRIPTION, SITE_ORIGIN, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: { default: SITE_TITLE, template: `%s · ${portfolioData.personal.name}` },
  description: SITE_DESCRIPTION,
  authors: [{ name: portfolioData.personal.name, url: SITE_URL }],
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: `${SITE_URL}/`,
    siteName: portfolioData.personal.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', title: SITE_TITLE, description: SITE_DESCRIPTION },
};

// Données structurées pour les moteurs de recherche
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: portfolioData.personal.name,
  jobTitle: portfolioData.personal.role,
  url: SITE_URL,
  email: `mailto:${portfolioData.personal.email}`,
  sameAs: [portfolioData.personal.social.github, portfolioData.personal.social.linkedin],
  knowsLanguage: ['fr', 'en'],
};

// Applique le thème choisi avant le premier rendu pour éviter un flash
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
