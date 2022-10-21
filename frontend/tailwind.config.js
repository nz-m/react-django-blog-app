/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "4rem",
      },
    },
    fontFamily: {
      monoton:["Monoton", "cursive"],
      satoshi:['Satoshi', 'sans-serif'],
      clash:['Clash Display', 'sans-serif'],
      infinite: ["Outfit", "sans-serif"],
      bebasneo: ['Bebas Neue', 'cursive'],
    },
    extend: {
      boxShadow: {
        "3xl": "-1px 34px 47px -29px rgb(32 32 32 / 100%)",
        "4xl": " 0vw 0vw 0.5vw 0vw rgb(32 32 32 / 20%)",
        "5xl": " 0vw 0.5vw 0.5vw 0vw rgb(32 32 32 / 16%)",
        glass: "1px 5px 12px 1px rgba( 31, 38, 135, 0.37 )",
        "glass-card": "4px 4px 4px 4px rgba( 32, 32, 32, 0.37 )",
        "card-shadow": "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        "dark-shadow": "10px 10px 5px 0px rgba(130,130,130,0.75)"
      },

      colors: {
        bg: {
          DEFAULT: "#202020",
          200: "#272727",
          300: "#2e2e2e",
        },
        primary: {
          DEFAULT: "#3ABFF8",
          secondary: "#828DF8",
          accent: "#F471B5",
          neutral: "#1D283A",
          info: "#0CA6E9",
          success: "#2BD4BD",
          warning: "#F4C152",
          error: "#FB6F84",
          base: "#0F1729",
         
        },
      
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#3ABFF8",
        
"secondary": "#828DF8",
        
"accent": "#F471B5",
        
"neutral": "#1D283A",
        
"base-100": "#0F1729",
        
"info": "#0CA6E9",
        
"success": "#2BD4BD",
        
"warning": "#F4C152",
        
"error": "#FB6F84",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
}