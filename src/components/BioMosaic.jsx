// /src/components/BioMosaic.jsx
"use client";

import { useEffect, useRef } from "react";

/**
 * Parallax photo mosaic (reduced-motion safe)
 * Expected files in /public/images:
 *  - /images/jordan-headshot.jpg        (Picture 1)
 *  - /images/jordan-bsc.jpg             (IMG_8413)
 *  - /images/jordan-microscope.jpg      (IMG_9933)
 *  - /images/jordan-grad.jpg            (IMG_8156)
 *  - /images/jordan-casual.jpg          (IMG_6759)  // optional circle badge
 */
export default function BioMosaic({ className = "" }) {
  const root = useRef(null);
  const raf = useRef(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      tx = ((e.clientX - cx) / r.width) * 2;
      ty = ((e.clientY - cy) / r.height) * 2;
    };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--rx", String(y * -6));
      el.style.setProperty("--ry", String(x * 6));
      raf.current = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={root}
      className={`relative h-[420px] md:h-[520px] [perspective:1000px] ${className}`}
      aria-label="Photo mosaic of Jordan at work"
    >
      {/* base */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-neutral-900 dark:to-neutral-950"
      />

      <Card
        className="absolute left-0 top-10 w-[46%] md:w-[42%] rotate-[-2deg]"
        src="/images/jordan-bsc.jpg"
        alt="Jordan pipetting at a biosafety cabinet during a bench experiment"
        caption="Bench work — sterile assays"
        depth={30}
      />
      <Card
        className="absolute right-1 md:right-6 top-2 w-[44%] md:w-[40%] rotate-[2deg]"
        src="/images/jordan-microscope.jpg"
        alt="Jordan inspecting cells at a microscope"
        caption="Microscopy & verification"
        depth={22}
      />
      <Card
        className="absolute left-[10%] bottom-4 w-[36%] md:w-[32%] rotate-[1deg]"
        src="/images/jordan-headshot.jpg"
        alt="Studio headshot of Jordan Montenegro"
        caption="Jordan Montenegro"
        depth={18}
      />
      <Card
        className="absolute right-[10%] bottom-6 w-[30%] md:w-[28%] rotate-[-1.5deg]"
        src="/images/jordan-grad.jpg"
        alt="Jordan at Weber State graduation"
        caption="Weber State — commencement"
        depth={16}
      />

      {/* optional small circle badge */}
      <img
        src="/images/jordan-casual.jpg"
        alt=""
        className="absolute left-[46%] top-[8%] h-14 w-14 md:h-16 md:w-16 rounded-full border shadow-sm object-cover"
        aria-hidden="true"
        style={{ transform: "translateZ(40px)" }}
      />
    </div>
  );
}

function Card({ className = "", src, alt, caption, depth = 20 }) {
  return (
    <figure
      className={`group overflow-hidden rounded-xl border bg-white/80 backdrop-blur dark:bg-neutral-900/70 ${className}`}
      style={{
        transform:
          "rotateX(calc(var(--rx,0deg))) rotateY(calc(var(--ry,0deg))) translateZ(" +
          depth +
          "px)",
        transition: "transform 200ms ease",
      }}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/50 to-transparent p-2 text-xs text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
        {caption}
      </figcaption>
    </figure>
  );
}
