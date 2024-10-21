/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
    	extend: {
    		fontFamily: {
    			montserrat: [
                    "Montserrat",
                    "system-ui",
                    "sans-serif",
                ],
    			'noto-kufi-arabic': [
                    "Noto Kufi Arabic",
                    "sans-serif",
                ],
    			outfit: ["Outfit", "sans-serif"],
    			rem: ["REM", "sans-serif"]
    		},
    		colors: {
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			primaryHover: 'var(--color-primary-hover)',
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			secondaryHover: '-hover)',
    			background: 'hsl(var(--background))',
    			white: '#FFFFFF',
    			'Yale-Blue-50': '#DCEAFA',
    			'Yale-Blue-100': '#CADFF7',
    			'Yale-Blue-200': '#A7CAF2',
    			'Yale-Blue-300': '#83B5ED',
    			'Yale-Blue-400': '#60A0E7',
    			'Yale-Blue-500': '#3C8BE2',
    			'Yale-Blue-600': '#2076D5',
    			'Yale-Blue-700': '#1B62B2',
    			'Yale-Blue-800': '#154F8E',
    			'Yale-Blue-900': '#103B6B',
    			'Yale-Blue-950': '#0C2E53',
    			coral: {
    				'50': '#FFFFFF',
    				'100': '#FFF4F0',
    				'200': '#FFD7C7',
    				'300': '#FFBA9F',
    				'400': '#FF9D76',
    				'500': '#FF804D',
    				'600': '#FF5815',
    				'700': '#DC3F00',
    				'800': '#A42F00',
    				'900': '#6C1F00',
    				'950': '#501700',
    				DEFAULT: '#FF804D'
    			},
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
};
