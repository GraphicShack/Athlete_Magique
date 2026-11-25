// Responsabilité : le « +1 » qui monte pis la case qui brille en même temps.

import { css, keyframes } from 'styled-components';

// Temps d'affichage d'un gain, en millisecondes (utilisé aussi par le hook).
export const DUREE_GAIN = 2200;

const monter = keyframes`
  0% {
    opacity: 0;
    transform: translateY(60%) scale(0.5);
  }
  15%, 75% {
    opacity: 1;
    transform: none;
  }
  100% {
    opacity: 0;
    transform: translateY(-60%);
  }
`;

const briller = keyframes`
  50% {
    filter: brightness(1.35);
    box-shadow: 0 0 1.5cqw 0.5cqw white;
    scale: 1.08;
  }
`;

export const gainQuiMonte = css`
  animation: ${monter} ${DUREE_GAIN}ms ease-out;
`;

// Deux fois pendant que le « +1 » monte.
export const caseQuiBrille = css`
  z-index: 1;
  animation: ${briller} ${DUREE_GAIN / 2}ms ease-in-out 2;
`;
