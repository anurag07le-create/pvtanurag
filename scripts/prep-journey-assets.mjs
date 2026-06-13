// Prepares the journey assets from the raw drops at the project root:
//   road.png  ->  public/images/journey/road-tile.jpg   (seamless vertical
//                 mirror tile: road stacked above its own flip, so
//                 background-repeat: repeat-y never shows a seam)
//   car.png   ->  public/images/journey/car.webp         (keeps transparency,
//                 much lighter than the 3 MB source PNG)
//
// Run from the project root: node scripts/prep-journey-assets.mjs

import sharp from "sharp";
import fs from "node:fs/promises";

sharp.cache(false);
sharp.concurrency(1);

const OUT = "public/images/journey";
await fs.mkdir(OUT, { recursive: true });

// --- Road: seamless mirror tile, exported as JPG (no alpha needed) ---
const { width, height } = await sharp("road.png").metadata();
const flipped = await sharp("road.png").flip().toBuffer();

await sharp({
  create: { width, height: height * 2, channels: 3, background: "#5e3f22" },
})
  .composite([
    { input: "road.png", top: 0, left: 0 },
    { input: flipped, top: height, left: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${OUT}/road-tile.jpg`);

// --- Car: keep alpha, export light WebP ---
await sharp("car.png")
  .webp({ quality: 88, alphaQuality: 100 })
  .toFile(`${OUT}/car.webp`);

console.log(`road-tile.jpg  (${width}x${height * 2})`);
console.log("car.webp");
