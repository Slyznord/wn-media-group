// tailwindcss configuration
module.exports = {
  purge: [
    './src/**/*.vue',
    './src/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      outline: ['responsive', 'focus-within', 'focus-visible', 'focus'],
      margin: ['last'],
      borderWidth: ['last']
    }
  },
  plugins: []
}
