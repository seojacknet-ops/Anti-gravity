import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        // Brand colors based on SEOJack logo and design
        brand: {
          purple: "#5930A3", // Primary brand purple
          "purple-light": "#7C3AED",
          "purple-dark": "#4C1D95",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          pink: "#F472B6", // Pink accent
          "pink-light": "#F9A8D4",
          "pink-dark": "#EC4899",
        },
        // UI Shell colors
        surface: {
          DEFAULT: "var(--surface)",
          hover: "var(--surface-hover)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Semantic colors
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          light: "#7C3AED",
          dark: "#4C1D95",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
          light: "#F9A8D4",
          dark: "#EC4899",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        "brand": "0 4px 14px 0 rgba(89, 48, 163, 0.15)",
        "accent": "0 4px 14px 0 rgba(244, 114, 182, 0.15)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-inter)", "Inter", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-soft": "bounceSoft 2s infinite",
        "highlight-scribble": "highlightScribble 2s ease-in-out infinite",
        "highlight-scribble-delayed": "highlightScribble 2s ease-in-out infinite 0.3s",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        highlightScribble: {
          "0%": {
            transform: "translateX(-2px) translateY(1px) rotate(-0.5deg)",
            opacity: "0.8"
          },
          "25%": {
            transform: "translateX(1px) translateY(-1px) rotate(0.3deg)",
            opacity: "0.9"
          },
          "50%": {
            transform: "translateX(-1px) translateY(2px) rotate(-0.2deg)",
            opacity: "0.7"
          },
          "75%": {
            transform: "translateX(2px) translateY(-0.5px) rotate(0.4deg)",
            opacity: "0.8"
          },
          "100%": {
            transform: "translateX(-2px) translateY(1px) rotate(-0.5deg)",
            opacity: "0.8"
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
