import { createGlobalStyle } from 'styled-components';
import { transitionsDePage } from './animations.js';

/*
 * Règles globales de l'application.
 * Les variables --bs-* adaptent Bootstrap à la charte : la grille, les formulaires
 * et les utilitaires de Bootstrap prennent ainsi les couleurs et polices du thème.
 */
const StyleGlobal = createGlobalStyle`
  :root {
    --bs-body-font-family: ${({ theme }) => theme.polices.texte};
    --bs-body-color: ${({ theme }) => theme.couleurs.texteSurPage};
    --bs-body-bg: ${({ theme }) => theme.couleurs.page};
    --bs-secondary-color: ${({ theme }) => theme.couleurs.gris700};
    --bs-tertiary-color: ${({ theme }) => theme.couleurs.gris500};
    --bs-secondary-bg: ${({ theme }) => theme.couleurs.gris100};
    --bs-tertiary-bg: ${({ theme }) => theme.couleurs.gris100};
    --bs-border-color: ${({ theme }) => theme.couleurs.gris300};
    --bs-border-radius: ${({ theme }) => theme.rayons.md};
    --bs-border-radius-sm: ${({ theme }) => theme.rayons.sm};
    --bs-border-radius-lg: ${({ theme }) => theme.rayons.lg};
    --bs-link-color: ${({ theme }) => theme.couleurs.texteSurPage};
    --bs-link-hover-color: ${({ theme }) => theme.couleurs.texteSurPageDoux};
    --bs-emphasis-color: ${({ theme }) => theme.couleurs.encre};
    --bs-focus-ring-color: color-mix(in srgb, ${({ theme }) => theme.couleurs.encre} 25%, transparent);
  }

  body {
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.polices.titre};
    font-weight: 800;
    letter-spacing: -0.01em;
  }

  /* Quand une fenêtre (dialog) est ouverte, la page derrière ne défile plus. */
  html:has(dialog[open]) {
    overflow: hidden;
  }

  /* Rideau coloré entre les pages (voir animations.js). */
  ${transitionsDePage}

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.jaune}; /* visible sur le noir comme sur le blanc */
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
`;

export default StyleGlobal;
