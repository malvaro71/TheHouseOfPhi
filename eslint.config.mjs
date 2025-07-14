// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"], // Aplica esta configuración a estos tipos de archivos JS
        
        plugins: { js }, // Incluye el plugin base de ESLint
        
        extends: ["js/recommended"], // Extiende las reglas recomendadas de ESLint

        languageOptions: {
            // Configura el parser para que entienda la sintaxis de módulos ES6
            sourceType: "module",

            // Define las variables globales que tu código usa (ej. las del navegador, o 'math')
            globals: {
                ...globals.browser, // Añade todas las variables globales del navegador (window, document, etc.)
                math: "readonly",   // Añade 'math' como global de solo lectura si la cargas vía <script>
                MathJax: "readonly", // Añade 'MathJax' como global de solo lectura si la cargas vía <script>
            },
        },
    },
]);