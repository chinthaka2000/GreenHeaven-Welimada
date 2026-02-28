
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        'forest-black': '#fdfbf7', // Bright, clean off-white background
        'forest-moss': '#0a3a2a',   // Deep, rich forest green for text
        'golden-amber': '#fbbc05',  // Vibrant sun yellow accent
        'terracotta-clay': '#00b86b', // Eye-catching vibrant emerald green
        'sage-green': '#84cc16',    // Bright lime green for lively accents
        'cream-mist': '#062214',    // Very dark green for deepest contrast
      },
      fontFamily: {
        sans: ['Cormorant Garamond', 'serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['DM Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
