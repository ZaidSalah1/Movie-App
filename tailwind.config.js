/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", './componenets/**/*.{js,jsx,ts,tsx}"],'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#030014',
        accent: '#AB8Bff',
        light: {
          100: '#D6C6FF',
          200: '#A8B5DB',
          300: '#9ca4ab'
        },dark: {
          100: '#221f3d',
          200: '#0f0d23'
        }
      }
    },
  },
  plugins: [],
};
