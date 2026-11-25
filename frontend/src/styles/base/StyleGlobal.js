// Responsabilité : le CSS qui s'applique à toute l'app.

import { createGlobalStyle } from 'styled-components';
import { transitionsDePage } from '@/styles/animations/rideaux/rideaux.js';

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

  /* À la verticale (cell) : tailles normales, la page a la hauteur de l'écran. */
  :root {
    --hauteur-ecran: 100dvh;
    --marge-x: 0px;
    --marge-y: 0px;
  }

  /* À l'horizontale : 1rem suit la fenêtre, pour que le dessin (voir theme.js) rentre toujours au complet. */
  @media ${({ theme }) => theme.medias.ordi} {
    :root {
      font-size: min(100vw / ${({ theme }) => theme.dessin.largeur}, 100dvh / ${({ theme }) => theme.dessin.hauteur});
      --hauteur-ecran: ${({ theme }) => theme.dessin.hauteur}rem;
      --marge-x: calc((100vw - ${({ theme }) => theme.dessin.largeur}rem) / 2);
      --marge-y: calc((100dvh - ${({ theme }) => theme.dessin.hauteur}rem) / 2);
    }

    /* Bootstrap fait dépendre ces tailles de la largeur : ici, elles sont fixes. */
    h2 { font-size: 2rem; }
    h3 { font-size: 1.75rem; }
    h4 { font-size: 1.5rem; }
  }

  /* Le dessin est centré de haut en bas. */
  #root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100dvh;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.polices.titre};
    font-weight: 800;
    letter-spacing: -0.01em;
  }

  html:has(dialog[open]) {
    overflow: hidden;
  }

  ${transitionsDePage}

  :focus-visible {
    outline: 0.125rem solid ${({ theme }) => theme.palette.jaune};
    outline-offset: 0.125rem;
  }

  /* « Réduire les animations » (voir useAnimationsReduites.js) : tout finit tout de suite, une seule fois.
     0.01ms pis pas « none » : le dé attend la fin de son anim pour donner son résultat. */
  html[data-animations='reduites'] {
    *, *::before, *::after, *::backdrop {
      animation-duration: 0.01ms !important;
      animation-delay: 0s !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default StyleGlobal;
