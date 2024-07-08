import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e2127",
        secondary: "#1e2030",
        secondaryLight: "#222436",
        purple: "#805ad5",
        lightPurple: "#bfa8e6",
        accent: "#74748f",
        custom_gray: "#2d3748",
        lightGray: "#4a5568",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
