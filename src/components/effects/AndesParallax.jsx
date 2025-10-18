// /src/components/effects/AndesParallax.jsx
"use client";

import { useEffect, useRef } from "react";

export default function AndesParallax({ className = "" }) {
  const rootRef = useRef(null);
  const rafRef = useRef(0);

  // Mouse parallax (respeta reduced-motion)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      tx = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2)));
      ty = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2)));
    };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--mx", String(x));
      el.style.setProperty("--my", String(y));
      rafRef.current = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={rootRef} className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <style>{`
        @keyframes condorFly {
          0%   { transform: translate(-30vw, 4vh) scale(1) rotate(-4deg); opacity: 0; }
          8%   { opacity: 1; }
          50%  { transform: translate(55vw, 0vh) scale(1.06) rotate(1deg); opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translate(130vw, 2vh) scale(1) rotate(-2deg); opacity: 0; }
        }
        @keyframes sunPulse { 0%,100% { transform: translate(-50%,-50%) scale(1);} 50%{transform:translate(-50%,-50%) scale(1.06);} }
        @media (prefers-reduced-motion: reduce) {
          .and-parallax { transform: none !important; }
          .and-condor { display: none !important; }
          .and-sun { animation: none !important; }
        }
      `}</style>

      {/* Sky */}
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-gradient-to-b from-sky-300 via-sky-100 to-white dark:from-[#07132a] dark:via-[#0b203e] dark:to-[#020617]" />
      </div>

      {/* Sun halo */}
      <div
        className="and-sun absolute left-[62%] top-[22%] h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-85 blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(255,230,120,0.65), rgba(255,190,0,0.20), transparent 70%)",
          animation: "sunPulse 11s ease-in-out infinite",
          transform: "translate(-50%, -50%) translateX(calc(var(--mx,0)*-18px)) translateY(calc(var(--my,0)*-12px))",
        }}
      />

      {/* Ridges (muy anchos, llegan a la derecha siempre) */}
      <svg
        className="and-parallax absolute bottom-[-10px] left-0 w-[220%] max-w-none"
        viewBox="0 0 1200 320"
        style={{ transform: "translateX(calc(var(--mx,0)*-14px)) translateY(calc(var(--my,0)*3px))" }}
      >
        <path d="M0 250 L120 220 L240 235 L360 210 L480 242 L590 225 L710 250 L830 232 L950 240 L1070 222 L1200 240 L1200 320 L0 320 Z"
              className="fill-sky-300/70 dark:fill-[#0e2444]" />
      </svg>

      <svg
        className="and-parallax absolute bottom-[-8px] left-0 w-[230%] max-w-none"
        viewBox="0 0 1200 320"
        style={{ transform: "translateX(calc(var(--mx,0)*-22px)) translateY(calc(var(--my,0)*7px))" }}
      >
        <path d="M0 262 L150 236 L270 255 L390 236 L510 265 L630 242 L750 266 L870 248 L990 258 L1110 248 L1200 260 L1200 320 L0 320 Z"
              className="fill-sky-400/80 dark:fill-[#12305c]" />
      </svg>

      {/* Agua/primer plano */}
      <svg
        className="and-parallax absolute bottom-0 left-0 w-[240%] max-w-none"
        viewBox="0 0 1200 320"
        style={{ transform: "translateX(calc(var(--mx,0)*-30px)) translateY(calc(var(--my,0)*11px))" }}
      >
        <path d="M0 284 L170 256 L310 276 L450 258 L590 286 L730 266 L870 286 L1010 270 L1150 280 L1200 282 L1200 320 L0 320 Z"
              className="fill-sky-500/90 dark:fill-[#163b70]" />
      </svg>

      {/* Base inferior para que nunca quede hueco */}
      <svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0 70 L1200 70 L1200 120 L0 120 Z" className="fill-sky-500/60 dark:fill-[#163b70]/70" />
      </svg>

      {/* Niebla de horizonte */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/95 via-white/75 to-transparent dark:from-neutral-950/95 dark:via-neutral-950/70" />

      {/* Cóndores */}
      <Condor className="and-condor absolute left-[-22vw] top-[20%] h-12 w-20" delay="6s" />
      <Condor className="and-condor absolute left-[-22vw] top-[28%] h-10 w-16" delay="18s" />
    </div>
  );
}

function Condor({ className = "", delay = "0s" }) {
  return (
    <div
      className={`${className} opacity-0`}
      style={{ animation: "condorFly 24s linear infinite", animationDelay: delay, filter: "drop-shadow(0 2px 2px rgba(0,0,0,.25))" }}
    >
      <svg viewBox="0 0 200 120" className="h-full w-full">
        <path d="M5 70 C60 40, 70 40, 100 55 C130 40, 140 40, 195 70 C180 68, 168 68, 150 72 C135 60, 120 56, 100 58 C80 56, 65 60, 50 72 C32 68, 20 68, 5 70 Z"
              fill="black" fillOpacity="0.9" />
        <circle cx="102" cy="58" r="3" fill="white" />
      </svg>
    </div>
  );
}
