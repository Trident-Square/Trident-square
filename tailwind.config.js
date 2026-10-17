/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/site/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2.5rem' }, screens: { '2xl': '1360px' } },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        'paper-2': 'rgb(var(--paper-2) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-2': 'rgb(var(--ink-2) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        cobalt: 'rgb(var(--cobalt) / <alpha-value>)',
        'cobalt-ink': 'rgb(var(--cobalt-ink) / <alpha-value>)',
        signal: 'rgb(var(--signal) / <alpha-value>)',
      },
      letterSpacing: { tightest: '-0.045em' },
      maxWidth: { prose: '68ch' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        rise: { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
        pulse_dot: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } },
        wave: { '0%,100%': { transform: 'scaleY(.25)' }, '50%': { transform: 'scaleY(1)' } },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        rise: 'rise .7s cubic-bezier(.2,.7,.2,1) both',
        'pulse-dot': 'pulse_dot 2s ease-in-out infinite',
        wave: 'wave 1s ease-in-out infinite',
        blink: 'blink 1s steps(1) infinite',
      },
    },
  },
  plugins: [],
}
