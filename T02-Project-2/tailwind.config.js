/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./frontend/src/layout/**/*.{js,ts,jsx,tsx}',
		'./frontend/src/pages/**/*.{js,ts,jsx,tsx}',
		'./frontend/src/components/**/*.{js,ts,jsx,tsx}',
		'./frontend/src/utils/**/*.{js,ts,jsx,tsx}',
	],
	important: '#root',
	theme: {
		extend: {
			fontSize: {
				base: '1rem',
			},
		},
		colors: {
			blue: '#daeafd',
			'dark-blue': '#c0dcfd',
			'blue-text': '#78b5ff',
			'blue-heart': '#66a3ff',
			pink: '#fddafc',
			'dark-pink': '#b100aa',
			yellow: '#fff6c8',
			brown: '#A0522D',
			darkyellow: '#F6C958',
			purple: '#e6d7ff',
			'dark-purple': '#a879f6',
			green: '#dcf5d9',
			'dark-green': '#a8d1a0',
			'light-white': '#ffffff66', // 66 is opacity
			'search-pink': '#f6dafd',
			red: '#FD8A8A',
			black: '#000000',
			white: '#ffffff',
			gray: '#D3D3D3',
		},
		screens: {
			sm: '320px', // mobile
			md: '768px', // tablet (vertical)
			lg: '1280px', // desktop or tablet (horizontal)
			smh: '844px', //bigger mobile (horizontal)
		},
		fontFamily: {
			fredoka: ['Fredoka', 'sans-serif'], // header at home page
			oswald: ['Oswald', 'sans-serif'], // all other headers
			quicksand: ['Quicksand', 'sans-serif'], // body text
		},
	},
	plugins: [],
};
