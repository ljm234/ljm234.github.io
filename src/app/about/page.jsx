// /src/app/about/page.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NeuralGrid from "@/components/effects/NeuralGrid";
import SectionRidges from "@/components/effects/SectionRidges";
import Reveal from "@/components/effects/Reveal";
import HoverLift from "@/components/effects/HoverLift";
import Magnetic from "@/components/effects/Magnetic";
import Ripple from "@/components/effects/Ripple";

export default function AboutPage() {
  const [lightbox, setLightbox] = useState(null); // {src, alt} | null

  return (
    <div className="relative mx-auto max-w-6xl px-4 pt-2 pb-12 md:pt-3 md:pb-16 space-y-14">
      {/* BACKDROP */}
      <NeuralGrid className="pointer-events-none absolute inset-0 -z-20 opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-36 left-1/2 -z-10 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(234,250,255,.75), rgba(186,230,253,.35), rgba(209,250,229,.28), transparent 70%)",
        }}
      />

      {/* HERO */}
      <section className="relative -mt-1 md:-mt-2 overflow-hidden rounded-3xl border bg-white/65 p-6 md:p-8 dark:bg-neutral-950/50">
        <div className="absolute inset-x-0 bottom-0">
          <SectionRidges />
        </div>

        <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_.9fr]">
          {/* Copy */}
          <div>
            <Reveal effect="fade-up">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Hi, I’m Jordan — I build reliable ML for real patients.
              </h1>
            </Reveal>

            <Reveal effect="fade-up">
              <p className="mt-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                I’m an AI/ML research engineer with a clinical focus. I like models that don’t just
                score well — they explain themselves, calibrate to reality, and ship as useful
                software. My goal is simple: <span className="font-medium">make high-quality tools
                people can actually use</span>, especially in settings where speed, cost, and clarity
                matter.
              </p>
            </Reveal>

            <Reveal effect="fade-up">
              <div className="mt-6 grid gap-3">
                <BioPoint>Clinical ML & decision tooling (calibration, thresholds, net benefit)</BioPoint>
                <BioPoint>Fast web systems: Next.js, accessibility, Core Web Vitals 98–100</BioPoint>
                <BioPoint>Reproducible workflows: data cards, model cards, traced demos</BioPoint>
                <BioPoint>Microbiology enthusiast: growth media, assays, bench-to-bytes thinking</BioPoint>
              </div>
            </Reveal>
          </div>

          {/* Portrait */}
          <HoverLift>
            <button
              type="button"
              onClick={() =>
                setLightbox({
                  src: "/about/Picture%201.jpg",
                  alt: "Jordan Montenegro portrait",
                })
              }
              className="relative overflow-hidden rounded-2xl border cursor-zoom-in group"
              aria-label="Expand portrait"
              title="Click to expand"
            >
              <Image
                src="/about/Picture%201.jpg"
                alt="Jordan Montenegro"
                width={1600}
                height={1200}
                priority
                className="h-[360px] w-full object-cover animate-ken will-change-transform"
              />
              <OverlayHint />
            </button>
          </HoverLift>
        </div>
      </section>

      {/* LAB GALLERY */}
      <section className="relative space-y-3">
        <div className="absolute inset-x-0 -bottom-2">
          <SectionRidges />
        </div>

        <Reveal effect="fade-up">
          <h2 className="text-2xl font-semibold tracking-tight">In the lab</h2>
        </Reveal>
        <p className="text-neutral-600 dark:text-neutral-300">
          I split time between code and bench — thinking about the whole pipeline from sample
          handling to decisions at the bedside.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <HoverLift>
            <button
              type="button"
              onClick={() =>
                setLightbox({
                  src: "/about/IMG_8413.jpg",
                  alt: "Bench work and experimental planning",
                })
              }
              className="group relative overflow-hidden rounded-2xl border cursor-zoom-in"
              aria-label="Expand: bench work and experimental planning"
            >
              <Image
                src="/about/IMG_8413.jpg"
                alt="Bench work and experimental planning"
                width={1600}
                height={1200}
                loading="lazy"
                className="h-[320px] w-full object-cover animate-ken will-change-transform"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm text-white">
                Planning assays & documenting changes at the hood.
              </figcaption>
              <OverlayHint />
            </button>
          </HoverLift>

          <HoverLift>
            <button
              type="button"
              onClick={() =>
                setLightbox({
                  src: "/about/IMG_9933.jpg",
                  alt: "Microscopy and culture work",
                })
              }
              className="group relative overflow-hidden rounded-2xl border cursor-zoom-in"
              aria-label="Expand: microscopy and culture work"
            >
              <Image
                src="/about/IMG_9933.jpg"
                alt="Microscopy and culture work"
                width={1600}
                height={1200}
                loading="lazy"
                className="h-[320px] w-full object-cover animate-ken will-change-transform"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm text-white">
                Microscopy & growth experiments inform model features.
              </figcaption>
              <OverlayHint />
            </button>
          </HoverLift>
        </div>
      </section>

      {/* LIFE & MILESTONES */}
      <section className="relative space-y-3">
        <div className="absolute inset-x-0 -bottom-2">
          <SectionRidges />
        </div>

        <Reveal effect="fade-up">
          <h2 className="text-2xl font-semibold tracking-tight">Life & milestones</h2>
        </Reveal>
        <p className="text-neutral-600 dark:text-neutral-300">
          I’m grounded by family, sport, and community. The work matters because people matter.
        </p>

        <div className="grid gap-5 md:grid-cols-3">
          <HoverLift>
            <button
              type="button"
              onClick={() =>
                setLightbox({
                  src: "/about/IMG_8156.jpg",
                  alt: "Graduation day",
                })
              }
              className="relative overflow-hidden rounded-2xl border cursor-zoom-in group"
              aria-label="Expand: graduation day"
            >
              <Image
                src="/about/IMG_8156.jpg"
                alt="Graduation day"
                width={1600}
                height={1200}
                loading="lazy"
                className="h-[320px] w-full object-cover animate-ken will-change-transform"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm text-white">
                Commencement — grateful and just getting started.
              </figcaption>
              <OverlayHint />
            </button>
          </HoverLift>

          <HoverLift>
            <button
              type="button"
              onClick={() =>
                setLightbox({
                  src: "/about/IMG_6759.jpg",
                  alt: "Night at the pier",
                })
              }
              className="relative overflow-hidden rounded-2xl border cursor-zoom-in group"
              aria-label="Expand: night at the pier"
            >
              <Image
                src="/about/IMG_6759.jpg"
                alt="Night at the pier"
                width={1600}
                height={1200}
                loading="lazy"
                className="h-[320px] w-full object-cover animate-ken will-change-transform"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm text-white">
                Late-night runs by the water keep the head clear.
              </figcaption>
              <OverlayHint />
            </button>
          </HoverLift>

          <HoverLift>
            <div className="rounded-2xl border p-5 flex flex-col justify-between bg-white/60 dark:bg-neutral-950/50">
              <div>
                <div className="text-lg font-semibold">Outside work</div>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                  Big on sports, family time, and building things that last. I like projects where
                  I can blend <span className="font-medium">clear UX, strong engineering, and
                  responsible ML</span>.
                </p>
              </div>
              <ul className="mt-4 text-sm text-neutral-600 dark:text-neutral-300 space-y-1">
                <li>• Mentorship & service hours: 650+</li>
                <li>• Favorite loop: ship → measure → refine</li>
                <li>• Always writing: docs, model cards, roadmaps</li>
              </ul>
            </div>
          </HoverLift>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border p-6 md:p-8 bg-white/70 dark:bg-neutral-950/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">Want the technical deep-dive?</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Read the research or ping me for a quick chat.
            </p>
          </div>
          <div className="flex gap-3">
            <Magnetic>
              <Ripple>
                <a
                  href="/research"
                  className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
                >
                  View research
                </a>
              </Ripple>
            </Magnetic>
            <Magnetic>
              <Ripple>
                <a
                  href="/contact"
                  className="rounded-md border px-4 py-2 text-sm font-medium"
                >
                  Contact
                </a>
              </Ripple>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <Lightbox open={!!lightbox} src={lightbox?.src} alt={lightbox?.alt} onClose={() => setLightbox(null)} />

      {/* Local styles */}
      <style jsx>{`
        @keyframes kenburns { 0% { transform: scale(1.02) } 100% { transform: scale(1.08) } }
        .animate-ken { animation: kenburns 18s ease-in-out infinite alternate; transform-origin: center; }
      `}</style>
    </div>
  );
}

/* ---------- helpers ---------- */

function OverlayHint() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
  );
}

function BioPoint({ children }) {
  return (
    <div className="inline-flex items-start gap-2">
      <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
      <span className="text-sm">{children}</span>
    </div>
  );
}

/* Lightbox: bounded to viewport; close always visible */
function Lightbox({ open, src, alt, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
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
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Image preview"}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="fixed right-4 top-4 z-[110] rounded-md bg-white/95 px-3 py-1.5 text-sm font-medium text-black shadow hover:bg-white"
        aria-label="Close preview"
      >
        Close
      </button>

      <div className="absolute inset-0 grid place-items-center p-4" onClick={(e) => e.stopPropagation()}>
        <div className="relative max-h-[85vh] max-w-[96vw] overflow-hidden rounded-xl border bg-black/20 shadow-2xl animate-zoom">
          <Image
            src={src}
            alt={alt || ""}
            width={1920}
            height={1280}
            className="h-auto w-auto max-h-[85vh] max-w-[96vw] object-contain select-none"
            priority
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes zoomIn { from { transform: scale(.96); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        .animate-zoom { animation: zoomIn .18s ease-out both; }
      `}</style>
    </div>
  );
}
