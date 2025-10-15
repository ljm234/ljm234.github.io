"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("theme");
      const isDark = stored ? stored === "dark" : false;
      setDark(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    } catch {}
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    document.documentElement.classList.toggle("dark", next);
  }

  if (!mounted) {
    return (
      <button
        className="rounded border border-neutral-300 dark:border-neutral-700 px-2 py-1 text-sm opacity-50"
        aria-label="Toggle color theme"
        disabled
      >
        Theme
      </button>
    );
  }

  return (
    <button
      className="rounded border border-neutral-300 dark:border-neutral-700 px-2 py-1 text-sm"
      onClick={toggle}
      aria-label="Toggle color theme"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
