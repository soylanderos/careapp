module.exports = {
  "env": {
      "browser": true, // Indica que el código se ejecutará en un entorno de navegador
      "es2021": true, // Permite el uso de características de ECMAScript 2021
      "node": true // Indica que se pueden usar características específicas de Node.js
  },
  "extends": "standard-with-typescript", // Extiende la configuración estándar con soporte para TypeScript
  "overrides": [
      {
          "env": {
              "node": true // Configuración específica para archivos de configuración ESLint
          },
          "files": [
              ".eslintrc.{js,cjs}" // Archivos a los que aplica esta configuración
          ],
          "parserOptions": {
              "sourceType": "script" // Permite el análisis de archivos como scripts
          }
      }
  ],
  "parserOptions": {
      "ecmaVersion": "latest", // Permite el uso de las últimas características de ECMAScript
      "sourceType": "module" // Indica que el código se analizará como un módulo
  },
  "rules": {
    "semi": ["error", "always"], // Requiere punto y coma al final de cada declaración
    "quotes": ["error", "single"], // Requiere comillas simples para cadenas
    "indent": ["error", 4], // Define la indentación a 4 espacios
    "no-unused-vars": "error", // Advierte sobre variables declaradas pero no utilizadas
    "no-console": "warn", // Advierte sobre el uso de console.log y similares
    "no-undef": "error", // Advierte sobre variables no definidas
    "prefer-const": "error", // Favorece el uso de const en lugar de let cuando sea posible
    "comma-dangle": ["error", "only-multiline"], // Requiere coma al final de la última propiedad en objetos de varias líneas
    "arrow-body-style": ["error", "as-needed"], // Sugiere el uso de expresiones de función de flecha más concisas
    "arrow-spacing": "error", // Requiere espacios alrededor de las flechas de función
    "object-shorthand": "error", // Sugiere el uso de métodos de abreviación de propiedades en objetos
    "prefer-arrow-callback": "error", // Sugiere el uso de funciones de flecha para devolver valores de función
    "no-extra-semi": "error", // Advierte sobre puntos y comas innecesarios
    "no-trailing-spaces": "error", // Advierte sobre espacios en blanco innecesarios al final de las líneas
    "space-before-function-paren": "error", // Requiere un espacio antes del paréntesis de apertura de una función
    "no-multiple-empty-lines": ["error", { "max": 1 }] // Advierte sobre múltiples líneas vacías consecutivas
}
}
