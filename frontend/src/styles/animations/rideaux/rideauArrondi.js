// Responsabilité : le rideau arrondi (un bord courbé balaie l'écran de gauche à droite).
// Inspiration : « Curtains: Clip wipe » de Matt Perry (Motion), https://motion.dev/examples/react-curtains-clip-wipe (refait en CSS pour le projet).

import { css } from 'styled-components';
import { COURBE } from '../animations.js';

const ARRONDI = '40vh'; // courbure du bord qui avance

// L'ancienne page s'efface, pis la nouvelle arrive 270 ms plus tard ; entre les 2, on voit la couleur du rideau.
export const rideauArrondi = css`
  @keyframes arrondi-cacher {
    from { clip-path: inset(0 0 0 0 round ${ARRONDI} 0 0 ${ARRONDI}); }
    to   { clip-path: inset(0 0 0 100% round ${ARRONDI} 0 0 ${ARRONDI}); }
  }
  @keyframes arrondi-montrer {
    from { clip-path: inset(0 100% 0 0 round 0 ${ARRONDI} ${ARRONDI} 0); }
    to   { clip-path: inset(0 0 0 0 round 0 ${ARRONDI} ${ARRONDI} 0); }
  }

  html[data-rideau='arrondi']::view-transition-old(root) {
    animation: arrondi-cacher 800ms ${COURBE} both;
  }
  html[data-rideau='arrondi']::view-transition-new(root) {
    animation: arrondi-montrer 800ms ${COURBE} 270ms both;
  }
`;
