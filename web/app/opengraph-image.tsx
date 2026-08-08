import { ImageResponse } from 'next/og';

/**
 * Social preview card, generated at build time.
 *
 * Next's file convention wires this into og:image automatically, and X/Twitter
 * falls back to og:image when no twitter:image is present — so this one file
 * covers LinkedIn, Slack, WhatsApp and X.
 *
 * Rendered by satori, which supports only a subset of CSS: flexbox but no grid,
 * and every element with more than one child needs an explicit display value.
 */

// Edge runtime: @vercel/og's Node bundle resolves its default font via
// fileURLToPath, which throws on Windows drive paths at build time.
export const runtime = 'edge';

export const alt =
  'IK Strategic Services LLP — digital transformation and intelligent automation for the enterprise';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#08122A',
          backgroundImage:
            'radial-gradient(circle at 78% 18%, rgba(34,211,238,0.28) 0%, transparent 45%), radial-gradient(circle at 12% 92%, rgba(99,102,241,0.30) 0%, transparent 48%)',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand lockup */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="og" x1="32" y1="48" x2="52" y2="15" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8" />
                <stop offset="1" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
            <rect x="11.5" y="14.75" width="7" height="36" rx="3.5" fill="#FFFFFF" />
            <rect x="25.5" y="14.75" width="7" height="36" rx="3.5" fill="#FFFFFF" />
            <path
              d="M32.5 32.75L50 16.25"
              stroke="url(#og)"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M32.5 32.75L48 47.75"
              stroke="url(#og)"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: '#FFFFFF', letterSpacing: -0.6 }}>
              IK Strategic
            </div>
            <div style={{ fontSize: 16, color: '#648CCB', letterSpacing: 3.4, marginTop: 4 }}>
              SERVICES LLP
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: -2.6,
              lineHeight: 1.06,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Digital transformation,</span>
            <span style={{ color: '#22D3EE' }}>engineered with intelligence.</span>
          </div>
          <div style={{ fontSize: 27, color: '#C5D5EE', marginTop: 26, lineHeight: 1.45 }}>
            AI &amp; automation · Web · Mobile · Consulting &amp; resourcing
          </div>
        </div>

        {/* Foot rule */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 96,
              height: 5,
              borderRadius: 3,
              backgroundColor: '#22D3EE',
              display: 'flex',
            }}
          />
          <div style={{ fontSize: 22, color: '#648CCB', marginLeft: 22 }}>www.ikstrategic.com</div>
        </div>
      </div>
    ),
    size,
  );
}
