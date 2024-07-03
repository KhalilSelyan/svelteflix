/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				accentcol: 'hsl(1, 59% , 50%)'
			},
			dropShadow: {
				sv: '0 0 0.125rem black'
			},
			screens: {
				mid: '60rem',
				sim: '45rem'
			}
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require('tailwind-scrollbar')]
};
