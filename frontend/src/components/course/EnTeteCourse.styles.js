// Responsabilité : définir le style de ce composant (styled-components).
// Utilisé dans : EnTeteCourse

import styled from 'styled-components';

// L'en-tête de la course (le fil des étapes y est inclus, à droite).
export const Bloc = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};
`;
