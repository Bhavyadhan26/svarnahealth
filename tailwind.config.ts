import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        emerald: 'rgb(var(--color-secondary) / <alpha-value>)',
        gold: 'rgb(var(--color-accent) / <alpha-value>)',
        ivory: 'rgb(var(--color-surface) / <alpha-value>)',
        void: 'rgb(var(--color-primary) / <alpha-value>)'
      },
      boxShadow: {
        aura: '0 0 60px rgba(205, 165, 136, 0.24), 0 0 160px rgba(111, 78, 58, 0.26)'
      },
      backgroundImage: {
        'brand-gradient': 'radial-gradient(circle at top, rgba(205,165,136,0.24), transparent 45%), radial-gradient(circle at 80% 20%, rgba(111,78,58,0.24), transparent 35%), linear-gradient(180deg, rgba(247,239,233,0.06), rgba(154,107,77,0.92) 30%, rgba(154,107,77,1))'
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(0.98)' },
          '50%': { opacity: '0.95', transform: 'scale(1.05)' }
        }
      },
      animation: {
        floatSlow: 'floatSlow 9s ease-in-out infinite',
        pulseGlow: 'pulseGlow 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;