import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          background: "#0a0a0a",
          color: "#fff",
          position: "relative",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        {/* Accent bar */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 12, background: "#e5e5e5" }} />

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", padding: "100px 80px", gap: 28 }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -1 }}>Jordan Montenegro</div>
          <div style={{ fontSize: 34, opacity: 0.9 }}>AI/ML Research Engineer · Clinical ML Researcher</div>
          <div style={{ fontSize: 28, opacity: 0.75 }}>Clinical ML &amp; Decision Support</div>
        </div>

        {/* Subtle grid */}
        <svg width="1200" height="630" style={{ position: "absolute", inset: 0, opacity: 0.12 }}>
          {Array.from({ length: 1200 / 40 }).map((_, i) => (
            <line key={"x" + i} x1={i * 40} y1="0" x2={i * 40} y2="630" stroke="#ffffff" strokeWidth="1" />
          ))}
          {Array.from({ length: 630 / 40 }).map((_, i) => (
            <line key={"y" + i} x1="0" y1={i * 40} x2="1200" y2={i * 40} stroke="#ffffff" strokeWidth="1" />
          ))}
        </svg>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
