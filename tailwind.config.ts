import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        brand: {
          50: '#FFF4ED',
          100: '#FFE6D4',
          200: '#FFC9A4',
          300: '#FFA46B',
          400: '#FF8242',
          500: '#FF7A2D',
          600: '#F26C2A',
          700: '#D14F11',
          800: '#A93D0E',
          900: '#7C2C0B',
          950: '#421506',
        },
        nav: {
          DEFAULT: '#585553',
          dark: '#3F3D3B',
          light: '#6B6866',
        },
        ink: {
          DEFAULT: '#121212',
          900: '#121212',
          800: '#1E1E1E',
          700: '#2A2A2A',
          600: '#3A3A3A',
        },
        cream: {
          50: '#FDF8F2',
          100: '#FBF1E5',
          200: '#F8E5CF',
          300: '#F2D2A8',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        '4xl': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        soft: '0 12px 30px -12px rgba(31, 28, 26, 0.18)',
        card: '0 4px 24px -6px rgba(31, 28, 26, 0.08), 0 1px 2px rgba(31, 28, 26, 0.04)',
        glow: '0 0 60px -12px rgba(242, 108, 42, 0.45)',
      },
      backgroundImage: {
        'hero-cream':
          "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.85) 1px, transparent 2px), radial-gradient(circle at 25% 60%, rgba(255,255,255,0.7) 1px, transparent 2px), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.8) 1.5px, transparent 3px), radial-gradient(circle at 85% 75%, rgba(255,255,255,0.75) 1px, transparent 2px), radial-gradient(circle at 50% 40%, rgba(255,255,255,0.65) 1.5px, transparent 3px), linear-gradient(180deg, #FBF1E5 0%, #FDF8F2 100%)",
        'cream-bokeh': 'linear-gradient(180deg, #FBF1E5 0%, #FDF8F2 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
