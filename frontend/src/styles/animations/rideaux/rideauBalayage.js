// Responsabilité : le rideau balayage (un bord droit balaie l'écran de bas en haut).
// Inspiration : « Curtains: Wipe » de Matt Perry (Motion), https://motion.dev/examples/react-curtains-wipe (idée seulement, refaite en CSS pour le projet).

import { css } from 'styled-components';
import { COURBE } from '../animations.js';

// inset(haut droite bas gauche) : combien on coupe de chaque côté.
export const rideauBalayage = css`
  @keyframes balayage-cacher {
    from { clip-path: inset(0 0 0 0); }
    to   { clip-path: inset(0 0 100% 0); }
  }
  @keyframes balayage-montrer {
    from { clip-path: inset(100% 0 0 0); }
    to   { clip-path: inset(0 0 0 0); }
  }

  html[data-rideau='balayage']::view-transition-old(root) {
    animation: balayage-cacher 800ms ${COURBE} both;
  }
  html[data-rideau='balayage']::view-transition-new(root) {
    animation: balayage-montrer 800ms ${COURBE} 330ms both;
  }
`;
