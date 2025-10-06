// Force Node runtime so we can read from the filesystem on Vercel
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

async function loadBuffer() {
  // Try a few candidate paths — we know you have the second one
  const candidates = [
    path.join(process.cwd(), "public", "Jordan-Montenegro-CV-v3.pdf"),
    path.join(process.cwd(), "public", "downloads", "Jordan-Montenegro-CV.pdf"),
    path.join(process.cwd(), "public", "downloads", "CV.pdf"),
  ];
  for (const p of candidates) {
    try {
      const buf = await fs.readFile(p);
      return { buf, filename: path.basename(p) };
    } catch {
      // keep trying
    }
  }
  return null;
}

export async function GET() {
  const res = await loadBuffer();
  if (!res) {
    return NextResponse.json(
      { error: "CV not found in public/ (checked v3 and downloads path)" },
      { status: 404 }
    );
  }
  const { buf, filename } = res;
  return new NextResponse(buf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(buf.byteLength),
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Content-Disposition": `inline; filename="${filename}"`,
    },
  });
}
