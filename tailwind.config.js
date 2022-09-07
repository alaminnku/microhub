module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["DynaPuff", "cursive"],
      },
      colors: {
        "dark-blue": "#172640",
        "light-blue": "#87a3bb",
        white: "#ffffff",
      },
      spacing: {},
      letterSpacing: {},
      lineHeight: {},
      fontSize: {},
      boxShadow: {},
    },
  },
  plugins: [],
};
