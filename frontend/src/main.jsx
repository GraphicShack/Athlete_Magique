// Responsabilité : le point de départ de l'app (thème, style global pis routeur).
// Utilisé dans : point d'entrée (index.html)

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
    <ThemeProvider theme={theme}>
      <StyleGlobal />
      <RouterProvider router={routeur} />
    </ThemeProvider>
  </StrictMode>
);
