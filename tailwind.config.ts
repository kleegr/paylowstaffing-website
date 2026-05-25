import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // PayLow brand orange — verified hex from live logo. Single hue, full scale.
        brand: {
          50: '#FFF4EC',
          100: '#FFE3CF',
          200: '#FFC59E',
          300: '#FFA065',
          400: '#FF8242',
          500: '#F26C2A',   // primary brand orange (PayLow)
          600: '#D9551A',
          700: '#B53F0E',   // deeper red-orange (gradient end)
          800: '#8C2E07',
          900: '#5E1F04',
          950: '#3A1102',
        },
        // Warm-tinted neutrals for premium feel
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
          900: '#0E0D0C',
          950: '#070605',
        },
      },
      backgroundImage: {
        // Single-hue brand gradient: orange → deeper red-orange (no invented pink)
        'gradient-brand': 'linear-gradient(135deg, #FF8242 0%, #F26C2A 50%, #D9551A 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, #FFF4EC 0%, #FFE3CF 100%)',
        'gradient-warm': 'linear-gradient(180deg, #FFFFFF 0%, #FFF4EC 60%, #FFE3CF 100%)',
        'gradient-dark': 'linear-gradient(180deg, #1A1816 0%, #0E0D0C 100%)',
        'mesh-1':
          'radial-gradient(60% 50% at 50% 0%, rgba(242,108,42,0.10) 0%, transparent 70%), radial-gradient(40% 40% at 100% 100%, rgba(217,85,26,0.08) 0%, transparent 70%)',
        'mesh-2':
          'radial-gradient(at 15% 20%, rgba(242,108,42,0.14) 0px, transparent 50%), radial-gradient(at 85% 10%, rgba(217,85,26,0.10) 0px, transparent 50%), radial-gradient(at 50% 95%, rgba(255,164,107,0.16) 0px, transparent 55%)',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(15, 13, 10, 0.04), 0 12px 32px rgba(15, 13, 10, 0.06)',
        card: '0 1px 2px rgba(15, 13, 10, 0.04), 0 6px 20px rgba(15, 13, 10, 0.05)',
        lift: '0 8px 20px rgba(15, 13, 10, 0.08), 0 24px 60px rgba(15, 13, 10, 0.10)',
        glow: '0 8px 28px rgba(242, 108, 42, 0.30), 0 0 0 1px rgba(242, 108, 42, 0.18)',
        'glow-sm': '0 4px 14px rgba(242, 108, 42, 0.25)',
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
          '50%': { transform: 'translateY(-6px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
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
