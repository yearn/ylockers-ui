import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import Theme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  safelist: [
    'bg-bright-primary/60', 'border-bright-primary',
    'bg-charge-red/60', 'border-charge-red',
    'bg-dark-primary/60', 'border-transparent'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-aeonik-sans)'],
        thin: ['var(--font-aeonik-sans)'],
        mono: ['var(--font-aeonik-mono)'],
      },
      colors: {
        alert: colors.yellow,
        'dark-primary': '#000107',
        'deep-primary': '#000A3D',
        'white': '#FFFFFF',
        'offwhite': '#F4F4F4',
        'primary': '#001170',
        'deeper-primary': '#000B49',
        'deeper-primary-bg': '#1021835e',
        'soft-primary': '#555D8D',
        'input-bg': '#111B53',
        'boost-primary': '#0027ff',
        'bright-primary': '#00A3FF',
        'light-primary': '#4DBFFF',
        'disabled-bg': '#DFDFDF',
        'disabled-text': '#9D9D9D',
        'charge-red': '#FF0F00',
        'charge-yellow': '#DBFF00',
        'tab-inactive': 'rgba(255,255,255,0.2)',
        'tab-inactive-inner': 'rgba(255,255,255,0.3)'
      },
      borderRadius: {
        one: Theme.borderRadius.none
      },
      boxShadow: {
        'lg': '0 -40px 80px 80px rgba(0,0,0,0.9)',
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(230deg, rgba(200,25,40,1) 0%, rgba(219,110,55,1) 20%, rgba(236,184,64,1) 40%, rgba(104,183,120,1) 60%, rgba(71,119,211,1) 80%, rgba(72,44,216,1) 100%)'
      },
    },
  },
  plugins: [],
}

export default config
