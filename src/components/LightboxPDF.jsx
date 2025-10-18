// /src/components/LightboxPDF.jsx
"use client";
import { useEffect } from "react";

export default function LightboxPDF({ open, src, title = "Paper", onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="fixed right-4 top-4 z-[130] rounded-md bg-white/95 px-3 py-1.5 text-sm font-medium text-black shadow hover:bg-white"
        aria-label="Close PDF"
      >
        Close
      </button>
      <div className="absolute inset-0 grid place-items-center p-3">
        <div className="h-[88vh] w-[96vw] overflow-hidden rounded-xl border bg-white shadow-2xl animate-zoom">
          {src ? (
            <iframe
              title={title}
              src={src}
              className="h-full w-full"
              style={{ background: "#fff" }}
            />
          ) : (
            <div className="grid h-full place-items-center text-sm text-white/90">No PDF provided</div>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes zoomIn { from { transform: scale(.96); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        .animate-zoom { animation: zoomIn .2s ease-out both; }
      `}</style>
    </div>
  );
}
