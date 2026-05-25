import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // PayLow brand orange — same hue, but a full modern scale
        brand: {
          50: '#FFF4EC',
          100: '#FFE3CF',
          200: '#FFC59E',
          300: '#FFA065',
          400: '#FF8242',
          500: '#F26C2A',  // primary
          600: '#D9551A',
          700: '#B53F0E',
          800: '#8C2E07',
          900: '#5E1F04',
          950: '#3A1102',
        },
        // Warm-tinted neutrals for a sophisticated, premium feel
        ink: {
          50: '#F8F7F5',
          100: '#EFEDE9',
          200: '#D7D3CB',
          300: '#B5AFA3',
          400: '#8B8474',
          500: '#5F594D',
          600: '#3F3A30',
          700: '#2A2620',
          800: '#1A1816',
          900: '#0E0D0C',  // near-black, warm
          950: '#070605',
        },
        accent: {
          rose: '#FF5A8A',
          amber: '#FFC53D',
          peach: '#FFD8B8',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #F26C2A 0%, #FF5A8A 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, #FFE3CF 0%, #FFD8E0 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FFF4EC 0%, #FFE3CF 50%, #FFD8E0 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1A1816 0%, #0E0D0C 100%)',
        'mesh-1':
          'radial-gradient(at 0% 0%, #FFE3CF 0px, transparent 50%), radial-gradient(at 100% 0%, #FFD8E0 0px, transparent 50%), radial-gradient(at 50% 100%, #FFF4EC 0px, transparent 50%)',
        'mesh-2':
          'radial-gradient(at 15% 20%, rgba(242,108,42,0.18) 0px, transparent 45%), radial-gradient(at 85% 10%, rgba(255,90,138,0.16) 0px, transparent 45%), radial-gradient(at 50% 90%, rgba(255,197,158,0.20) 0px, transparent 50%)',
        'grid-light':
          'linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(15, 13, 10, 0.04), 0 12px 32px rgba(15, 13, 10, 0.06)',
        card: '0 1px 2px rgba(15, 13, 10, 0.04), 0 8px 24px rgba(15, 13, 10, 0.06)',
        lift: '0 8px 20px rgba(15, 13, 10, 0.08), 0 24px 60px rgba(15, 13, 10, 0.10)',
        glow: '0 8px 28px rgba(242, 108, 42, 0.32), 0 0 0 1px rgba(242, 108, 42, 0.18)',
        'glow-sm': '0 4px 14px rgba(242, 108, 42, 0.28)',
        ring: '0 0 0 1px rgba(15, 13, 10, 0.06)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0)' },
          '50%': { transform: 'translateY(-12px) rotate(0.5deg)' },
        },
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { 'box-shadow': '0 0 0 0 rgba(242, 108, 42, 0.4)' },
          '50%': { 'box-shadow': '0 0 0 12px rgba(242, 108, 42, 0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.8s ease-out both',
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2.4s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
