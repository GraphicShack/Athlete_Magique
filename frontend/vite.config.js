/*
 * vite.config.js : configuration de Vite, l'outil qui lance le serveur de développement
 * (npm run dev) et prépare la version finale du site (npm run build).
 *
 * Deux réglages :
 *   - le module React, qui permet d'écrire du JSX ;
 *   - le raccourci « @/ », qui veut dire « le dossier src/ ». Au lieu d'écrire
 *     '../../../styles/base/theme.js', on écrit '@/styles/base/theme.js',
 *     et l'import reste juste même si le fichier change de dossier.
 */
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
