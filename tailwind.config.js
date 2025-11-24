/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        'brand': {
          'blue': '#3B82F6',
          'purple': '#A855F7',
          'orange': '#F97316',
        },
        // Background
        'bg': {
          'primary': '#F5F5F7',
        }
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'dropdown': 'dropdownFade 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slideDown': 'slideDown 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        dropdownFade: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
