"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") document.documentElement.classList.add("dark");
    } catch {}
  }, []);

  return (
    <button
      className="rounded border border-neutral-300 dark:border-neutral-700 px-2 py-1 text-sm"
      onClick={() => {
        const el = document.documentElement;
        const dark = el.classList.toggle("dark");
        try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
      }}
      aria-label="Toggle color theme"
    >
      Theme
    </button>
  );
}
