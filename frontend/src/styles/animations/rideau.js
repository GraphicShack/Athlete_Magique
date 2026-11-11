/*
 * rideau.js : la transition entre deux pages, un « rideau » de couleur qui balaie l'écran.
 *
 * Responsabilité : définir cette transition. Elle est branchée dans base/StyleGlobal.js.
 */
import { css } from 'styled-components';
import { COURBE } from './animations.js';

/*
 * Transition entre les pages : un « rideau » de couleur balaie l'écran de gauche à droite.
 *
 * Le navigateur s'occupe du plus difficile (View Transitions) : au changement de page,
 * il prend une « photo » de l'ancienne page (::view-transition-old) et de la nouvelle
 * (::view-transition-new), puis nous laisse les animer en CSS :
 *   1. l'ancienne page s'efface de gauche à droite et laisse voir la couleur du rideau ;
 *   2. la nouvelle page arrive par la gauche, un peu plus tard, par-dessus le rideau.
 * Le décalage entre les deux crée la bande de couleur qui traverse l'écran.
 * Le bord qui avance est arrondi, comme un rideau qui se gonfle.
 *
 * Les liens activent cette transition avec l'option viewTransition (voir Bouton.jsx).
 * Un navigateur qui ne connaît pas les View Transitions change simplement de page.
 */
const DUREE_PAGE = 600; // ms : durée de l'animation de chaque page
const DECALAGE_RIDEAU = 200; // ms entre la sortie de l'ancienne page et l'arrivée de la nouvelle
const ARRONDI = '40vh'; // courbure du bord qui avance

export const transitionsDePage = css`
  /* L'ancienne page est « découpée » de gauche à droite jusqu'à disparaître. */
  @keyframes ancienne-page-sort {
    from {
      clip-path: inset(0 0 0 0 round ${ARRONDI} 0 0 ${ARRONDI});
    }
    to {
      clip-path: inset(0 0 0 100% round ${ARRONDI} 0 0 ${ARRONDI});
    }
  }

  /* La nouvelle page est dévoilée de gauche à droite. */
  @keyframes nouvelle-page-entre {
    from {
      clip-path: inset(0 100% 0 0 round 0 ${ARRONDI} ${ARRONDI} 0);
    }
    to {
      clip-path: inset(0 0 0 0 round 0 ${ARRONDI} ${ARRONDI} 0);
    }
  }

  /* La couleur visible entre les deux pages : c'est le rideau. */
  ::view-transition-group(root) {
    background-color: ${({ theme }) => theme.couleurs.accent};
  }

  ::view-transition-old(root) {
    animation: ancienne-page-sort ${DUREE_PAGE}ms ${COURBE} both;
  }

  ::view-transition-new(root) {
    animation: nouvelle-page-entre ${DUREE_PAGE}ms ${COURBE} ${DECALAGE_RIDEAU}ms both;
  }

  /* Le joueur a demandé moins d'animations : changement de page instantané. */
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-group(*),
    ::view-transition-old(*),
    ::view-transition-new(*) {
      animation: none !important;
    }
  }
`;
