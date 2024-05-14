/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
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

