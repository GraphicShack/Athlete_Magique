// Responsabilité : le rideau à volets (des colonnes se ferment pis se rouvrent, une sur deux par le haut, l'autre par le bas).
// Inspiration : « Curtains: Shutter » de Matt Perry (Motion), https://motion.dev/examples/react-curtains-shutter (idée seulement, refaite en CSS pour le projet).

import { css } from 'styled-components';
import { COURBE } from '../animations.js';
import { masqueColonnes, tailleColonnes } from './colonnes.js';

// 12 colonnes : une sur deux collée en haut, les autres en bas.
const BORDS = Array.from({ length: 12 }, (_, rang) => (rang % 2 === 0 ? '0%' : '100%'));
const VISIBLES = tailleColonnes(BORDS.map(() => 100));
const CACHEES = tailleColonnes(BORDS.map(() => 0));

export const rideauVolets = css`
  @keyframes volets-cacher {
    from { ${VISIBLES} }
    to   { ${CACHEES} }
  }
  @keyframes volets-montrer {
    from { ${CACHEES} }
    to   { ${VISIBLES} }
  }

  html[data-rideau='volets']::view-transition-old(root) {
    ${masqueColonnes(BORDS)}
    animation: volets-cacher 600ms ${COURBE} both;
  }
  html[data-rideau='volets']::view-transition-new(root) {
    ${masqueColonnes(BORDS)}
    animation: volets-montrer 650ms ${COURBE} 470ms both;
  }
`;
