/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme:   {
		extend: {
			fontFamily: {
				sans: ["Montserrat", "sans-serif"],
			},
			screens: {
				xs: '480px',
			},
		},
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
	],
}