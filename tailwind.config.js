const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ], 
    theme: {
      extend: {},
    },
  darkMode: "class",
 plugins: [heroui()],
  };
  