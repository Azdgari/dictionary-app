/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      fontFamily: {
        'lora': ['Lora', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'inconsolata': ['Inconsolata', 'monospace']
      },
      colors: {
        navyBlack: '#050505',
        veryDarkGray: '#1F1F1F',
        darkGrey: '#2D2D2D',
        darkishGrey: '#3A3A3A',
        lightGrey: '#757575',
        pale: '#E9E9E9',
        paleWhite: '#F4F4F4',
        white: '#FFFFFF',
        purple: '#A445ED',
        red: '#FF5252',
    },
  },
  plugins: [],
}
}
