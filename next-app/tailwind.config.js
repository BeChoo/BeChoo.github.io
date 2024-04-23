module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    colors: {
      background: "#90ccec", // Sky blue background color
      primary: "#FFFFFF", // White text color
      secondary: "#9E9E9E", // Secondary text color
      active: "#003366", // Dark blue for active elements
      light: "#121212", // Light background color
      black: "#000000", // Black text color
    },
    extend: {
      textColor: {
        black: "#000000", // Extend text color to include black
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  
};
