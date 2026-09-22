'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { complete, runCommand, type CommandContext } from '@/lib/commands';
import { toggleTheme } from '@/lib/theme';

interface Entry {
  id: number;
  input?: string;
  output: ReactNode;
}

const MAX_ENTRIES = 30;

// Contexte vide pour la sortie initiale (whoami ne l'utilise pas)
const noopContext: CommandContext = {
  clear: () => {},
  openCv: () => {},
  toggleTheme: () => {},
};

function Prompt() {
  return (
    <span aria-hidden="true" className="shrink-0">
      <span className="text-accent">sean</span>
      <span className="text-faint">@</span>
      <span className="text-fg">portfolio</span> <span className="text-faint">~&gt;</span>{'\u00a0'}
    </span>
  );
}

export default function Terminal() {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>(() => [
    { id: 0, input: 'whoami', output: runCommand('whoami', noopContext) },
    {
      id: 1,
      output: (
        <p className="text-faint">
          Tape <span className="text-accent">help</span> pour voir les commandes.
        </p>
      ),
    },
  ]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [entries]);

  const push = (input: string | undefined, output: ReactNode) => {
    const id = nextId.current++;
    setEntries((current) => [...current, { id, input, output }].slice(-MAX_ENTRIES));
  };

  const submit = () => {
    const input = value.trim();
    setValue('');
    setCursor(null);
    if (!input) {
      push('', null);
      return;
    }
    setHistory((current) => [...current, input]);

    let cleared = false;
    const context: CommandContext = {
      clear: () => {
        cleared = true;
        setEntries([]);
      },
      openCv: () => router.push('/cv'),
      toggleTheme,
    };
    const output = runCommand(input, context);
    if (!cleared) push(input, output);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    } else if (event.key === 'Tab') {
      const matches = complete(value);
      if (matches.length === 0) return;
      event.preventDefault();
      if (matches.length === 1) setValue(matches[0]);
      else push(value, <p className="text-muted">{matches.join('  ')}</p>);
    } else if (event.key === 'ArrowUp') {
      if (history.length === 0) return;
      event.preventDefault();
      const index = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(index);
      setValue(history[index]);
    } else if (event.key === 'ArrowDown') {
      if (cursor === null) return;
      event.preventDefault();
      const index = cursor + 1;
      if (index >= history.length) {
        setCursor(null);
        setValue('');
      } else {
        setCursor(index);
        setValue(history[index]);
      }
    } else if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      setEntries([]);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-line-strong bg-surface shadow-2xl shadow-black/20 focus-within:border-accent">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="ml-2 font-mono text-xs text-faint">fish — sean@portfolio</span>
      </div>

      <div
        ref={scrollRef}
        onClick={() => {
          if (!window.getSelection()?.toString()) inputRef.current?.focus();
        }}
        className="h-80 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed text-fg"
      >
        <div role="log" aria-live="polite" aria-label="Sortie du terminal" className="space-y-2">
          {entries.map((entry) => (
            <div key={entry.id}>
              {entry.input !== undefined && (
                <p className="flex flex-wrap">
                  <Prompt />
                  <span>{entry.input}</span>
                </p>
              )}
              {entry.output}
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center">
          <Prompt />
          <label htmlFor="terminal-input" className="sr-only">
            Commande du terminal (tape help)
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
            className="min-w-0 flex-1 bg-transparent text-fg caret-accent focus-visible:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
