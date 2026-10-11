/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        artora: {
          ivory: '#F6F2EA',
          nearblack: '#171717',
          charcoal: '#20201F',
          cobalt: '#435BFF',
          burntorange: '#D96A45',
          warmgrey: '#D9D3C9',
          cream: '#FAF7F2',
          muted: '#737373',
          border: '#E5DFD5',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gallery': '0 20px 40px -15px rgba(23, 23, 23, 0.08), 0 0 1px 1px rgba(23, 23, 23, 0.04)',
        'lift': '0 30px 60px -20px rgba(23, 23, 23, 0.16), 0 0 1px 1px rgba(23, 23, 23, 0.06)',
      }
    },
  },
  plugins: [],
}
