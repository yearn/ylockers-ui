import type {Config} from 'tailwindcss';
import libConfig from '--lib/tailwind.config';
import {deepMerge} from '--lib/tools/object';

const config: Config = {
	content: [
		'../--lib/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				'light-primary': '#54D7DC',
				'bright-primary': '#49C4C9',
				'boost-primary': '#3082B8',
				primary: '#444444',
				'deeper-primary': 'rgba(255, 255, 255, 0.1)',
				'deeper-primary-bg': 'rgba(255, 255, 255, 0.1)',
				'input-bg': 'rgba(255, 255, 255, 0.1)',
				'soft-primary': 'rgba(255, 255, 255, 0.5)'
			}
		}
	},
	plugins: []
};

config.safelist = deepMerge(libConfig.safelist, config.safelist);
config.theme = deepMerge(libConfig.theme, config.theme);

export default config;
