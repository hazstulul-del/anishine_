/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0d0f0e',
          soft: '#161816',
          card: '#1b1d1a',
          line: '#2a2c27',
        },
        paper: {
          DEFAULT: '#ece5d3',
          dim: '#c9c2ac',
          muted: '#8b8672',
        },
        seal: {
          DEFAULT: '#b8432f',
          bright: '#d15a3e',
          deep: '#8f3122',
        },
        jade: {
          DEFAULT: '#3f6659',
          bright: '#5a8b7a',
        },
        gold: {
          DEFAULT: '#c9a44c',
          soft: '#a98a44',
        },
      },
      fontFamily: {
        display: ['"Noto Serif TC"', '"Noto Serif SC"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      letterSpacing: {
        widest2: '0.35em',
      },
    },
  },
  plugins: [],
}
