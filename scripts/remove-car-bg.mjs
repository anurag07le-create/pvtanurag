// Removes the white background from the car illustration while preserving
// interior whites (e.g. the driver's shirt). Works by flood-filling from the
// image borders: only white pixels connected to the edge become transparent,
// so any white enclosed by the car body is left untouched.
//
// Usage: node scripts/remove-car-bg.mjs <input> [output]
//   defaults: input = public/images/journey/car-raw.png
//             output = public/images/journey/car.png

import sharp from "sharp";
import path from "node:path";

sharp.cache(false);
sharp.concurrency(1);

const input = process.argv[2] || "public/images/journey/car-raw.png";
const output = process.argv[3] || "public/images/journey/car.png";

// A pixel counts as "background white" if all channels are above this.
const WHITE = 238;
// Soft feather so edges aren't jagged.
const SOFT = 224;

const img = sharp(input).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const idx = (x, y) => (y * width + x) * channels;
const isWhite = (i) =>
  data[i] >= WHITE && data[i + 1] >= WHITE && data[i + 2] >= WHITE;

// BFS flood fill from every border pixel.
// Memory-bounded stack: each pixel can be pushed at most once, so a
// Uint32Array of width*height entries is a hard ceiling.
const visited = new Uint8Array(width * height);
const stack = new Uint32Array(width * height);
let sp = 0;

const push = (x, y) => {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const p = y * width + x;
  if (visited[p]) return;
  if (!isWhite(p * channels)) return;
  visited[p] = 1;
  stack[sp++] = p;
};

for (let x = 0; x < width; x++) {
  push(x, 0);
  push(x, height - 1);
}
for (let y = 0; y < height; y++) {
  push(0, y);
  push(width - 1, y);
}

while (sp > 0) {
  const p = stack[--sp];
  const x = p % width;
  const y = (p - x) / width;
  push(x + 1, y);
  push(x - 1, y);
  push(x, y + 1);
  push(x, y - 1);
}

// Apply: flooded pixels → transparent. Near-white flooded edges get partial alpha.
let cleared = 0;
for (let p = 0; p < width * height; p++) {
  if (!visited[p]) continue;
  const i = p * channels;
  const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
  // Feather: pixels closer to mid-grey keep a little alpha for a soft edge.
  data[i + 3] = lum >= WHITE ? 0 : Math.max(0, Math.min(255, (SOFT - lum) * -2));
  if (data[i + 3] === 0) cleared++;
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(path.resolve(output));

console.log(
  `Done → ${output}  (${width}x${height}, cleared ${cleared} bg px of ${width * height})`
);
