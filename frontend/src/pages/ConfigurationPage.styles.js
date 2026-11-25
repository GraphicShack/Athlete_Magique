// Responsabilité : définir le style des blocs propres à cette page.

import styled from 'styled-components';

// La colonne de droite : le code en haut, le résumé en dessous (qui prend le reste de la hauteur).
export const ColonneDroite = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(8)};
  min-width: 0;

  @media ${({ theme }) => theme.medias.ordi} {
    padding-bottom: 4rem; /* la place des boutons Règles pis Paramètres */
  }

  & > :last-child {
    flex: 1;
  }
`;
