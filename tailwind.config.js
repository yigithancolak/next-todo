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
        h1: '2.25rem', // Font size for <h1>
        h2: '1.875rem', // Font size for <h2>
        h3: '1.5rem' // Font size for <h3>
        // Add more as needed...
      },
      lineHeight: {
        h1: '2.5rem', // Line height for <h1>
        h2: '2.125rem', // Line height for <h2>
        h3: '1.75rem' // Line height for <h3>
        // Add more as needed...
      },
      fontWeight: {
        h1: '700', // Font weight for <h1>
        h2: '600', // Font weight for <h2>
        h3: '500' // Font weight for <h3>
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
