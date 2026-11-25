// Responsabilité : le fondu d'un pion téléporté (il disparaît en tournant, pis il réapparaît ailleurs).

import { css, keyframes } from 'styled-components';

// Temps pour disparaître (pis pareil pour réapparaître), en millisecondes (utilisé aussi par le hook).
export const DUREE_FONDU = 600;

// Un demi-tour pour disparaître, l'autre pour réapparaître : un tour complet en tout.
// Pourquoi « scale » pis « rotate », pas « transform » : transform sert déjà à coucher un pion tombé.
const disparaitre = keyframes`
  to {
    opacity: 0;
    scale: 0.3;
    rotate: 180deg;
  }
`;

const reapparaitre = keyframes`
  from {
    opacity: 0;
    scale: 0.3;
    rotate: -180deg;
  }
`;

// Le style à mettre dans le pion, selon le fondu : 'sortie' ou 'entree'.
export const FONDUS = {
  sortie: css`
    animation: ${disparaitre} ${DUREE_FONDU}ms ease-in forwards;
  `,
  entree: css`
    animation: ${reapparaitre} ${DUREE_FONDU}ms ease-out;
  `,
};
