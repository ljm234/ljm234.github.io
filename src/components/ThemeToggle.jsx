"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const dark = stored ? stored === "dark" : document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", dark);
      setIsDark(dark);
    } catch {}
  }, []);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
    setIsDark(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="rounded border border-neutral-300 dark:border-neutral-700 px-2 py-1 text-sm"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
