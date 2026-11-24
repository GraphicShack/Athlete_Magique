// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';
import { rondCentre } from '@/styles/base/utilitaires.js';

// Rang (s'il y en a un), avatar, infos pis points sur une ligne.
export const Carte = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(2.5)};
  padding: ${({ theme }) => theme.espace(2)} ${({ theme }) => theme.espace(3)};
  border: ${({ theme }) => theme.bordures.contour};
  border-left: 8px solid ${({ $couleur }) => $couleur};
  border-radius: ${({ theme }) => theme.rayons.md};
  background: ${({ theme }) => theme.couleurs.surface};
  color: ${({ theme }) => theme.couleurs.encre};
  box-shadow: ${({ theme, $actif }) => ($actif ? theme.ombres.cadre : 'none')};
`;

// Les infos prennent la place qui reste.
export const Infos = styled.div`
  flex: 1;
  min-width: 0;
`;

// Nom du joueur ; « … » s'il est trop long.
export const Nom = styled.div`
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// « Personnage · Case 12 · tombé », en petit.
export const Detail = styled.div`
  font-size: ${({ theme }) => theme.texte.xs};
  color: ${({ theme }) => theme.couleurs.gris700};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Les points, en grand, italique très gras.
export const Points = styled.div`
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: ${({ theme }) => theme.texte.md};
  font-style: italic;
  font-weight: 900;
  white-space: nowrap;
`;

// Le rang, dans un rond gris.
export const Rang = styled.span`
  ${rondCentre}
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  background: ${({ theme }) => theme.couleurs.gris300};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
`;
