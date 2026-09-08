#!/usr/bin/env node
// scripts/compress-images.mjs
// Converts all PNG/JPEG images in /public to WebP using sharp.
// Run: node scripts/compress-images.mjs

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "../public");

const HIGH_QUALITY_IMAGES = new Set(["hero.png", "TORQUE.png"]);

const SKIP_IMAGES = new Set([
  "icon.png",
  "workspacelogo.png",
  "email_signature.png",
  "email_signature_small.png",
  "email_signature_extrasmall.png",
  "TORQUE logo (extralarge).png",
  "TORQUE logo (highdefinition).png",
  "TORQUE logo (large).png",
  "TORQUE logo (medium).png",
  "TORQUE logo (small).png",
]);

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "videos") continue;
      const nested = await getFiles(fullPath);
      files.push(...nested);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  const files = await getFiles(PUBLIC_DIR);
  const imageFiles = files.filter((f) => /\.(png|jpe?g)$/i.test(f));

  let converted = 0;
  let skipped = 0;
  let totalSavedBytes = 0;

  for (const filePath of imageFiles) {
    const basename = path.basename(filePath);

    if (SKIP_IMAGES.has(basename)) {
      console.log(`Skip (logo/icon): ${basename}`);
      skipped++;
      continue;
    }

    const webpPath = filePath.replace(/\.(png|jpe?g)$/i, ".webp");
    const quality = HIGH_QUALITY_IMAGES.has(basename) ? 85 : 80;

    try {
      const originalStat = await stat(filePath);
      await sharp(filePath).webp({ quality, effort: 6 }).toFile(webpPath);
      const newStat = await stat(webpPath);
      const savedKB = Math.round((originalStat.size - newStat.size) / 1024);
      totalSavedBytes += originalStat.size - newStat.size;
      const reduction = Math.round((1 - newStat.size / originalStat.size) * 100);
      console.log(`OK ${basename} -> ${path.basename(webpPath)} | ${Math.round(originalStat.size/1024)}KB -> ${Math.round(newStat.size/1024)}KB (-${reduction}%, -${savedKB}KB)`);
      converted++;
    } catch (err) {
      console.error(`FAIL: ${basename}`, err.message);
    }
  }

  console.log(`\nSummary: converted=${converted} skipped=${skipped} saved=${Math.round(totalSavedBytes/1024/1024*10)/10}MB`);
}

main().catch(console.error);
