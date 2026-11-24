// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';
import { cacheSurCell, Chiffre } from '@/components/commun/ui/Tableau.styles.js';

// Le score ; sur cell, c'est la dernière case visible (coins arrondis).
export const Score = styled(Chiffre)`
  @media (max-width: ${({ theme }) => theme.ecrans.sm}) {
    border-radius: ${({ theme }) => `0 ${theme.rayons.sm} ${theme.rayons.sm} 0`};
  }
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
