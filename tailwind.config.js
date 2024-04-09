/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}", // Ruta para incluir todos los archivos HTML y JavaScript en cualquier ubicación
    "!./node_modules/**/*", // Excluir archivos dentro de la carpeta node_modules
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};