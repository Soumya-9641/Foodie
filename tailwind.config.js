/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}",
  'node_modules/flowbite-react/lib/esm/**/*.js'],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        nav:"#0a0a0a",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      backgroundImage: {
        'gradient-to-primary': 'linear-gradient(to right, #3f3f42, #00f6ff)',
        'gradient-to-dim-blue': 'linear-gradient(to right, #000000,#343434	 , #36454F)',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};