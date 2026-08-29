/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        gold: '#E8A4B0',
        'gold-bright': '#F3E5AB',
        rose: '#E8A4B0',
        lavender: '#C8B6FF',
        champagne: '#F3E5AB',
        starlight: '#F8F9FA',
        midnight: '#1A1534',
        'midnight-2': '#2B2254',
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", 'Georgia', "'Times New Roman'", 'serif'],
        display: ["'Playfair Display'", "'Cormorant Garamond'", 'Georgia', 'serif'],
        sans: ["'Plus Jakarta Sans'", 'system-ui', '-apple-system', "'Segoe UI'", 'sans-serif'],
      },
      boxShadow: {
        'soft-glow': '0 0 20px rgba(200, 182, 255, 0.25)',
        'rose-glow': '0 0 20px rgba(232, 164, 176, 0.25)',
        'rose-glow-lg': '0 0 45px rgba(232, 164, 176, 0.35)',
      },
      borderRadius: {
        'soft': '16px',
        'pill': '24px',
      },
    },
  },
  plugins: [],
};
