import type { Config } from "tailwindcss"
import libConfig from "--lib/tailwind.config"
import { deepMerge } from "--lib/tools/object"

const config: Config = {
  content: [
    "../--lib/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [],
}

config.safelist = deepMerge(libConfig.safelist, config.safelist)
config.theme = deepMerge(libConfig.theme, config.theme)

export default config
