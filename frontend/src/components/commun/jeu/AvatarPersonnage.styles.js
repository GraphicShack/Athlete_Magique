// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';
import { rondCentre } from '@/styles/base/utilitaires.js';

// Rond blanc à contour noir.
export const Rond = styled.span`
  ${rondCentre}
  flex-shrink: 0;
  overflow: hidden;
  width: ${({ $taille }) => $taille};
  height: ${({ $taille }) => $taille};
  border: ${({ theme }) => theme.bordures.contour};
  background: ${({ theme }) => theme.couleurs.surface};
  font-family: ${({ theme }) => theme.polices.titre};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  font-size: calc(${({ $taille }) => $taille} * 0.34);
`;

// L'image du perso, qui remplit le rond.
export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
