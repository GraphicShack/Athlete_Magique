import { createGlobalStyle } from 'styled-components';

/*
 * Règles globales de l'application.
 * Les variables --bs-* adaptent Bootstrap à la charte : la grille, les formulaires
 * et les utilitaires de Bootstrap prennent ainsi les couleurs et polices du thème.
 */
const StyleGlobal = createGlobalStyle`
  :root {
    --bs-body-font-family: ${({ theme }) => theme.polices.texte};
    --bs-body-color: ${({ theme }) => theme.couleurs.encre};
    --bs-body-bg: ${({ theme }) => theme.couleurs.fond};
    --bs-secondary-color: ${({ theme }) => theme.couleurs.gris700};
    --bs-tertiary-color: ${({ theme }) => theme.couleurs.gris500};
    --bs-secondary-bg: ${({ theme }) => theme.couleurs.gris100};
    --bs-tertiary-bg: ${({ theme }) => theme.couleurs.gris100};
    --bs-border-color: ${({ theme }) => theme.couleurs.gris300};
    --bs-border-radius: ${({ theme }) => theme.rayons.md};
    --bs-border-radius-sm: ${({ theme }) => theme.rayons.sm};
    --bs-border-radius-lg: ${({ theme }) => theme.rayons.lg};
    --bs-link-color: ${({ theme }) => theme.couleurs.encre};
    --bs-link-hover-color: ${({ theme }) => theme.couleurs.gris700};
    --bs-emphasis-color: ${({ theme }) => theme.couleurs.encre};
    --bs-focus-ring-color: color-mix(in srgb, ${({ theme }) => theme.couleurs.encre} 25%, transparent);
  }

  body {
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.polices.titre};
    font-weight: ${({ theme }) => theme.graisses.tresForte};
  }

  :focus-visible {
    outline: ${({ theme }) => theme.bordures.contour};
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
