/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts, tsx, js, jsx}', './src/**/*'],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        accent: '#ff4310',
        accentBright: '#ff4310',
        text: '#333',
        inputBg: '#f2f2f2',
      },
      borderRadius: {
        btn: '0.75rem',
      },
      fontWeight: {
        normMid: '450',
        420: '420',
      },
      fontSize: {
        xxs: '0.65rem',
        btn: '0.95rem',
      },
      padding: {
        4.5: '1.125rem',
      },
      width: {
        5.5: '1.375rem',
        4.5: '1.125rem',
      },
      height: {
        5.5: '1.375rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(#ccd5ef,#f8fafc)',
        'gradient-radial-dark': 'radial-gradient(#2C3E50,#050505)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
