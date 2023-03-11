/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      "sans": ["Prompt"], // default
      "serif": ["ui-serif", "Georgia"],
      "mono": ["ui-monospace", "SFMono-Regular"],
      "title": ["Unbounded"],
      "accent": ["VT323"],
      "code": ["'JetBrains Mono'"]
    },
    extend: {
      backgroundImage: {
        "landing-page-background": "url('/images/landing.jpg')"
      }
    },
  },
  plugins: [],
};
