// Responsabilité : définir le style de ce composant (styled-components).
// Utilisé dans : Confettis, PluieConfettis, PluieConfettis.styles

import styled, { css } from 'styled-components';
import { explosion } from '@/styles/animations/confettis.js';

// Calque transparent posé sur tout le parent. pointer-events: none : les clics passent au travers.
export const Zone = styled.span`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
`;

// Forme d'un morceau : petit rectangle, ou rond un morceau sur trois ($rond), avec un contour noir comme le reste du jeu.
export const formeConfetti = css`
  position: absolute;
  width: 8px;
  height: ${({ $rond }) => ($rond ? '8px' : '14px')};
  border: 1px solid ${({ theme }) => theme.couleurs.encre};
  border-radius: ${({ $rond, theme }) => ($rond ? theme.rayons.rond : '2px')};
`;

// Un morceau qui explose : posé au centre du calque, puis lancé par l'animation « explosion ».
export const Morceau = styled.span`
  ${formeConfetti}
  top: 50%;
  left: 50%;
  margin: ${({ $rond }) => ($rond ? '-4px 0 0 -4px' : '-7px 0 0 -4px')};
  ${explosion}
`;
