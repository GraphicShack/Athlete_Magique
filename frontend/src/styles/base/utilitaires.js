// Responsabilité : des bouts de CSS réutilisés (rond centré, caché visuellement…).

import { css } from 'styled-components';

// Forme ronde dont le contenu (initiales, chiffre) est centré (pastilles, jetons, avatars).
export const rondCentre = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.rayons.rond};
`;

// Cache un élément à l'écran, mais les lecteurs d'écran le lisent quand même.
export const cacheVisuellement = css`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;
