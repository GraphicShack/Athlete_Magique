// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';
import { gainQuiMonte } from '@/styles/animations/gain.js';

// Les gains l'un sur l'autre ; on clique à travers.
export const Pile = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  pointer-events: none;
`;

// Gros chiffre jaune à contour noir.
// Pourquoi paint-order : le contour est dessiné en dessous, sinon il mange le chiffre.
export const Gain = styled.span`
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: 2.25rem;
  font-style: italic;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.palette.jaune};
  -webkit-text-stroke: 0.4375rem ${({ theme }) => theme.couleurs.encre};
  paint-order: stroke fill;
  ${gainQuiMonte}
`;
