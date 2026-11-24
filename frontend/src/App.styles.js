// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// Coin en bas à droite de l'écran, qui reste en place quand la page défile.
export const CoinFlottant = styled.div`
  position: fixed;
  right: ${({ theme }) => theme.espace(4)};
  bottom: ${({ theme }) => theme.espace(4)};
  z-index: 10;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(2)};
`;
