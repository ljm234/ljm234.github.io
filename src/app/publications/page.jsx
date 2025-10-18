"use client";

import { useMemo, useState } from "react";
import HoverLift from "@/components/effects/HoverLift";
import Reveal from "@/components/effects/Reveal";
import LightboxPDF from "@/components/LightboxPDF";
import CountUpNumber from "@/components/effects/CountUpNumber";
import pubs from "./pubs.json";

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */

// Normalize public asset paths like "public/papers/x.pdf" → "/papers/x.pdf"
const assetUrl = (s = "") => s.replace(/^\/?public\//, "/");
const isPdf = (u = "") => /\.pdf(?:$|\?)/i.test(u);
const uniq = (arr) => [...new Set(arr)];
const yearsOf = (rows) => [...new Set(rows.map((p) => p.year))].sort((a, b) => b - a);

// Your “Data” routes (open research pages, not files)
const DATA_ROUTES = {
  "montenegro-medium-2025": "/research/montenegro-medium",
  "organelle-target-2025": "/research/organelle-targets",
};

// “Download Project” preference order
function pickDownloadLink(p) {
  const L = p.links || {};
  const candidate = L.download || L.pdf || L.code || L.data || null;
  return candidate ? assetUrl(candidate) : null;
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function PublicationsPage() {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState("All");
  const [venue, setVenue] = useState("All");
  const [year, setYear] = useState("All");
  const [mode, setMode] = useState("grid");
  const [pdfSrc, setPdfSrc] = useState(null);

  const topics = ["All", ...uniq(pubs.map((p) => p.topic))];
  const venues = ["All", ...uniq(pubs.map((p) => p.venue))];
  const years = ["All", ...uniq(pubs.map((p) => String(p.year))).sort((a, b) => +b - +a)];

  // Hero stats (3 only, “With Data” hard-set to 3 per your requirement)
  const stats = useMemo(() => {
    const total = pubs.length;
    const withCode = pubs.filter((p) => !!p.links?.code).length;
    return { total, withCode, withData: 3 };
  }, []);

  // Filters
  const list = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return pubs.filter((p) => {
      if (topic !== "All" && p.topic !== topic) return false;
      if (venue !== "All" && p.venue !== venue) return false;
      if (year !== "All" && String(p.year) !== year) return false;
      if (!qq) return true;
      const text = `${p.title} ${p.venue} ${p.year} ${p.tags?.join(" ") ?? ""} ${p.abstract ?? ""}`.toLowerCase();
      return text.includes(qq);
    });
  }, [q, topic, venue, year]);

  const byYear = useMemo(() => {
    const m = new Map();
    for (const p of list) {
      if (!m.has(p.year)) m.set(p.year, []);
      m.get(p.year).push(p);
    }
    return [...m.entries()].sort((a, b) => b[0] - a[0]);
  }, [list]);

  const timelineYears = yearsOf(list);

  function openAsset(url) {
    const u = assetUrl(url);
    if (!u) return;
    if (isPdf(u)) setPdfSrc(u); // PDFs open in your lightbox
    else window.open(u, "_blank", "noreferrer"); // docx / code / etc → new tab
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-10 space-y-10">
      {/* HERO */}
      <section>
        <Reveal effect="fade-up">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Publications</h1>
        </Reveal>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat label="Total" value={<CountUpNumber value={stats.total} />} />
          <Stat label="With Code" value={<CountUpNumber value={stats.withCode} />} />
          <a
            href="/research/montenegro-medium"
            className="rounded-xl border p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900"
            title="See datasets in Research"
          >
            <div className="text-xs text-neutral-500">With Data</div>
            <div className="text-2xl font-semibold">
              <CountUpNumber value={stats.withData} />
            </div>
          </a>
        </div>
      </section>

      {/* FILTERS (aligned row) */}
      <section className="rounded-2xl border p-4">
        <div className="grid items-end gap-3 md:grid-cols-4">
          <label className="block">
            <div className="mb-1 text-xs text-neutral-500">Search</div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title, abstract, tags…"
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </label>
          <Select label="Topic" value={topic} onChange={setTopic} items={topics} />
          <Select label="Venue" value={venue} onChange={setVenue} items={venues} />
          <Select label="Year" value={year} onChange={setYear} items={years} />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <ModeChip on={mode === "grid"} onClick={() => setMode("grid")}>
            Grid
          </ModeChip>
          <ModeChip on={mode === "timeline"} onClick={() => setMode("timeline")}>
            Timeline
          </ModeChip>
          <span className="ml-auto text-xs text-neutral-500">
            Showing <strong>{list.length}</strong> result{list.length === 1 ? "" : "s"}
          </span>
        </div>
      </section>

      {/* RESULTS */}
      {mode === "grid" ? (
        <section className="grid gap-5 md:grid-cols-2">
          {list.map((p) => (
            <HoverLift key={p.id}>
              <PubCard p={p} onOpenAsset={openAsset} />
            </HoverLift>
          ))}
          {list.length === 0 && <Empty />}
        </section>
      ) : (
        <section className="relative">
          {/* Year rail */}
          <div className="pointer-events-none absolute left-3 top-0 hidden h-full w-px bg-neutral-200 md:block" />
          <div className="md:grid md:grid-cols-[110px_1fr] md:gap-6">
            <div className="sticky top-20 hidden max-h-[70vh] flex-col gap-1 overflow-auto rounded-xl border p-2 text-xs md:flex">
              {timelineYears.map((y) => (
                <a
                  key={y}
                  href={`#y-${y}`}
                  className="pointer-events-auto rounded-md px-2 py-1 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                >
                  {y}
                </a>
              ))}
            </div>

            {/* Timeline with animated connectors */}
            <div className="space-y-10">
              {byYear.map(([y, rows]) => (
                <div key={y} id={`y-${y}`} className="scroll-mt-24">
                  <div className="relative mb-3 pl-6">
                    <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-200/50 animate-pulse" />
                    <div className="font-semibold">{y}</div>
                  </div>
                  <div className="space-y-4">
                    {rows.map((p) => (
                      <div key={p.id} className="relative pl-6">
                        <span className="absolute left-[5px] top-5 h-px w-4 bg-emerald-300/70" />
                        <HoverLift>
                          <PubCard p={p} compact onOpenAsset={openAsset} />
                        </HoverLift>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {byYear.length === 0 && <Empty />}
            </div>
          </div>
        </section>
      )}

      {/* PDF lightbox (only for real PDFs; DOCX opens in new tab) */}
      <LightboxPDF open={!!pdfSrc} onClose={() => setPdfSrc(null)} src={pdfSrc ?? ""} />
    </div>
  );
}

/* ─── Components ───────────────────────── */
function Stat({ label, value }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="text-xs text-neutral-500">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}

function Select({ label, value, onChange, items }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs text-neutral-500">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border px-2 py-2 text-sm"
      >
        {items.map((it) => (
          <option key={it} value={it}>
            {it}
          </option>
        ))}
      </select>
    </label>
  );
}

function ModeChip({ on, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full border px-3 py-1 text-xs transition-colors " +
        (on
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "hover:bg-neutral-50 dark:hover:bg-neutral-900")
      }
    >
      {children}
    </button>
  );
}

function PubCard({ p, onOpenAsset, compact = false }) {
  const [open, setOpen] = useState(false);
  const L = p.links || {};

  const researchHref = DATA_ROUTES[p.id] || null; // Data → research page
  const downloadHref = pickDownloadLink(p); // docx/pdf/code/data

  return (
    <article className="group relative overflow-hidden rounded-2xl border p-4 transition-colors">
      {/* Hover glow (matches Services) */}
      <div className="pointer-events-none absolute -inset-20 -z-10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-60 bg-gradient-to-tr from-sky-400/20 to-emerald-400/20" />
      <div className="flex items-start gap-3">
        <div className="shrink-0 rounded-md border px-2 py-1 text-xs">
          {p.venue} • {p.year}
        </div>
        <div className="grow">
          <div className="font-semibold leading-snug">{p.title}</div>
          <div className="mt-0.5 text-xs text-neutral-500">{p.authors?.join(", ")}</div>
        </div>
      </div>

      {p.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full border px-2 py-0.5 text-[11px]">
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {/* Action strip: ONLY Data + Download Project */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {researchHref && (
          <a
            href={researchHref}
            className="rounded border px-2 py-0.5 text-[11px] hover:bg-neutral-50"
          >
            Data
          </a>
        )}
        {downloadHref && (
          <a
            href={downloadHref}
            target="_blank"
            rel="noreferrer"
            className="rounded border px-2 py-0.5 text-[11px] hover:bg-neutral-50"
          >
            Download Project
          </a>
        )}

        <span className="ml-auto" />
        {!compact && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border px-2 py-1 text-xs hover:bg-neutral-50"
          >
            {open ? "Hide" : "Quick Read"}
          </button>
        )}
      </div>

      {!compact && (
        <div
          className={
            "grid transition-all duration-300 ease-out " +
            (open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
          }
        >
          <div className="overflow-hidden">
            <div className="rounded-md border p-3 text-sm">
              <div className="text-xs font-medium text-neutral-500">Abstract</div>
              <p className="mt-1">{p.abstract}</p>

              {p.contributions?.length ? (
                <>
                  <div className="mt-3 text-xs font-medium text-neutral-500">Key contributions</div>
                  <ul className="mt-1 list-disc pl-5">
                    {p.contributions.map((c, i) => (
                      <li key={i} className="mt-1">
                        {c}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function Empty() {
  return (
    <div className="rounded-xl border p-6 text-center text-sm text-neutral-500">
      No results. Try adjusting filters or search.
    </div>
  );
}
