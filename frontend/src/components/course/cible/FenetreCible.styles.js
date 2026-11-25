// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// La question, au-dessus des cartes.
export const Consigne = styled.p`
  margin: 0 0 ${({ theme }) => theme.espace(5)};
  text-align: center;
  color: ${({ theme }) => theme.couleurs.texteSurPage};
`;
