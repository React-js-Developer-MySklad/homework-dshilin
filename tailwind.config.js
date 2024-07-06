/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './src/**/*.{html,js,jsx,ts,tsx}',
      './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '128px'
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

