// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// Une colonne sur cell, deux à partir de la tablette.
export const Grille = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.espace(8)};
  padding: ${({ theme }) => theme.espace(2)};

  @media ${({ theme }) => theme.medias.tablette} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

// Les deux boutons du bas, à droite.
export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.espace(3)};
  margin-top: ${({ theme }) => theme.espace(8)};
`;
