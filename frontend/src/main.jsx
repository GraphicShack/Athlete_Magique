import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import theme from './styles/theme.js';
import StyleGlobal from './styles/StyleGlobal.js';
import routeur from './routes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <StyleGlobal />
      <RouterProvider router={routeur} />
    </ThemeProvider>
  </StrictMode>
);
