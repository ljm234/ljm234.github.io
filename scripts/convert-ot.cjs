import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const srcDir = path.join(process.cwd(), "public", "research", "ot");

// turn "24h_LDH_HeLa+Nf_Plate1_percent.tiff" -> "ldh-hela-nf-24h-plate1-percent.png"
function toKebabPng(file) {
  const base = file.replace(/\.tif?f$/i, "");
  const pretty = base
    .replace(/_/g, "-")
    .replace(/\+/g, "plus")
    .toLowerCase();
  // move time token after assay for consistency
  return pretty.endsWith("-percent") || pretty.endsWith("-raw")
    ? pretty.replace(/^(\d+h)-(.*)$/i, "$2-$1") + ".png"
    : pretty + ".png";
}

const options = { compressionLevel: 9, quality: 90 };

const files = (await fs.readdir(srcDir)).filter((f) => /\.tif?f$/i.test(f));
if (files.length === 0) {
  console.log("No TIFF files found in:", srcDir);
  process.exit(0);
}

for (const f of files) {
  const input = path.join(srcDir, f);
  const output = path.join(srcDir, toKebabPng(f));
  console.log("→", path.basename(output));
  const buf = await fs.readFile(input);
  await sharp(buf).png(options).toFile(output);
}

console.log("Done.");
