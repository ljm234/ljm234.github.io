"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function MMPreview({ abstract, figures }) {
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null); // {src, alt, caption}
  const drawerRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (lightbox) setLightbox(null);
        else setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  // Click outside drawer
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (!drawerRef.current) return;
      if (!drawerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <>
      {/* floating action button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[60] rounded-full border px-4 py-2 text-sm bg-white/80 dark:bg-neutral-900/80 backdrop-blur shadow-lg"
        title="Quick Preview"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Quick Preview
      </button>

      {createPortal(
        <>
          {/* backdrop */}
          <div
            className={`fixed inset-0 z-[65] transition-opacity duration-200 ${
              open ? "opacity-100" : "pointer-events-none opacity-0"
            } bg-black/25 dark:bg-black/40 backdrop-blur-[2px]`}
          />

          {/* drawer */}
          <aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            className={`fixed right-0 top-0 z-[70] h-full w-[min(420px,92vw)]
              bg-white/90 dark:bg-neutral-900/90 text-neutral-900 dark:text-neutral-100
              border-l border-neutral-200/70 dark:border-neutral-800 backdrop-blur-xl
              shadow-2xl transition-transform duration-200
              ${open ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="h-14 px-4 flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-800">
              <div className="font-semibold">Montenegro’s Medium — Preview</div>
              <button onClick={() => setOpen(false)} className="rounded border px-2 py-1 text-xs">Close</button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-56px)]">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">{abstract}</p>

              <div className="grid grid-cols-2 gap-3">
                {figures.map((f) => (
                  <button
                    key={f.src}
                    onClick={() => setLightbox(f)}
                    className="rounded-xl overflow-hidden border hover:ring-2 hover:ring-neutral-400/50 focus:outline-none"
                    title={f.caption}
                  >
                    <Image
                      src={f.src}
                      alt={f.alt}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                      sizes="40vw"
                    />
                    <div className="px-2 py-1 text-[11px] text-neutral-600 dark:text-neutral-400 truncate">
                      {f.caption}
                    </div>
                  </button>
                ))}
              </div>

              <a className="underline text-sm" href="/papers/montenegro-medium.docx">Download manuscript (DOCX)</a>
            </div>
          </aside>

          {/* lightbox */}
          {lightbox && (
            <div
              className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              onClick={() => setLightbox(null)}
            >
              <figure className="max-w-5xl w-full">
                <Image
                  src={lightbox.src}
                  alt={lightbox.alt}
                  width={2000}
                  height={1400}
                  className="w-full h-auto object-contain"
                  sizes="100vw"
                />
                <figcaption className="mt-2 text-center text-sm text-neutral-200">
                  {lightbox.caption} — <button className="underline" onClick={() => setLightbox(null)}>Close</button>
                </figcaption>
              </figure>
            </div>
          )}
        </>,
        document.body
      )}
    </>
  );
}
