// /src/components/effects/SectionRidges.jsx
"use client";

export default function SectionRidges({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {/* top fade */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent dark:from-neutral-950" />
      {/* ridges */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 240" preserveAspectRatio="none">
        <path d="M0 170 L120 150 L240 165 L360 148 L480 174 L600 156 L720 176 L840 160 L960 172 L1080 160 L1200 170 L1200 240 L0 240 Z"
              className="fill-sky-200/40 dark:fill-[#0e2444]/30" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 240" preserveAspectRatio="none">
        <path d="M0 190 L150 170 L300 184 L450 172 L600 194 L750 178 L900 194 L1050 182 L1200 190 L1200 240 L0 240 Z"
              className="fill-sky-300/35 dark:fill-[#12305c]/30" />
      </svg>
      {/* bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-neutral-950" />
    </div>
  );
}
