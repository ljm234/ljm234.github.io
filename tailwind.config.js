/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/components/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/content/**/*.{js,jsx,ts,tsx,md,json}"
  ],
  theme: { extend: {} },
  plugins: [],
};
