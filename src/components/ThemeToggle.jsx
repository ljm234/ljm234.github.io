'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored ?? (prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } finally {
      setReady(true);
    }
  }, []);

  if (!ready) return null;

  function toggle() {
    const html = document.documentElement;
    const toDark = !html.classList.contains('dark');
    html.classList.toggle('dark', toDark);
    try { localStorage.setItem('theme', toDark ? 'dark' : 'light'); } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="rounded border border-neutral-300 dark:border-neutral-700 px-2 py-1 text-sm"
    >
      Theme
    </button>
  );
}
