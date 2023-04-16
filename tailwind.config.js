/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addComponents, theme }) {
      addComponents({
        "[type='checkbox']":
        {
          borderColor: "#757575",
          borderWidth: "2px",
          borderStyle: "solid",
          borderRadius: "2px",
          width: '20px',
          height: '20px',
          color: "#e3165b",
          '&:focus': {
            '--tw-ring-color': 0,
          },
        },
      });
    }),
  ],
}

