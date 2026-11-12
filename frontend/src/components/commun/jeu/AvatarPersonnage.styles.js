/*
 * AvatarPersonnage.styles.js : l'apparence de AvatarPersonnage (AvatarPersonnage.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * AvatarPersonnage.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';
import { rondCentre } from '@/styles/base/utilitaires.js';

// Rond blanc à contour noir.
export const Rond = styled.span`
  ${rondCentre}
  flex-shrink: 0;
  width: ${({ $taille }) => $taille};
  height: ${({ $taille }) => $taille};
  border: ${({ theme }) => theme.bordures.contour};
  background: ${({ theme }) => theme.couleurs.surface};
  font-family: ${({ theme }) => theme.polices.titre};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  font-size: calc(${({ $taille }) => $taille} * 0.34); /* les initiales suivent la taille du rond */
`;
