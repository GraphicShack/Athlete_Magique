// Responsabilité : définir le style de ce composant (styled-components).
// Utilisé dans : LigneScore

import styled from 'styled-components';
import { cacheSurCell } from './TableauHonneur.styles.js';

// Une rangée à fond léger, coins arrondis ; ma rangée est jaune pis encadrée en noir.
export const Ligne = styled.tr`
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: ${({ theme, $vous }) => ($vous ? theme.palette.jaune : theme.couleurs.gris100)};
  outline: ${({ theme, $vous }) => ($vous ? theme.bordures.contour : 'none')};
  outline-offset: -2px; /* le contour reste à l'intérieur de la rangée */

  & > :first-child {
    border-radius: ${({ theme }) => `${theme.rayons.sm} 0 0 ${theme.rayons.sm}`};
  }
  & > :last-child {
    border-radius: ${({ theme }) => `0 ${theme.rayons.sm} ${theme.rayons.sm} 0`};
  }
`;

// Le rang pis le score : gros chiffres italiques, comme les points d'une partie.
export const Rang = styled.td`
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: ${({ theme }) => theme.texte.lg};
  font-style: italic;
  font-weight: 900;
`;

export const Score = styled(Rang)`
  text-align: right;

  /* Sur cell, c'est la dernière case visible. */
  @media (max-width: ${({ theme }) => theme.ecrans.sm}) {
    border-radius: ${({ theme }) => `0 ${theme.rayons.sm} ${theme.rayons.sm} 0`};
  }
`;

// Le nom sur une seule ligne (« … » s'il est trop long) : toutes les rangées ont la même hauteur.
export const Joueur = styled.th`
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Le type pis la date : cachés sur cell.
export const Type = styled.td`
  ${cacheSurCell}
`;

export const DateScore = styled.td`
  ${cacheSurCell}
  color: ${({ theme }) => theme.couleurs.gris700};
  font-size: ${({ theme }) => theme.texte.sm};
  text-align: right;
  white-space: nowrap;
`;
