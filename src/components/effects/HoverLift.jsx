"use client";

export default function HoverLift({ as: Tag = "div", className = "", children }) {
  return (
    <>
      <Tag className={["hoverlift", className].join(" ")}>{children}</Tag>
      <style jsx global>{`
        .hoverlift {
          transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
        }
        .hoverlift:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .hoverlift:active {
          transform: translateY(0);
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }
        @media (prefers-reduced-motion: reduce) {
          .hoverlift, .hoverlift:hover, .hoverlift:active { transition: none; transform: none; }
        }
      `}</style>
    </>
  );
}
