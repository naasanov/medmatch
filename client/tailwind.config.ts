import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accentDarkBlue: "#001c88",
        
        // Main theme colors
        primaryPurple: "#735AFB",
        primaryBlue: "#0B3FC1",
        secondaryBlue: "#2A84E7",
        backgroundWhite: "#F7F7FF",

        // Gradients
        // higher numbers mean lighter colors
        primaryPurpleGrad1: "#8F7AFB",
        primaryPurpleGrad2: "#AB9CFC",
        primaryPurpleGrad3: "#D5CDFD",
        primaryBlueGrad1: "#3B65CD",
        primaryBlueGrad2: "#6C8BD9",
        primaryBlueGrad3: "#9DB2E6",
        secondaryBlueGrad1: "#549CEB",
        secondaryBlueGrad2: "#7FB5F0",
        secondaryBlueGrad3: "#A9CDF5",

        // Text colors
        titlePB: "#0B3FC1",
        titleBasic: "#19213D",
        bodyText: "#626980",
        shadowsOutlines: "#DEDEE5",
        titlePBHover: "#062573",
        titleBasicHover: "#0F1324",
        bodyTextHover: "#444959",
        shadowsOutlinesHover: "#B1B1B7",
        ppHover: "#503EAF",
      },
      fontFamily: {
        sans: ["var(--font-nunito-sans)", "sans-serif"],
        arial: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
