/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts, tsx, js, jsx}', './src/**/*'],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        accent: '#ed4525',
        text: '#333',
        inputBg: '#f2f2f2',
      },
      borderRadius: {
        btn: '0.7rem',
      },
      fontWeight: {
        normMid: '450',
      },
      fontSize: {
        xxs: '0.65rem',
        btn: '0.95rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
