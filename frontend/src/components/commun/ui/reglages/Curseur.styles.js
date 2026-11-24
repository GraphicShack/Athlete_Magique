// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// Le curseur, au plus 12rem de large.
export const Glissiere = styled.input`
  width: min(12rem, 100%);
  accent-color: ${({ theme }) => theme.couleurs.encre};
  cursor: pointer;
`;
