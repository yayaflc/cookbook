/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        josefin: ["Josefin Sans", "sans-serif"],
        modak: ["Modak", "cursive"],
      },
      colors: {
        background: {
          100: "#FDE493",
          200: "#FCEFCD",
        },
        title: {
          light: "#60B895",
        },
        button: {
          light: "#ED5964",
          dark: "#60B895",
        },
        hover: {
          buttonLight: "#C94953",
        },
      },
    },
  },
  plugins: [],
};