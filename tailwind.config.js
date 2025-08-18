/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   // ✅ covers App, TodoApp and friends
  ],
  darkMode: "class",
  theme: { extend: {} },
  plugins: [],
};
