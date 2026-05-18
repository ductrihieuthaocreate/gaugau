import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#000000",
          bg: "#ffffff",
          border: "#555555",
        },
        accent: {
          DEFAULT: "#000000",
          bg: "#f1f1f1",
          border: "#0048ff",
        },
        footer: {
          fg: "#ffffff",
          bg: "#000000",
        },
        drawer: {
          bg: "#dddddd",
          fg: "#000000",
        },
        badge: {
          new: "#006fda",
          sold: "#78766f",
          assorted: "#108474",
        },
        cart: "#c72d00",
        btn: {
          primary: "#dddddd",
          "primary-hover": "#9d9d9d",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        btn: "200px",
        modal: "20px",
      },
      maxWidth: {
        site: "1430px",
      },
    },
  },
  plugins: [],
};

export default config;
