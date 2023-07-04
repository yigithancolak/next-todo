/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FCF8FF',
        secondary: '#B0A8B9',
        ternary: '#FFE6C7',

        white: '#ffffff'
      },
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        md: '3rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      },
      fontSize: {
        h1: '2.25rem',
        h2: '1.875rem',
        h3: '1.5rem'
      },
      lineHeight: {
        h1: '2.5rem',
        h2: '2.125rem',
        h3: '1.75rem'
      },
      fontWeight: {
        h1: '700',
        h2: '600',
        h3: '500'
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem'
        },
        center: true
      }
    }
  },
  plugins: []
}
