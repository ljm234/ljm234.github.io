// Convert all OT .tiff images to .png with the exact slugs our site uses.
// Run with: node scripts/convert-ot.cjs
const fs   = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const IN_DIR  = path.join(process.cwd(), 'public', 'research', 'ot');
const OUT_DIR = IN_DIR; // write PNGs next to originals

const plan = [
  // LDH 24 h
  ["24h_LDH_HeLa+Nf_Plate1_percent.tiff", "ldh-hela-nf-24h-plate1-percent.png"],
  ["24h_LDH_HeLa+Nf_Plate2_raw.tiff",     "ldh-hela-nf-24h-plate2-raw.png"],
  ["24h_LDH_Nf-only_Plate1_raw.tiff",     "ldh-nf-only-24h-plate1-raw.png"],
  ["24h_LDH_Nf-only_Plate2_raw.tiff",     "ldh-nf-only-24h-plate2-raw.png"],

  // Caspase-3 48 h
  ["48h_Caspase-3_HeLa+Nf_Plate1_percent.tiff", "caspase3-hela-nf-48h-plate1-percent.png"],
  ["48h_Caspase-3_HeLa+Nf_Plate2_percent.tiff", "caspase3-hela-nf-48h-plate2-percent.png"],
  ["48h_Caspase-3_Nf-only_Plate1_raw.tiff",     "caspase3-nf-only-48h-plate1-raw.png"],
  ["48h_Caspase-3_Nf-only_Plate2_raw.tiff",     "caspase3-nf-only-48h-plate2-raw.png"],

  // JC-1 72 h
  ["72h_JC-1_HeLa+Nf_Plate1_percent.tiff", "jc1-hela-nf-72h-plate1-percent.png"],
  ["72h_JC-1_HeLa+Nf_Plate2_percent.tiff", "jc1-hela-nf-72h-plate2-percent.png"],
  ["72h_JC-1_Nf-only_Plate1_percent.tiff", "jc1-nf-only-72h-plate1-percent.png"],
  ["72h_JC-1_Nf-only_Plate2_raw.tiff",     "jc1-nf-only-72h-plate2-raw.png"],
];

(async () => {
  try {
    for (const [srcName, outName] of plan) {
      const src = path.join(IN_DIR, srcName);
      const out = path.join(OUT_DIR, outName);
      if (!fs.existsSync(src)) {
        console.warn('Missing:', srcName);
        continue;
      }
      console.log('→', outName);
      await sharp(src).png({ compressionLevel: 9, quality: 90 }).toFile(out);
    }
    console.log('Done.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
