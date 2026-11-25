// Responsabilité : le motif du fond qui glisse en boucle.
// Inspiration : CodePen « CSS Animated Loop Background Image » de Jeong Geum-dam, https://codepen.io/fkaus/pen/mdJVeOz (idée du motif qui glisse en boucle ; code refait).

import { css, keyframes } from 'styled-components';

// Côté d'un carreau du motif, en pixels (pour le dessin) pis en rem (pour l'écran).
export const TAILLE_MOTIF = 800;
export const COTE_MOTIF = `${TAILLE_MOTIF / 16}rem`;

// Un carreau vers la droite pis un carreau vers le haut : le motif monte en diagonale.
const glisser = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(${COTE_MOTIF}, -${COTE_MOTIF});
  }
`;

// Le style à mettre dans le calque du motif : un carreau toutes les 60 sec, à vitesse régulière.
export const defilementFond = css`
  animation: ${glisser} 60s linear infinite;
`;
