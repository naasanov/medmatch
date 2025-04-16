import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: {
				DEFAULT: 'hsl(var(--background))',
				white: 'hsl(var(--background-white))',
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
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))',
				
				//custom colors
				purple: {
					DEFAULT: 'hsl(var(--primary-purple))',
					hover: 'hsl(var(--primary-purple-hover))',
					500: 'hsl(var(--primary-purple))',
					400: 'hsl(var(--primary-purple-g1))',
					300: 'hsl(var(--primary-purple-g2))',
					200: 'hsl(var(--primary-purple-g3))',
				},
				blue: {
					DEFAULT: 'hsl(var(--primary-blue))',
					500: 'hsl(var(--primary-blue))',
					400: 'hsl(var(--primary-blue-g1))',
					300: 'hsl(var(--primary-blue-g2))',
					200: 'hsl(var(--primary-blue-g3))',
				},
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))',
				blue: {
					DEFAULT: 'hsl(var(--secondary-blue))',
					500: 'hsl(var(--secondary-blue))',
					400: 'hsl(var(--secondary-blue-g1))',
					300: 'hsl(var(--secondary-blue-g2))',
					200: 'hsl(var(--secondary-blue-g3))',
				},
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
  			},

			// custom colors
			title: {
				pb: {
					DEFAULT: 'hsl(var(--title-pb))',
					hover: 'hsl(var(--title-pb-hover))',
				},
				basic: {
					DEFAULT: 'hsl(var(--basic-title))',
					hover: 'hsl(var(--basic-title-hover))',
				},
			},

			body: {
				text: {
					DEFAULT: 'hsl(var(--body-text))',
					hover: 'hsl(var(--body-text-hover))',
				},
			},
			shadowsOutlines: {
				DEFAULT: 'hsl(var(--shadows-outlines))',
				hover: 'hsl(var(--shadows-outlines-hover))',
			},
  		},
  		fontFamily: {
  			sans: [
					'var(--font-inter)',
  				'var(--font-nunito-sans)',
  				'sans-serif'
  			],
  			arial: [
  				'Arial',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [tailwindAnimate],
} satisfies Config;
