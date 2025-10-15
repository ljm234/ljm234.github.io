"use client";

import { useEffect, useState, useCallback } from "react";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/playground", label: "Playground" },
  { href: "/publications", label: "Publications" },
  { href: "/collaborations", label: "Collaborations" },
  { href: "/perf", label: "Perf" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    if (open) {
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      return () => (document.documentElement.style.overflow = prev);
    }
  }, [open]);

  // Close on ESC
  const onKeyDown = useCallback((e) => {
    if (e.key === "Escape") setOpen(false);
  }, []);
  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onKeyDown]);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/60 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <a href="/" className="font-semibold tracking-tight">Jordan Montenegro</a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 rounded"
            >
              {i.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile buttons */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center rounded border px-3 py-1 text-sm"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm"
        >
          <div className="mx-auto max-w-7xl px-4">
            <div className="h-14 flex items-center justify-between">
              <div className="text-lg font-semibold">Menu</div>
              <button
                onClick={() => setOpen(false)}
                className="rounded border px-3 py-1 text-sm"
                autoFocus
              >
                Close
              </button>
            </div>

            <ul className="mt-4 space-y-3 text-lg">
              {NAV.map((i) => (
                <li key={i.href}>
                  <a
                    href={i.href}
                    className="block rounded border px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                    onClick={() => setOpen(false)}
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

function ThemeToggle() {
  // Minimal, non-intrusive theme toggle (no external deps)
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);
  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    setDark((d) => !d);
    try {
      localStorage.setItem("theme", !dark ? "dark" : "light");
    } catch {}
  };
  return (
    <button onClick={toggle} className="rounded border px-3 py-1 text-sm">
      {dark ? "Dark" : "Theme"}
    </button>
  );
}
