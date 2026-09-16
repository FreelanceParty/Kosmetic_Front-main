/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme:   {
		extend: {
			fontFamily: {
				sans:    ["Montserrat", "sans-serif"],
				stolzl:  ['Stolzl', "system-ui", "sans-serif"],
				roboto:  ["Roboto", "sans-serif"],
				anton:   ["Anton", "sans-serif"],
			},
			screens:    {
				xs: '480px',
			},
		},
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
		require('tailwind-scrollbar'),
	],
}