/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      "sans": ["Prompt"],
      "serif": ["ui-serif", "Georgia"],
      "mono": ["ui-monospace", "SFMono-Regular"],
      "title": ["Unbounded"]
    },
    extend: {},
  },
  plugins: [],
};
