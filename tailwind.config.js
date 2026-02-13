/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // fontFamily: {
      //   rubik: ["Rubik-Regular", "sans-serif"],
      //   rubikBold: ["Rubik-Bold", "sans-serif"],
      //   rubikExtraBold: ["Rubik-ExtraBold", "sans-serif"],
      //   rubikMedium: ["Rubik-Medium", "sans-serif"],
      //   rubikSemiBold: ["Rubik-SemiBold", "sans-serif"],
      //   rubikLight: ["Rubik-Light", "sans-serif"],
      // },
      colors: {
        main: "#B0D235",
        primary: "#0e1525",
        accent: {
          100: "#FBFBFD",
        },
        black: {
          DEFAULT: "#000000",
          100: "#8C8E98",
          200: "#666876",
          300: "#191d31",
        },
        danger: "#F75555",
      },
    },
  },
  plugins: [],
};
