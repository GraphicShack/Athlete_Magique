// Responsabilité : la disposition commune des pages (2 colonnes, tout s'empile sur cell).

import styled from 'styled-components';

// La page : les blocs l'un sous l'autre. Sur ordi, elle a la hauteur du dessin (moins les marges du cadre, 3rem).
export const Page = styled.div`
  flex: 1;
  padding-bottom: ${({ theme }) => theme.espace(16)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};

  @media ${({ theme }) => theme.medias.ordi} {
    gap: ${({ theme }) => theme.espace(4)};
    min-height: calc(var(--hauteur-ecran) - 3rem);
    padding-bottom: 0;
  }
`;

// Une colonne sur cell ; à partir de la tablette, le panneau principal (2 parts) pis la colonne de droite (1 part).
export const GrilleDeuxColonnes = styled.div`
  flex: 1;
  display: grid;
  gap: ${({ theme }) => theme.espace(8)};
  padding: ${({ theme }) => theme.espace(2)};

  @media ${({ theme }) => theme.medias.tablette} {
    grid-template-columns: minmax(0, 2fr) minmax(16rem, 1fr);
  }
`;
