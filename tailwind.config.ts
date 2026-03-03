import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rm-red': '#DA202A',
        'rm-blue': '#0079D2',
        'rm-magenta': '#991E5A',
        'rm-orange': '#D24713',
        'rm-black': '#2A2A2D',
        'rm-dark-grey': '#6C6C6C',
        'rm-light-grey': '#DCDCDE',
        'rm-bg-grey': '#F5F5F5',
      },
    },
  },
  plugins: [],
}
export default config
