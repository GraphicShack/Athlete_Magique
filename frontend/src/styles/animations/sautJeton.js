// Responsabilité : le saut en arc d'un pion d'une case à l'autre.

import { css, keyframes } from 'styled-components';

// Temps d'un saut d'une case à l'autre, en millisecondes (utilisé aussi par le hook).
export const DUREE_PAS = 300;

// Décalage pour une fraction « f » du chemin qui reste (1 = case précédente, 0 = arrivé), pis hauteur de l'arc « h » à ce moment.
const decalage = (f, h) =>
  `calc(var(--dx) * ${12.2 * f}cqw) calc(var(--dy) * ${11.8 * f}cqw - ${h}cqw)`;

// L'arc : on avance tout droit vers la case, pis on monte puis redescend (hauteur max : 4cqw).
// Pourquoi « translate » pis pas « transform » : transform sert déjà à coucher un pion tombé, les 2 se pileraient dessus.
const sauter = keyframes`
  0%   { translate: ${decalage(1, 0)}; }
  25%  { translate: ${decalage(0.75, 3)}; }
  50%  { translate: ${decalage(0.5, 4)}; }
  75%  { translate: ${decalage(0.25, 3)}; }
  100% { translate: 0 0; }
`;

// Le style à mettre dans le pion qui saute.
export const sautJeton = css`
  position: relative;
  z-index: 1;
  animation: ${sauter} ${DUREE_PAS}ms linear;
`;
