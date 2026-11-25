// Responsabilité : définir le style de ce composant (styled-components).

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
  width: 0.5rem;
  height: ${({ $rond }) => ($rond ? '0.5rem' : '0.875rem')};
  border: 1px solid ${({ theme }) => theme.couleurs.encre};
  border-radius: ${({ $rond, theme }) => ($rond ? theme.rayons.rond : '0.125rem')};
`;

// Un morceau qui explose : posé au centre du calque, puis lancé par l'animation « explosion ».
export const Morceau = styled.span`
  ${formeConfetti}
  top: 50%;
  left: 50%;
  margin: ${({ $rond }) => ($rond ? '-0.25rem 0 0 -0.25rem' : '-0.4375rem 0 0 -0.25rem')};
  ${explosion}
`;
