// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// La place réservée au plateau dans le panneau.
// Pourquoi container-type: size : ça donne au plateau la taille de cette zone (unités cqw/cqh) pour qu'il fit sans dépasser.
export const ZonePlateau = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    flex: 1;
    min-height: 0;
    container-type: size;
  }
`;

// La légende, en petit sous le plateau.
export const ZoneLegende = styled.div`
  @media (min-width: ${({ theme }) => theme.ecrans.lg}) and (max-height: 700px) {
    display: none;
  }
`;
