import type { Config } from "tailwindcss";

const { nextui } = require('@nextui-org/react')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        '1sm': '12px',
        '2sm': '14px',
        '3sm': '15px',
        '4sm': '16px',
        '5sm': '18px',
        '6sm': '40px',
        '7sm': '75px',
        '8sm': '40px',
    },
    fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
    },
    colors: {
        biofixfresh: {
            background: '#FEFAF6',
            light_blue: '#232F3A',
            yellow: '#FEBD69',
            dark_blue: '#00263E',
            drak_nav: '#151515',
            DEFAULT: '#131921',
            dark: {
                background: '#131921',
                light_blue: '#232F3A',
                yellow: '#FEBD69',
                dark_blue: '#00263E',
                DEFAULT: '#EAEDED',
            },
        },
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    },
    },
  },
  variants: {
    extend: {
        backgroundColor: ['dark'],
        textColor: ['dark'],
    },
},
darkMode: 'class',
plugins: [nextui()],
};
export default config;
