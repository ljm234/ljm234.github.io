"use client";

export default function AuroraFX({ className = "" }) {
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      <style
        dangerouslySetInnerHTML={{
          __html: `
@media (prefers-reduced-motion: no-preference) {
  @keyframes auroraDriftA { 0%{transform:translate(-10%, -10%) rotate(0)} 50%{transform:translate(6%, -6%) rotate(30deg)} 100%{transform:translate(-10%, -10%) rotate(0)} }
  @keyframes auroraDriftB { 0%{transform:translate(12%, 8%) rotate(0)} 50% {transform:translate(-8%, 6%) rotate(-25deg)} 100%{transform:translate(12%, 8%) rotate(0)} }
  @keyframes auroraDriftC { 0%{transform:translate(-4%, 14%) rotate(0)} 50% {transform:translate(10%, 10%) rotate(20deg)} 100%{transform:translate(-4%, 14%) rotate(0)} }
}
.aurora { filter: blur(60px); opacity: .55 }
.aurora.a { animation: auroraDriftA 16s ease-in-out infinite }
.aurora.b { animation: auroraDriftB 20s ease-in-out infinite }
.aurora.c { animation: auroraDriftC 24s ease-in-out infinite }
`,
        }}
      />
      <div className="aurora a absolute -left-24 -top-32 h-96 w-[36rem] rounded-full bg-emerald-400/55" />
      <div className="aurora b absolute -right-24 top-0 h-[28rem] w-[32rem] rounded-full bg-sky-400/55" />
      <div className="aurora c absolute left-1/4 -bottom-28 h-[26rem] w-[30rem] rounded-full bg-indigo-400/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-transparent dark:from-neutral-900/40 dark:via-neutral-900/30" />
    </div>
  );
}
