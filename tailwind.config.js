/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")], // shadcn/ui & reactbits components
  "css.lint.unknownAtRules": "ignore",
  "files.associations": { "*.css": "postcss" }
};
