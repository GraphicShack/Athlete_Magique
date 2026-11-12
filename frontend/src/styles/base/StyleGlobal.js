/*
 * StyleGlobal.js : les règles CSS qui s'appliquent à toute l'application.
 *
 * Responsabilités :
 *   - adapter Bootstrap à la charte (variables --bs-*) : sa grille et ses utilitaires
 *     prennent les couleurs et polices du thème ;
 *   - fixer le style des titres, du focus clavier, et l'arrêt du défilement derrière une fenêtre ;
 *   - brancher le rideau de couleur entre les pages (animations/rideau.js) ;
 *   - réduire les animations si le joueur l'a demandé dans les réglages de son appareil.
 */
import { createGlobalStyle } from 'styled-components';
import { transitionsDePage } from '@/styles/animations/rideau.js';

const StyleGlobal = createGlobalStyle`
  /* Couleurs, police et arrondis de Bootstrap, remplacés par ceux du thème. */
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
    -webkit-font-smoothing: antialiased; /* texte plus net sur Mac */
  }

  /* Tous les titres utilisent la police des titres, très grasse. */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.polices.titre};
    font-weight: 800;
    letter-spacing: -0.01em;
  }

  /* Quand une fenêtre (dialog) est ouverte, la page derrière ne défile plus. */
  html:has(dialog[open]) {
    overflow: hidden;
  }

  /* Rideau coloré entre les pages (voir animations/rideau.js). */
  ${transitionsDePage}

  /* Contour jaune autour de l'élément choisi au clavier : visible sur le noir comme sur le blanc. */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.jaune};
    outline-offset: 2px;
  }

  /* Le joueur a demandé moins d'animations : elles deviennent quasi instantanées. */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
`;

export default StyleGlobal;
