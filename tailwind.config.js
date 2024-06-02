/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				montserrat: [
					"Montserrat",
					"system-ui",
					"sans-serif",
				],
				"noto-kufi-arabic": [
					'"Noto Kufi Arabic"',
					"sans-serif",
				],
				outfit: ["Outfit", "sans-serif"],
				rem: ["REM", "sans-serif"],
			},

			colors: {
				primary: "#103B6B",
				secondary: "#FF5815",
				background: "#103B6B",
				white: "#FFFFFF",

				"Yale-Blue-50": "#DCEAFA",
				"Yale-Blue-100": "#CADFF7",
				"Yale-Blue-200": "#A7CAF2",
				"Yale-Blue-300": "#83B5ED",
				"Yale-Blue-400": "#60A0E7",
				"Yale-Blue-500": "#3C8BE2",
				"Yale-Blue-600": "#2076D5",
				"Yale-Blue-700": "#1B62B2",
				"Yale-Blue-800": "#154F8E",
				"Yale-Blue-900": "#103B6B",
				"Yale-Blue-950": "#0C2E53",

				coral: {
					DEFAULT: "#FF804D",
					50: "#FFFFFF",
					100: "#FFF4F0",
					200: "#FFD7C7",
					300: "#FFBA9F",
					400: "#FF9D76",
					500: "#FF804D",
					600: "#FF5815",
					700: "#DC3F00",
					800: "#A42F00",
					900: "#6C1F00",
					950: "#501700",
				},
			},
		},
	},
	plugins: [],
};
