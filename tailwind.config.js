/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './app/**/*.{js,ts,jsx,tsx,mdx}',
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "message-modal-in": {
          "0%": {
            width: "340px",
            transform: "translateX(340px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "message-fade-in": "message-modal-in 0.2s ease",
      },
    },
  },
  plugins: [],
};
