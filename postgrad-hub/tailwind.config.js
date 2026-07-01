/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0A2E5D',
          50: '#E8EEF7',
          100: '#C7D5E9',
          200: '#8EAAD3',
          300: '#557FBD',
          400: '#2C599E',
          500: '#0A2E5D',
          600: '#082649',
          700: '#061D37',
          800: '#041425',
          900: '#020A13',
          950: '#01080F',
        },
        gold: {
          DEFAULT: '#D4AF37',
          50: '#FBF6E5',
          100: '#F5E9B6',
          200: '#EBD37C',
          300: '#E0BD52',
          400: '#D4AF37',
          500: '#B8932A',
          600: '#8E711F',
          700: '#5E4B15',
        },
        ink: '#0B1220',
        parchment: '#FAF7EF',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces"', '"Source Serif Pro"', 'Georgia', 'serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        card: '0 2px 8px rgba(10,46,93,0.06), 0 1px 3px rgba(10,46,93,0.05)',
        elevated: '0 20px 40px -10px rgba(10,46,93,0.25), 0 10px 20px -5px rgba(10,46,93,0.1)',
        gold: '0 10px 30px -5px rgba(212,175,55,0.4)',
        inner_glow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'grid-light': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='none' stroke='%230A2E5D' stroke-opacity='0.04'%3E%3Cpath d='M0 .5H40M.5 0V40'/%3E%3C/svg%3E\")",
        'grid-dark': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='none' stroke='%23D4AF37' stroke-opacity='0.06'%3E%3Cpath d='M0 .5H40M.5 0V40'/%3E%3C/svg%3E\")",
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        glow: { '0%,100%': { opacity: 0.4 }, '50%': { opacity: 0.8 } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        slideUp: 'slideUp 0.6s ease-out',
        glow: 'glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
