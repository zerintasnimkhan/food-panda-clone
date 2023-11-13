/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#e00965",

          secondary: "#f274aa",

          accent: "#ffffff",

          neutral: "#ffffff",

          "base-100": "#ffffff",

          info: "#ffffff",

          success: "#34eba4",

          warning: "#f2d361",

          error: "#fa5534",
        },
      },
    ],
  },
};
