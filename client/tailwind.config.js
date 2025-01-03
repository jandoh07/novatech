/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        secondary: "#FF5F5F",
        tertiary: "#384B70",
        accent: "#B84343",
      },
      fontFamily: {
        // sans: ["Inter", "sans-serif"],
        roboto: ["Roboto", "serif"],
      },
    },
  },
  plugins: [],
};
