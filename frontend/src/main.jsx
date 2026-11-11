/*
 * main.jsx : point de départ de l'application.
 *
 * Responsabilités :
 *   - charger le CSS de Bootstrap (grille et utilitaires) ;
 *   - fournir le thème (styles/base/theme.js) à tous les composants avec ThemeProvider ;
 *   - appliquer les styles globaux (styles/base/StyleGlobal.js) ;
 *   - démarrer le routeur, qui affiche la bonne page selon l'adresse (routes.jsx).
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import theme from './styles/base/theme.js';
import StyleGlobal from './styles/base/StyleGlobal.js';
import routeur from './routes.jsx';

// React prend le contrôle de <div id="root"> dans index.html.
createRoot(document.getElementById('root')).render(
  // StrictMode : en développement, React signale les erreurs courantes.
  <StrictMode>
    {/* Chaque composant styled peut lire le thème avec ({ theme }) => theme.couleurs… */}
    <ThemeProvider theme={theme}>
      <StyleGlobal />
      <RouterProvider router={routeur} />
    </ThemeProvider>
  </StrictMode>
);
