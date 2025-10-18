"use client";

import { useEffect, useState } from "react";

function getStoredTheme() {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function applyTheme(mode) {
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
}

export default function ThemeToggle() {
  const [mode, setMode] = useState(() => getStoredTheme());

  useEffect(() => {
    applyTheme(mode);
    try {
      localStorage.setItem("theme", mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  return (
    <button
      onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
      aria-label="Toggle color scheme"
      className="rounded border px-3 py-1 text-sm"
      title={mode === "dark" ? "Dark" : "Light"}
    >
      {mode === "dark" ? "Dark" : "Light"}
    </button>
  );
}
