"use client";

/* Injects keyframes & utility classes used on the Collaborations page. */
export default function CollabFX({ className = "" }) {
  return (
    <style
      className={className}
      dangerouslySetInnerHTML={{
        __html: `
@media (prefers-reduced-motion: no-preference) {
  @keyframes collabSheen {
    0% { background-position: 0% 50% }
    100% { background-position: 200% 50% }
  }
  @keyframes collabGlow {
    0%,100% { opacity: .45; transform: translateY(0) }
    50%     { opacity: .9;  transform: translateY(-3px) }
  }
  @keyframes collabPip {
    0% { transform: translateY(0) }
    50% { transform: translateY(-6px) }
    100% { transform: translateY(0) }
  }
  @keyframes collabShimmer {
    0%   { background-position: 0% 50% }
    100% { background-position: 200% 50% }
  }
}
.collab-sheen   { background-size: 200% 100%; animation: collabSheen 2.6s linear infinite }
.collab-glow    { animation: collabGlow 6s ease-in-out infinite }
.collab-pip     { animation: collabPip 6.5s ease-in-out infinite }
.collab-shimmer {
  background-image: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.8) 50%, rgba(255,255,255,0) 100%);
  background-size: 200% 100%;
  animation: collabShimmer 2.1s linear infinite;
}
/* diagonal micro-stripes for idea cards */
.collab-stripes {
  background-image:
    linear-gradient(120deg, rgba(16,185,129,.18) 12%, transparent 12% 50%, rgba(14,165,233,.18) 50% 62%, transparent 62%);
  background-size: 18px 18px;
}
/* gradient border utility (no extra wrappers) */
.gborder {
  position: relative;
  background-clip: padding-box;
}
.gborder::before {
  content: "";
  position: absolute; inset: 0; z-index: -1; border-radius: inherit;
  background: linear-gradient(120deg, rgba(16,185,129,.55), rgba(56,189,248,.55), rgba(99,102,241,.55));
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  padding: 1px; /* border thickness */
  pointer-events: none;
}
`,
      }}
    />
  );
}
