/*
 * vite.config.js : configuration de Vite, l'outil qui lance le serveur de développement
 * (npm run dev) et prépare la version finale du site (npm run build).
 * Le seul ajout est le module React, qui permet d'écrire du JSX.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
