// Responsabilité : la disposition commune des pages (2 colonnes, tout s'empile sur cell).
// Utilisé dans : ClassementPage.styles, ConfigurationPage, FinCoursePage

import styled from 'styled-components';

// La page : les blocs l'un sous l'autre.
export const Page = styled.div`
  flex: 1;
  padding-bottom: ${({ theme }) => theme.espace(16)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};
`;

// Une colonne sur cell ; à partir de la tablette, le panneau principal (2 parts) pis la colonne de droite (1 part).
export const GrilleDeuxColonnes = styled.div`
  flex: 1;
  display: grid;
  gap: ${({ theme }) => theme.espace(8)};
  padding: ${({ theme }) => theme.espace(2)};

  @media (min-width: ${({ theme }) => theme.ecrans.md}) {
    grid-template-columns: minmax(0, 2fr) minmax(16rem, 1fr);
  }
`;
