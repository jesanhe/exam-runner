const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,ts}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        cyan: colors.cyan,
        blueGray: colors.blueGray,
        emerald: colors.emerald,
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        appBackground: "var(--appBackground)",
        textColorLightBg: "var(--textColorLightBg)",
        textColorDarkBg: "var(--textColorDarkBg)",
        cardBackground: "var(--cardBackground)",
        correctAnswer: "var(--correctAnswer)",
        wrongAnswer: "var(--wrongAnswer)",
        notAnswer: "var(--notAnswer)",
        answer: "var(--answer)",
      },
      width: {
        240: "60rem",
      },
      ringOffsetColor: {
        primary: colors.primary,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
