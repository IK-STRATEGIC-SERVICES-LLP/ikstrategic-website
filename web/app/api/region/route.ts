import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Countries where analytics must be opt-in: EU, the rest of the EEA, the UK,
 * Switzerland, and the US. Everywhere else gets the lighter notice.
 */
const OPT_IN_COUNTRIES = new Set([
  // EU
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT',
  'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  // EEA, UK, Switzerland
  'IS', 'LI', 'NO', 'GB', 'CH',
  // US
  'US',
]);

/**
 * Tells the consent banner which model to use. Reads the country Vercel's edge
 * attaches to the request. Anything unknown (no header, local dev, a proxy
 * stripping it) falls back to the strict opt-in model.
 */
export function GET(request: Request) {
  const country = request.headers.get('x-vercel-ip-country')?.toUpperCase();
  const optIn = !country || OPT_IN_COUNTRIES.has(country);

  return NextResponse.json(
    { mode: optIn ? 'opt-in' : 'notice' },
    { headers: { 'Cache-Control': 'private, no-store' } },
  );
}
