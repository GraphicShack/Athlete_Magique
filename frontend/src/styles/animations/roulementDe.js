// Responsabilité : l'anim du dé qui roule pis s'arrête sur sa face.
// Utilisé dans : De.styles
// Inspiration : CodePen « 3D Dice with CSS » de jico, https://codepen.io/jico/pen/wvMpgog (code refait pour le projet).

import { css, keyframes } from 'styled-components';

// Durée d'un lancer, en millisecondes.
const DUREE_ROULEMENT = 2200;

// Partir d'un seul tour d'avance sur chaque axe (1 tour en X, 1 en Y), puis ralentir en douceur jusqu'à la face voulue : le dé culbute calmement au lieu de tourbillonner.
const rouler = keyframes`
  from {
    transform: rotateX(calc(var(--rx) + 360deg)) rotateY(calc(var(--ry) + 360deg));
  }
  to {
    transform: rotateX(var(--rx)) rotateY(var(--ry));
  }
`;

// Le style à mettre dans le cube pour le faire rouler une fois.
export const roulement = css`
  animation: ${rouler} ${DUREE_ROULEMENT}ms cubic-bezier(0.33, 1, 0.68, 1);

`;
