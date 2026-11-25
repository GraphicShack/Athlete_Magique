// Responsabilité : la disposition du panneau du bas (texte pis boutons).

import styled from 'styled-components';

// L'un sous l'autre sur cell ; sur ordi, le texte à gauche pis les boutons à droite.
export const Rangee = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(4)};

  @media ${({ theme }) => theme.medias.ordi} {
    flex-direction: row;
    align-items: center;

    & > :first-child {
      flex: 1;
    }
  }
`;

// Les boutons : l'un sous l'autre sur cell, côte à côte sur ordi.
export const Boutons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(3)};

  @media ${({ theme }) => theme.medias.ordi} {
    flex-direction: row;
  }
`;
