import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171714",
        bone: "#f5f2ea",
        paper: "#fbfaf6",
        taupe: "#9b8d7b",
        sand: "#ded5c8",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        display: ["Georgia", "Times New Roman", "serif"],
      },
      letterSpacing: { editorial: "0.18em" },
    },
  },
  plugins: [],
};

export default config;
