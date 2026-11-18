// Responsabilité : définir le style de ce composant (styled-components).
// Utilisé dans : PanneauConnexion

import styled from 'styled-components';

// Trait horizontal avec le mot « ou » au milieu.
export const Separateur = styled.p`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)};
  margin: ${({ theme }) => theme.espace(3)} 0;
  color: ${({ theme }) => theme.couleurs.gris700};
  font-size: ${({ theme }) => theme.texte.sm};

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top: ${({ theme }) => theme.bordures.fine};
  }
`;
