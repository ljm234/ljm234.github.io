"use client";

export default function FancyLink({ href, children, className = "" }) {
  return (
    <>
      <a href={href} className={["flink", className].join(" ")}>
        {children}
        <span className="flink-underline" />
      </a>
      <style jsx global>{`
        .flink {
          position: relative;
          display: inline-block;
        }
        .flink-underline {
          position: absolute;
          left: 0; bottom: -2px;
          height: 2px; width: 100%;
          background: linear-gradient(90deg, #6366f1, #22d3ee, #10b981);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 220ms ease;
        }
        .flink:hover .flink-underline { transform: scaleX(1); }
        @media (prefers-reduced-motion: reduce) {
          .flink-underline { transition: none; }
        }
      `}</style>
    </>
  );
}
