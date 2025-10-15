"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => setMounted(true), []);

  // Lock page scroll while menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Close with ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/60 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <a href="/" className="font-semibold tracking-tight flex items-center gap-2">
          {/* Optional mark: drop /public/jm-mark.svg to use the icon */}
          {/* <img src="/jm-mark.svg" alt="" className="h-5 w-5" /> */}
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
            onClick={() => setOpen(true)}
            className="inline-flex items-center rounded border px-3 py-1 text-sm"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile overlay rendered at document.body level so it sits above EVERYTHING */}
      {mounted && open &&
        createPortal(
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[10000] bg-neutral-950 text-neutral-50"
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
                      className="block rounded border border-neutral-800 px-4 py-2 hover:bg-neutral-900"
                      onClick={() => setOpen(false)}
                    >
                      {i.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body
        )
      }
    </header>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    setDark((d) => !d);
    try { localStorage.setItem("theme", !dark ? "dark" : "light"); } catch {}
  };
  return (
    <button onClick={toggle} className="rounded border px-3 py-1 text-sm">
      {dark ? "Dark" : "Theme"}
    </button>
  );
}
