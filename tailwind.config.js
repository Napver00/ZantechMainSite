import defaultColors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';

/*
 * Dark is the default theme. Light mode (html.light) is done by routing the
 * palette through CSS variables: brand surfaces swap, and white + the gray /
 * hue scales mirror around 500, so dark-first classes (text-white,
 * bg-white/5, text-gray-300…) invert cleanly. Use text-[#fff] / bg-[#fff]
 * where something must stay white in both themes.
 */
const NEUTRALS = ['slate', 'gray', 'zinc', 'neutral', 'stone'];
const HUES = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
const STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

const toRgb = (hex) => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = [...h].map((x) => x + x).join('');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(' ');
};
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

const palette = {};
const darkVars = { '--tw-white': '255 255 255' };
const lightVars = { '--tw-white': '15 23 42' };
for (const name of [...NEUTRALS, ...HUES]) {
  palette[name] = {};
  // Neutrals mirror fully; hues keep 500/600 so solid buttons stay saturated.
  const mirror = NEUTRALS.includes(name)
    ? { 50: 950, 100: 900, 200: 800, 300: 700, 400: 600, 500: 600, 600: 500, 700: 300, 800: 200, 900: 100, 950: 50 }
    : { 50: 950, 100: 900, 200: 800, 300: 700, 400: 600, 700: 300, 800: 200, 900: 100, 950: 50 };
  for (const step of STEPS) {
    palette[name][step] = v(`tw-${name}-${step}`);
    darkVars[`--tw-${name}-${step}`] = toRgb(defaultColors[name][step]);
    if (mirror[step]) lightVars[`--tw-${name}-${step}`] = toRgb(defaultColors[name][mirror[step]]);
  }
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...palette,
        white: v('tw-white'),
        'zan-red': '#ed2626',
        'zan-blue': v('zan-blue'),
        'zan-cyan': v('zan-cyan'), // Cyberpunk cyan
        'zan-neon': v('zan-neon'), // Neon green accent
        'zan-dark': v('zan-dark'), // Deep space dark
        'zan-light': v('zan-light'),
        'zan-gray': v('zan-gray'),
        'surface-dark': v('surface-dark'), // Slightly lighter than background
      },
      fontFamily: {
        sans: ['Kodchasan', 'system-ui', 'sans-serif'],
        heading: ['Kodchasan', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'], // Tech/code font
      },
      boxShadow: {
        'neon-blue': '0 0 5px rgb(var(--zan-cyan)), 0 0 20px rgb(var(--zan-cyan))',
        'neon-red': '0 0 5px #ed2626, 0 0 20px #ed2626',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scroll': 'scroll 40s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-up-delay': 'slideUp 0.8s ease-out 0.2s forwards',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'glitch': 'glitch 1s linear infinite',
        'shine': 'shine 3s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #262b72 0deg, #00f0ff 180deg, #ed2626 360deg)',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        },
        shine: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ addBase, addVariant }) => {
      // light:… utilities apply only in light mode (photos, overlays, depth).
      addVariant('light', 'html.light &');
      addBase({
        ':root': {
          ...darkVars,
          '--zan-dark': '11 15 25',
          '--surface-dark': '21 27 43',
          '--zan-cyan': '0 240 255',
          '--zan-neon': '57 255 20',
          '--zan-blue': '38 43 114',
          '--zan-light': '248 250 252',
          '--zan-gray': '51 65 85',
          '--grid-line': 'rgba(255, 255, 255, 0.05)',
          colorScheme: 'dark',
        },
        'html.light': {
          ...lightVars,
          '--zan-dark': '241 244 249',
          '--surface-dark': '255 255 255',
          '--zan-cyan': '14 116 144',
          '--zan-neon': '22 163 74',
          '--zan-blue': '38 43 114',
          '--zan-light': '15 23 42',
          '--zan-gray': '203 213 225',
          '--grid-line': 'rgba(15, 23, 42, 0.06)',
          colorScheme: 'light',
        },
      });
    }),
  ],
};