"use client";

import { useEffect, useRef, useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus first link when opening
  useEffect(() => {
    if (open && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [open]);

  return (
    <header className="border-b border-neutral-200/60 dark:border-neutral-800 sticky top-0 z-40 bg-white/80 dark:bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="font-semibold tracking-tight whitespace-nowrap">
          Jordan Montenegro
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          <NavLink href="/about" label="About" />
          <NavLink href="/research" label="Research" />
          <NavLink href="/playground" label="Playground" />
          <NavLink href="/publications" label="Publications" />
          <NavLink href="/collaborations" label="Collaborations" />
          <NavLink href="/perf" label="Perf" />
          <NavLink href="/contact" label="Contact" />
          <ThemeToggle />
        </nav>

        {/* Mobile buttons */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="rounded border border-neutral-300 dark:border-neutral-700 px-3 py-1 text-sm"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 shadow-xl p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">Menu</div>
              <button
                className="rounded border px-3 py-1 text-sm"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <NavLink href="/about" label="About" refEl={firstLinkRef} onClick={() => setOpen(false)} />
              <NavLink href="/research" label="Research" onClick={() => setOpen(false)} />
              <NavLink href="/playground" label="Playground" onClick={() => setOpen(false)} />
              <NavLink href="/publications" label="Publications" onClick={() => setOpen(false)} />
              <NavLink href="/collaborations" label="Collaborations" onClick={() => setOpen(false)} />
              <NavLink href="/perf" label="Perf" onClick={() => setOpen(false)} />
              <NavLink href="/contact" label="Contact" onClick={() => setOpen(false)} />
            </div>

            <div className="mt-auto pt-4 text-xs text-neutral-500">
              © {new Date().getFullYear()} Jordan Montenegro
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, label, onClick, refEl }) {
  return (
    <a
      href={href}
      onClick={onClick}
      ref={refEl || null}
      className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 rounded"
    >
      {label}
    </a>
  );
}

function ThemeToggle() {
  return (
    <button
      className="rounded border border-neutral-300 dark:border-neutral-700 px-3 py-1 text-sm"
      onClick={() => {
        const el = document.documentElement;
        const dark = el.classList.toggle("dark");
        try {
          localStorage.setItem("theme", dark ? "dark" : "light");
        } catch {}
      }}
      aria-label="Toggle color theme"
    >
      Theme
    </button>
  );
}
