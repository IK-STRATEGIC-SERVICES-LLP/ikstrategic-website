/**
 * Renders the email signature card to PNG.
 *
 *   npm run brand:signature
 *   npm run brand:signature -- --name "Sajid Shaikh" --role "Founder"
 *
 * Output lands in public/brand/signature/. With no --name it renders the firm
 * signature, usable as-is by anyone; with one it renders a personal card.
 *
 * Two files per signature: `-2x.png` is the one to paste (rendered at double
 * resolution so it stays sharp on a retina screen), `-1x.png` is a fallback
 * for clients that ignore explicit width. Whichever you use, set the DISPLAY
 * width in the mail client to the 1x width printed below — an unconstrained
 * 2x image renders at twice the intended size.
 *
 * Fonts come from the machine doing the rendering: librsvg resolves the
 * family list below against installed system fonts, so a signature generated
 * on Windows and one generated on a bare CI container will not look
 * identical. Regenerate locally, commit the PNG, and treat that file as the
 * artefact rather than rebuilding it in a pipeline.
 *
 * A picture of text is a deliberate trade-off, and worth knowing about before
 * you adopt it: the address is not selectable, the links are not clickable,
 * screen readers get only the alt text, and mail clients that block remote
 * images (Outlook's default for external senders) show nothing at all. An
 * HTML signature avoids all four. Keep a plain-text block under the image.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'public', 'brand');
const OUT = path.join(SRC, 'signature');

/* ---- Brand constants. Mirrors of tailwind.config.js / lib/site.ts. ---- */
const NAVY_950 = '#08122A';
const NAVY_500 = '#416BB4';
const NAVY_700 = '#28437B';
const ELECTRIC_700 = '#0E7490';
const LINE = '#E6EBF2';

const FIRM_LEGAL = 'IK Strategic Services LLP';
const EMAIL = 'contactikstrategic@gmail.com';
const WEBSITE = 'www.ikstrategic.com';
const ADDRESS_1 = 'Flat No. 201, Leena Manik Apartment, near Shantai Hotel';
const ADDRESS_2 = 'Rasta Peth, Pune, Maharashtra 411011, India';

/** Windows-first, with fallbacks for macOS and Linux render hosts. */
const SANS = "'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif";

/* ---- Layout, in 1x CSS pixels. The 2x file is the same at density × 2. ---- */
const W = 468;
const PAD = 18;
const MARK = 60;
const RULE_X = PAD + MARK + 20;
const TEXT_X = RULE_X + 20;

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i]?.replace(/^--/, '');
    if (key) args[key] = argv[i + 1] ?? '';
  }
  return args;
}

const escapeXml = (s) =>
  s.replace(/[<>&'"]/g, (c) => `&${{ '<': 'lt', '>': 'gt', '&': 'amp', "'": 'apos', '"': 'quot' }[c]};`);

/**
 * The mark, inlined rather than referenced.
 *
 * librsvg will not follow an <image href> to a local file inside a buffer it
 * was handed as a string, so the geometry is copied from ik-mark.svg. Both
 * are hand-maintained; if the logo changes, change it here too. The gradient
 * id is namespaced because this SVG is composited, not standalone.
 */
function markSvg(x, y, size) {
  const s = size / 64;
  return `
    <g transform="translate(${x} ${y}) scale(${s})">
      <rect x="11.5" y="14.75" width="7" height="36" rx="3.5" fill="${NAVY_950}"/>
      <rect x="25.5" y="14.75" width="7" height="36" rx="3.5" fill="${NAVY_950}"/>
      <path d="M32.5 32.75L50 16.25" stroke="url(#sigGrad)" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M32.5 32.75L48 47.75" stroke="url(#sigGrad)" stroke-width="7" stroke-linecap="round" fill="none"/>
    </g>`;
}

function buildSvg({ name, role }) {
  const personal = Boolean(name);

  // Rows are laid out top-down from a cursor so adding or dropping the
  // personal lines cannot leave a gap behind.
  const rows = [];
  let y = PAD + 15;

  if (personal) {
    rows.push(
      `<text x="${TEXT_X}" y="${y}" font-family="${SANS}" font-size="17" font-weight="700" fill="${NAVY_950}">${escapeXml(name)}</text>`,
    );
    y += role ? 17 : 20;
    if (role) {
      rows.push(
        `<text x="${TEXT_X}" y="${y}" font-family="${SANS}" font-size="12.5" fill="${NAVY_500}">${escapeXml(role)}</text>`,
      );
      y += 20;
    }
    rows.push(
      `<text x="${TEXT_X}" y="${y}" font-family="${SANS}" font-size="10.5" font-weight="600" letter-spacing="1.6" fill="${NAVY_700}">${escapeXml(FIRM_LEGAL.toUpperCase())}</text>`,
    );
    y += 21;
  } else {
    rows.push(
      `<text x="${TEXT_X}" y="${y}" font-family="${SANS}" font-size="17" font-weight="700" fill="${NAVY_950}">${escapeXml(FIRM_LEGAL)}</text>`,
    );
    y += 19;
    rows.push(
      `<text x="${TEXT_X}" y="${y}" font-family="${SANS}" font-size="11.5" fill="${NAVY_500}">Digital transformation &amp; intelligent automation</text>`,
    );
    y += 22;
  }

  rows.push(
    `<text x="${TEXT_X}" y="${y}" font-family="${SANS}" font-size="12.5" font-weight="600" fill="${ELECTRIC_700}">${escapeXml(EMAIL)}</text>`,
  );
  y += 17;
  rows.push(
    `<text x="${TEXT_X}" y="${y}" font-family="${SANS}" font-size="12.5" fill="${NAVY_700}">${escapeXml(WEBSITE)}</text>`,
  );
  y += 17;
  rows.push(
    `<text x="${TEXT_X}" y="${y}" font-family="${SANS}" font-size="10.5" fill="${NAVY_500}">${escapeXml(ADDRESS_1)}</text>`,
  );
  y += 13;
  rows.push(
    `<text x="${TEXT_X}" y="${y}" font-family="${SANS}" font-size="10.5" fill="${NAVY_500}">${escapeXml(ADDRESS_2)}</text>`,
  );

  const height = y + PAD;
  const ruleTop = PAD + 4;
  const ruleBottom = height - PAD - 2;
  // Mark sits optically centred against the text block, not the canvas.
  const markY = ruleTop + (ruleBottom - ruleTop - MARK) / 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${height}" viewBox="0 0 ${W} ${height}">
  <defs>
    <linearGradient id="sigGrad" x1="32" y1="48" x2="52" y2="15" gradientUnits="userSpaceOnUse">
      <stop stop-color="#6366F1"/>
      <stop offset="1" stop-color="#22D3EE"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${height}" fill="#FFFFFF"/>
  ${markSvg(PAD, markY, MARK)}
  <line x1="${RULE_X}" y1="${ruleTop}" x2="${RULE_X}" y2="${ruleBottom}" stroke="${LINE}" stroke-width="1"/>
  ${rows.join('\n  ')}
</svg>`;

  return { svg, width: W, height };
}

async function render(svg, scale) {
  // density scales the whole rasterisation rather than resizing after the
  // fact, so text is re-hinted at the target resolution instead of blurred.
  return sharp(Buffer.from(svg), { density: 72 * scale })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const name = args.name?.trim() ?? '';
  const role = args.role?.trim() ?? '';

  await mkdir(OUT, { recursive: true });

  const { svg, width, height } = buildSvg({ name, role });
  const slug = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : 'firm';

  // The SVG is written out too — it is the source of truth, and it is what
  // you hand a designer who wants to adjust the card.
  await writeFile(path.join(OUT, `ik-signature-${slug}.svg`), svg, 'utf8');

  for (const scale of [1, 2]) {
    const buffer = await render(svg, scale);
    const file = path.join(OUT, `ik-signature-${slug}-${scale}x.png`);
    await writeFile(file, buffer);
    console.log(
      `  ${path.relative(ROOT, file)}  ${width * scale}×${height * scale}  (${buffer.length.toLocaleString()} bytes)`,
    );
  }

  console.log(`\n  Display width: ${width}px  (height ${height}px)`);
  console.log('  Paste the -2x.png and set its width to the display width above.\n');
  console.log('  Alt text to set on the image:');
  console.log(`    "${name ? `${name} — ` : ''}${FIRM_LEGAL}, ${EMAIL}, ${WEBSITE}"\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
