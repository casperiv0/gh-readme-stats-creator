module.exports = {
  mode: "jit",
  purge: ["./src/**/*.tsx"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "darker-gray": "#1a1a1a",
        "dark-gray": "#2f2f2f",
        "light-gray": "#444444",
      },
    },
  },
};
