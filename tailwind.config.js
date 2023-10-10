/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      sans: ["Prompt"], // default
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      title: ["Unbounded"],
      accent: ["VT323"],
      code: ["'JetBrains Mono'"],
    },
    extend: {
      colors: {
        "theme-primary": "#1e293b",
        "theme-secondary": "#facc15",
        "theme-white": "#f1f5f9",
        "theme-accent-1": "#bfdbfe",
        "theme-accent-2": "#283859",
        "theme-note": "#fef9c3",
        "theme-error": "#fca5a5"
      },
      backgroundImage: {
        "landing-page-img": "url('/images/landing.png')",
      },
    },
  },
  plugins: [],
};
