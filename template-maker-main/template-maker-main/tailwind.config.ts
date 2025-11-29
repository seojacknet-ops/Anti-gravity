import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk Variable', 'system-ui', 'sans-serif'],
        body: ['Inter Variable', 'system-ui', 'sans-serif'],
      },
      colors: {
        base: '#000000',
        surface: '#0A0A0A',
        elevated: '#111111',
        muted: '#1A1A1A',
        subtle: '#222222',
        accent: {
          violet: '#8B5CF6',
          fuchsia: '#D946EF',
          cyan: '#22D3EE',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow': '0 0 40px rgba(139, 92, 246, 0.5)',
        'glow-lg': '0 0 60px rgba(139, 92, 246, 0.6)',
        'glow-xl': '0 0 80px rgba(139, 92, 246, 0.7)',
      },
      animation: {
        'gradient': 'gradient-flow 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 8s ease-in-out infinite 2s',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
      },
      keyframes: {
        'gradient-flow': {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(-2deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'morph': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(270, 90%, 60%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(330, 80%, 50%, 0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(200, 90%, 50%, 0.2) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}

export default config

