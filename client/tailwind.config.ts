import type { Config } from "tailwindcss";

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
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			accentDarkBlue: '#001c88',
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
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
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
			primaryPurple: 'hsl(var(--primary-purple))',
			primaryBlue: 'hsl(var(--primary-blue))',
			secondaryBlue: 'hsl(var(--secondary-blue))',
			backgroundWhite: 'hsl(var(--background-white))',
			primaryPurpleG1: 'hsl(var(--primary-purple-g1))',
			primaryPurpleG2: 'hsl(var(--primary-purple-g2))',
			primaryPurpleG3: 'hsl(var(--primary-purple-g3))',
			primaryBlueG1: 'hsl(var(--primary-blue-g1))',
			primaryBlueG2: 'hsl(var(--primary-blue-g2))',
			primaryBlueG3: 'hsl(var(--primary-blue-g3))',
			secondaryBlueG1: 'hsl(var(--secondary-blue-g1))',
			secondaryBlueG2: 'hsl(var(--secondary-blue-g2))',
			secondaryBlueG3: 'hsl(var(--secondary-blue-g3))',
			titlePB: 'hsl(var(--title-pb))',
			basicTitle: 'hsl(var(--basic-title))',
			bodyText: 'hsl(var(--body-text))',
			shadowsOutlines: 'hsl(var(--shadows-outlines))',
			titlePBHover: 'hsl(var(--title-pb-hover))',
			basicTitleHover: 'hsl(var(--basic-title-hover))',
			bodyTextHover: 'hsl(var(--body-text-hover))',
			shadowsOutlinesHover: 'hsl(var(--shadows-outlines-hover))',
			primaryPurpleHover: 'hsl(var(--primary-purple-hover))',

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
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
