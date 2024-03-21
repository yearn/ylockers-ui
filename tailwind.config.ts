import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'dark-black': '#000107',
      'dark-blue': '#000A3D',
      'white': '#FFFFFF',
      'blue': '#001170',
      'darker-blue': '#000B49',
      'light-blue': '#00A3FF',
      'lighter-blue': '#4DBFFF',
      'disabled-bg': '#DFDFDF',
      'disabled-text': '#9D9D9D',
      'charge-red': '#FF0F00',
      'charge-yellow': '#DBFF00',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
