'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // presse-papiers indisponible : le lien mailto reste utilisable
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      title={label}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Adresse copiée' : ''}
      </span>
    </button>
  );
}
