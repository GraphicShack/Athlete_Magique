// Responsabilité : définir le style des blocs propres à cette page (disposition, espaces…).

import styled from 'styled-components';

// La page : l'en-tête, puis la grille, l'un sous l'autre.
export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(4)};
`;

// Sur cell : une colonne. Dès la taille tablette : deux colonnes, puis les persos en dessous.
export const Grille = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(8)};

  @media (min-width: ${({ theme }) => theme.ecrans.md}) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(19rem, 24rem);
    grid-template-areas:
      'accroche    connexion'
      'personnages personnages';
    align-items: center;
    column-gap: ${({ theme }) => theme.espace(10)};
    row-gap: ${({ theme }) => theme.espace(5)};
  }
`;

// Chaque bloc occupe la zone de la grille dont on lui donne le nom.
export const Zone = styled.div`
  grid-area: ${({ $zone }) => $zone};
`;
