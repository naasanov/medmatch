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
        accentDarkBlue: "#001c88"
      },
      fontFamily: {
        sans: ["var(--font-nunito-sans)", "sans-serif"],
        arial: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
