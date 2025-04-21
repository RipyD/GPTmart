// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@supabase/auth-ui-react/dist/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'gpt-dark-1': '#050810',
        'gpt-dark-2': '#111827',
        'gpt-input': '#0f172a' // <-- add this line
      },
    },
  },
  plugins: [],
};
