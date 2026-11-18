// Responsabilité : définir le style de ce composant (styled-components).
// Utilisé dans : MascotteRegles

import styled from 'styled-components';

// Arrondie en haut seulement : elle « sort » du bas de la page.
export const Image = styled.img`
  display: block;
  width: clamp(36rem, 66vw, 54rem);
  max-width: 100%;
  height: auto;
  border-radius: ${({ theme }) => theme.rayons.md} ${({ theme }) => theme.rayons.md} 0 0;
`;
