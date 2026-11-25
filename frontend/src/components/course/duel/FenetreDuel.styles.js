// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// min-height : la place de 3 lignes, pour que la fenêtre change pas de taille.
export const Message = styled.p`
  margin: ${({ theme }) => theme.espace(5)} 0 0;
  min-height: 3lh;
  text-align: center;
  color: ${({ theme }) => theme.couleurs.texteSurPage};
`;
