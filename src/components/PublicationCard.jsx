// /src/components/PublicationCard.jsx
"use client";

import { useState } from "react";
import HoverLift from "@/components/effects/HoverLift";

export default function PublicationCard({ paper, onOpenPDF }) {
  const [open, setOpen] = useState(false);
  const b = paper.links || {};
  const artifacts = [
    ["PDF", b.pdf],
    ["Code", b.code],
    ["Data", b.data],
    ["Model Card", b.model_card],
    ["Dataset Card", b.dataset_card]
  ].filter(([, v]) => v);

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      toast(`${label} copied`);
    } catch {
      toast("Copy failed");
    }
  };

  const [toastMsg, setToastMsg] = useState("");
  function toast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 1200);
  }

  return (
    <HoverLift>
      <article className="group relative rounded-xl border bg-white/70 p-4 dark:bg-neutral-950/60">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug">{paper.title}</h3>
          <span className="shrink-0 rounded-full border px-2 py-0.5 text-xs">{paper.year}</span>
        </div>
        <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          {paper.venue} • <span className="uppercase">{paper.topic}</span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {paper.tags?.map((t) => (
            <span key={t} className="rounded-full border px-2 py-0.5 text-xs">{t}</span>
          ))}
        </div>

        {/* Reproducibility strip */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {artifacts.map(([k, href]) => (
            <a
              key={k}
              href={href}
              onClick={(e) => {
                if (k === "PDF") {
                  e.preventDefault();
                  onOpenPDF?.(href, paper.title);
                }
              }}
              className="rounded border px-2 py-1 text-xs hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              {k}
            </a>
          ))}

          {paper.bibtex && (
            <button
              className="rounded border px-2 py-1 text-xs"
              onClick={() => copy(paper.bibtex, "BibTeX")}
            >
              Copy BibTeX
            </button>
          )}

          {b.doi && (
            <button
              className="rounded border px-2 py-1 text-xs"
              onClick={() => copy(b.doi, "DOI")}
            >
              Copy DOI
            </button>
          )}
        </div>

        {/* Quick Read */}
        <button
          className="mt-3 text-xs underline underline-offset-4"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Hide quick read" : "Quick read"}
        </button>

        <div
          className={`transition-[max-height,opacity] duration-300 ease-out ${
            open ? "opacity-100" : "max-h-0 overflow-hidden opacity-0"
          }`}
        >
          <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{paper.abstract}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {paper.contributions?.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>

        {/* Tiny toast */}
        {toastMsg && (
          <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs text-white">
            {toastMsg}
          </div>
        )}
      </article>
    </HoverLift>
  );
}
