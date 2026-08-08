/**
 * Rasterises the brand SVGs to PNG.
 *
 *   npm run brand:png
 *
 * The SVGs remain the source of truth — never hand-edit the PNGs, regenerate
 * them. Each size is rendered directly at its target resolution (via `density`)
 * rather than rendered once and scaled, so edges and the gradient stay crisp.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'public', 'brand');
const OUT = path.join(SRC, 'png');

/** The SVG viewBox is 64×64; density 72 renders 1:1 at that size. */
const BASE = 64;
const densityFor = (size) => Math.min(Math.round((72 * size) / BASE), 4000);

const JOBS = [
  {
    svg: 'ik-mark.svg',
    name: 'ik-mark',
    sizes: [64, 128, 256, 512, 1024],
    note: 'navy mark, transparent — for light backgrounds',
  },
  {
    svg: 'ik-mark-onnavy.svg',
    name: 'ik-mark-onnavy',
    sizes: [64, 128, 256, 512, 1024],
    note: 'white mark, transparent — for dark backgrounds',
  },
  {
    svg: 'ik-tile.svg',
    name: 'ik-tile',
    sizes: [16, 32, 48, 64, 128, 256, 512, 1024],
    note: 'rounded navy tile — avatars, favicons, anywhere we control the rounding',
  },
  {
    svg: 'ik-square.svg',
    name: 'ik-square',
    sizes: [192, 512, 1024],
    flatten: true,
    note: 'full-bleed square, no alpha — iOS home screen, Android maskable',
  },
];

async function render(svgPath, size, { flatten = false } = {}) {
  const svg = await readFile(svgPath);
  let pipeline = sharp(svg, { density: densityFor(size) }).resize(size, size, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

  // Platform masks composite over transparency as black — flatten onto navy.
  if (flatten) pipeline = pipeline.flatten({ background: '#08122A' });

  return pipeline.png({ compressionLevel: 9 }).toBuffer();
}

async function main() {
  await mkdir(OUT, { recursive: true });

  for (const job of JOBS) {
    const svgPath = path.join(SRC, job.svg);
    for (const size of job.sizes) {
      const buffer = await render(svgPath, size, { flatten: job.flatten });
      const file = path.join(OUT, `${job.name}-${size}.png`);
      await writeFile(file, buffer);
      console.log(`  ${path.relative(ROOT, file)}  (${buffer.length.toLocaleString()} bytes)`);
    }
    console.log(`  ↳ ${job.note}\n`);
  }

  // Note: these are standalone assets only. The site itself references the
  // SVGs (app/icon.svg, the inline LogoMark component), so nothing here is
  // wired into the app — regenerating never changes what the site renders.
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
