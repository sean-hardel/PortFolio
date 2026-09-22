'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { getTheme, subscribeTheme, toggleTheme, type Theme } from '@/lib/theme';

export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(subscribeTheme, getTheme, () => null);
  const label = theme === 'light' ? 'Passer au thème sombre' : 'Passer au thème clair';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="grid h-8 w-8 place-items-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
