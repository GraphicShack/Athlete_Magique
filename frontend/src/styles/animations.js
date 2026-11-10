import { css, keyframes } from 'styled-components';

/*
 * Animations partagées de l'application.
 *
 * Comme les couleurs dans theme.js, les animations réutilisables sont définies ici une seule fois.
 * Un composant les importe puis les utilise dans son style :
 *
 *   import { fondu, COURBE } from '../../styles/animations.js';
 *   const Bloc = styled.div` animation: ${fondu} 200ms ${COURBE}; `;
 *
 * Les animations qui n'appartiennent qu'à un composant restent dans ce composant
 * (ex. le glissement des cartes du carrousel).
 */

// Courbe de vitesse : départ rapide, arrivée tout en douceur.
export const COURBE = 'cubic-bezier(0.32, 0.72, 0, 1)';

// Apparaître en transparence.
export const fondu = keyframes`
  from {
    opacity: 0;
  }
`;

// Apparaître en montant légèrement (ex. blocs d'une liste, en cascade).
export const apparaitre = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
`;

// Arriver en tournant (ex. le bouton × de la fenêtre).
export const tourner = keyframes`
  from {
    opacity: 0;
    transform: rotate(-135deg) scale(0.6);
  }
`;

// Grandir à partir d'un petit rond de la couleur d'un bouton (variable --couleur-bouton).
export const grandir = keyframes`
  from {
    transform: scale(0.08);
    border-radius: 999px;
    background-color: var(--couleur-bouton);
  }
`;

// Inverse de « grandir » : rétrécir en un petit rond et disparaître.
export const retrecir = keyframes`
  to {
    transform: scale(0.18);
    border-radius: 999px;
    opacity: 0;
  }
`;

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
const DUREE_PAGE = 600; // ms
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
