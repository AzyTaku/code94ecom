/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#F7F7F7",
        "custom-blue": "#001EB9",
        "custom-light-gray": "#969191",
        "custom-dark": "#162427",
        "custom-white": "#FFFFFF",
      },
    },
  },
  plugins: [],
};
