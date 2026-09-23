'use client';

import { useSyncExternalStore } from 'react';
import { Download } from 'lucide-react';

// Navigateurs intégrés aux applis (LinkedIn, Instagram, Facebook, TikTok…) et WebView Android :
// ils ignorent l'attribut download et n'affichent pas les PDF (page blanche).
const IN_APP_BROWSER = /LinkedInApp|FBAN|FBAV|Instagram|Messenger|TikTok|musical_ly|Snapchat|Twitter|Line\/|MicroMessenger|GSA\/|; wv\)/i;

const subscribe = () => () => {};
const isInAppBrowser = () => IN_APP_BROWSER.test(navigator.userAgent);

export default function CvDownload({ href }: { href: string }) {
  const inApp = useSyncExternalStore(subscribe, isInAppBrowser, () => false);

  return (
    <div className="flex flex-col items-end gap-2">
      <a
        href={href}
        download
        target="_blank"
        rel="noopener"
        type="application/pdf"
        className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-3 py-2 text-white hover:bg-neutral-700"
      >
        <Download size={14} aria-hidden="true" /> télécharger le PDF
      </a>
      {inApp && (
        <p role="note" className="max-w-[16rem] text-right text-[11px] leading-snug text-neutral-600">
          Le navigateur de cette appli ne sait pas ouvrir les PDF. Utilise le menu ⋮ ou ⋯ puis
          « Ouvrir dans le navigateur » pour le télécharger.
        </p>
      )}
    </div>
  );
}
