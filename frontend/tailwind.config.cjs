/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f2e0d6",
        paperSoft: "#f2dfd5",
        paperStrong: "#f2e1d8",
        ink: "#111111",
        accent: "#e94617"
      },
      boxShadow: {
        sketch: "6px 6px 0 rgba(17, 17, 17, 0.9)"
      }
    }
  },
  plugins: []
};
