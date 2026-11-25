// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// Carte au contour pointillé : la place est libre.
export const Carte = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.espace(3)};
  min-height: 4rem;
  padding: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(4)};
  border: 0.125rem dashed ${({ theme }) => theme.couleurs.gris500};
  border-radius: ${({ theme }) => theme.rayons.md};
  background: ${({ theme }) => theme.couleurs.gris100};
`;

export const Texte = styled.span`
  font-style: italic;
  color: ${({ theme }) => theme.couleurs.gris700};
`;
