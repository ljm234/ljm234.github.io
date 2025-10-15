"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/60 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <a href="/" className="font-semibold tracking-tight flex items-center gap-2">
          {/* optional mark: <img src="/jm-mark.svg" alt="" className="h-5 w-5" /> */}
          Jordan Montenegro
        </a>

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

        {/* Mobile actions */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center rounded border px-3 py-1 text-sm"
            aria-expanded={open}
            aria-controls="floating-menu"
            aria-haspopup="dialog"
          >
            Menu
          </button>
        </div>
      </div>

      {/* FLOATING MENU (glass card, theme-aware). Portal so it always sits on top */}
      {mounted &&
        createPortal(
          <>
            {/* subtle backdrop that respects theme; click anywhere closes */}
            <div
              onClick={() => setOpen(false)}
              className={`fixed inset-0 z-[60] transition-opacity duration-200 ${
                open ? "opacity-100" : "pointer-events-none opacity-0"
              } bg-black/20 dark:bg-black/30 backdrop-blur-[2px]`}
            />

            {/* floating panel near top-right */}
            <div
              id="floating-menu"
              role="dialog"
              aria-modal="true"
              ref={panelRef}
              className={`fixed right-3 top-16 z-[70] w-[18rem] max-w-[90vw]
                rounded-2xl border shadow-2xl ring-1
                border-neutral-200/70 ring-black/5
                bg-white/85 text-neutral-900
                dark:bg-neutral-900/85 dark:text-neutral-100
                backdrop-blur-xl
                transition-all duration-200 origin-top-right
                ${open ? "opacity-100 translate-y-0 scale-100" : "pointer-events-none opacity-0 -translate-y-2 scale-95"}`}
            >
              <div className="flex items-center justify-between px-4 h-12 border-b border-neutral-200/70 dark:border-neutral-800">
                <div className="text-sm font-semibold">Menu</div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded border px-2 py-1 text-xs"
                >
                  Close
                </button>
              </div>

              <ul className="p-3 space-y-2">
                {NAV.map((i) => (
                  <li key={i.href}>
                    <a
                      href={i.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm
                                 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400"
                    >
                      {i.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>,
          document.body
        )}
    </header>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  // Initialize from current <html> class (set by your no-flash script)
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    const nowDark = document.documentElement.classList.contains("dark");
    setDark(nowDark);
    try {
      localStorage.setItem("theme", nowDark ? "dark" : "light");
    } catch {}
  };
  return (
    <button
      onClick={toggle}
      className="rounded border px-3 py-1 text-sm"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {dark ? "Dark" : "Light"}
    </button>
  );
}
