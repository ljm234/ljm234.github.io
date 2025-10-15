"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function PreviewButton({ label = "Quick Preview", abstract, items = [] }) {
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const panelRef = useRef(null);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false), setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // click outside
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="ml-3 rounded border px-3 py-1 text-sm bg-white/70 dark:bg-neutral-900/70 backdrop-blur hover:bg-white dark:hover:bg-neutral-800"
      >
        {label}
      </button>

      {createPortal(
        <>
          {/* backdrop */}
          <div
            onClick={() => setOpen(false)}
            className={`fixed inset-0 z-[80] transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 pointer-events-none"} bg-black/30`}
          />

          {/* drawer */}
          <aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            className={`fixed right-0 top-0 z-[90] h-full w-[min(420px,92vw)]
              bg-white/90 dark:bg-neutral-900/90 text-neutral-900 dark:text-neutral-100
              border-l border-neutral-200/70 dark:border-neutral-800 backdrop-blur-xl
              shadow-2xl transition-transform duration-200 ${open ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="h-12 px-4 flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-800">
              <div className="text-sm font-semibold">Preview</div>
              <button onClick={() => setOpen(false)} className="rounded border px-2 py-1 text-xs">Close</button>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-48px)]">
              {abstract && <p className="text-sm text-neutral-700 dark:text-neutral-300">{abstract}</p>}

              <div className="grid grid-cols-2 gap-3">
                {items.map((f) => (
                  <button key={f.src} onClick={() => setLightbox(f)} className="rounded-xl overflow-hidden border">
                    <img src={f.src} alt={f.alt || f.caption} className="w-full h-auto object-cover" loading="lazy" />
                    <div className="px-2 py-1 text-[11px] text-neutral-600 dark:text-neutral-400 truncate">
                      {f.caption}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* lightbox */}
          {lightbox && (
            <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
              <figure className="max-w-5xl w-full">
                <img src={lightbox.src} alt={lightbox.alt || lightbox.caption} className="w-full h-auto object-contain" />
                <figcaption className="mt-2 text-center text-sm text-neutral-200">{lightbox.caption}</figcaption>
              </figure>
            </div>
          )}
        </>,
        document.body
      )}
    </>
  );
}
