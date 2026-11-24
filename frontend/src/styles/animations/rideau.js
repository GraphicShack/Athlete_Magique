// Responsabilité : la transition « rideau » entre 2 pages.

import { css } from 'styled-components';
import { COURBE } from './animations.js';

// Transition entre les pages : un « rideau » de couleur balaie l'écran de gauche à droite.
const DUREE_PAGE = 600; // ms : durée de l'animation de chaque page
const DECALAGE_RIDEAU = 200; // ms entre la sortie de l'ancienne page et l'arrivée de la nouvelle
const ARRONDI = '40vh'; // courbure du bord qui avance

export const transitionsDePage = css`
  @keyframes ancienne-page-sort {
    from {
      clip-path: inset(0 0 0 0 round ${ARRONDI} 0 0 ${ARRONDI});
    }
    to {
      clip-path: inset(0 0 0 100% round ${ARRONDI} 0 0 ${ARRONDI});
    }
  }

  @keyframes nouvelle-page-entre {
    from {
      clip-path: inset(0 100% 0 0 round 0 ${ARRONDI} ${ARRONDI} 0);
    }
    to {
      clip-path: inset(0 0 0 0 round 0 ${ARRONDI} ${ARRONDI} 0);
    }
  }

  ::view-transition-group(root) {
    background-color: ${({ theme }) => theme.couleurs.accent};
  }

  ::view-transition-old(root) {
    animation: ancienne-page-sort ${DUREE_PAGE}ms ${COURBE} both;
  }

  ::view-transition-new(root) {
    animation: nouvelle-page-entre ${DUREE_PAGE}ms ${COURBE} ${DECALAGE_RIDEAU}ms both;
  }

  @media (prefers-reduced-motion: reduce) {
    ::view-transition-group(*),
    ::view-transition-old(*),
    ::view-transition-new(*) {
      animation: none !important;
    }
  }
`;
