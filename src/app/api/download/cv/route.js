// Ensure this runs on the Node runtime and is always dynamic (no static optimization)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

async function loadBuffer() {
  // Try multiple known paths; you confirmed these filenames exist in your repo
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
      // keep trying the next candidate
    }
  }
  return null;
}

export async function GET() {
  const res = await loadBuffer();
  if (!res) {
    return NextResponse.json(
      { error: "CV not found in public/ (checked v3 and downloads paths)" },
      { status: 404 }
    );
  }
  const { buf, filename } = res;
  return new NextResponse(buf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(buf.byteLength),
      "Cache-Control": "no-store, max-age=0, s-maxage=0",
      "Content-Disposition": `inline; filename="${filename}"`,
    },
  });
}
