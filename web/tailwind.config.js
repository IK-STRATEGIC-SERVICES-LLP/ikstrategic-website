/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1240px' },
    },
    extend: {
      colors: {
        /* ---- Primary: Deep Navy. Trust, stability, enterprise scale. ---- */
        navy: {
          50: '#F3F6FC',
          100: '#E4EBF7',
          200: '#C5D5EE',
          300: '#98B4DF',
          400: '#648CCB',
          500: '#416BB4',
          600: '#305498',
          700: '#28437B',
          800: '#1B2E58',
          900: '#111F41',
          950: '#08122A', // hero / footer canvas
        },

        /* ---- Accent: Electric Cyan. AI surfaces, primary CTAs, hovers. ---- */
        electric: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE', // the accent
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },

        /* ---- Secondary accent: Vibrant Indigo. Methodology / depth. ---- */
        violetine: {
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },

        /* ---- Neutrals: crisp white -> off-white section contrast ---- */
        canvas: {
          DEFAULT: '#FFFFFF',
          soft: '#F8FAFC',
          muted: '#F1F5F9',
          line: '#E6EBF2',
        },
      },

      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      /* Large, refined, fluid typography. */
      fontSize: {
        // Tuned so a three-line hero headline plus copy and CTAs clear the fold
        // on a ~700px-tall viewport. Raising this pushes the CTAs under.
        'display-xl': ['clamp(2.5rem, 5.5vw, 4.75rem)', { lineHeight: '0.98', letterSpacing: '-0.035em', fontWeight: '600' }],
        'display-lg': ['clamp(2.25rem, 4.6vw, 3.75rem)', { lineHeight: '1.03', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-md': ['clamp(1.75rem, 3.2vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '600' }],
        'display-sm': ['clamp(1.375rem, 2.2vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.18em', fontWeight: '600' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.7' }],
      },

      spacing: {
        section: 'clamp(4.5rem, 9vw, 8.5rem)',
        gutter: 'clamp(1.25rem, 4vw, 2rem)',
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },

      boxShadow: {
        card: '0 1px 2px rgba(8, 18, 42, 0.04), 0 12px 32px -12px rgba(8, 18, 42, 0.10)',
        'card-hover': '0 2px 4px rgba(8, 18, 42, 0.05), 0 28px 60px -20px rgba(8, 18, 42, 0.22)',
        glow: '0 0 0 1px rgba(34, 211, 238, 0.25), 0 18px 55px -18px rgba(34, 211, 238, 0.55)',
        inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      },

      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(8,18,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,18,42,0.05) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px)',
        'accent-sweep': 'linear-gradient(115deg, #22D3EE 0%, #6366F1 55%, #305498 100%)',
        'navy-fade': 'linear-gradient(180deg, #08122A 0%, #111F41 55%, #08122A 100%)',
      },
      backgroundSize: {
        grid: '56px 56px',
        'grid-sm': '28px 28px',
      },

      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.55' },
          '50%': { transform: 'translate3d(4%, -6%, 0) scale(1.14)', opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        aurora: 'aurora 18s ease-in-out infinite',
        'aurora-slow': 'aurora 26s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        marquee: 'marquee 38s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
