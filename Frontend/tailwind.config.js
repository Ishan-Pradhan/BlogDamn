/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
      padding: '1rem',

      // default breakpoints but with 40px removed
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend:{
      colors:{
        primary: "#FF8C42",
        primaryTint: '#ff6d0f',
        primaryShadow: "#a4636c",
        text: "#373A58",
        background: "#f7f7f7",
        secondary: "#4A4A4A",
        secondaryTint: "#313131",
        line: "#D9D9D9"
      }
    }
  },
  plugins: [],
  safelist: [
    'bg-primary',
    'bg-secondary',
    'bg-primaryTint',   
    'bg-secondaryTint',   
    'hover:bg-primaryTint',  
    'hover:bg-secondaryTint',
  ],
}

