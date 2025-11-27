/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    },
    fontFamily: {
      "sans": ['Poppins', 'sans-serif'],
      "secondary": ['Barlow Condensed', 'sans-serif'],
    },
    extend: {
      colors: {
        "primary": "#127e71",
        "highlight": "#9f1239",
        "highlight-hover": "#be123c",
        "muted": "#1e293b",
        "muted-hover": "#334155"
      },
      scale: {
            '-100': '-1',
      }
    },
  },
  plugins: [],
}