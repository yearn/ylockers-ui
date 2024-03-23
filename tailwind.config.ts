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
      'soft-blue': '#555D8D',
      'input-bg': '#111B53',
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
        'gradient-text': 'linear-gradient(230deg, rgba(200,25,40,1) 0%, rgba(219,110,55,1) 20%, rgba(236,184,64,1) 40%, rgba(104,183,120,1) 60%, rgba(71,119,211,1) 80%, rgba(72,44,216,1) 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
