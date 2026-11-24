// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// Tout est centré. min-height : la hauteur du contenu de ControleurDeTourActif, pour que le panneau
// garde la même taille quand c'est le tour d'un autre (plus bas sur tablette, où il est en 2 colonnes).
export const Contenu = styled.div`
  flex: 1;
  min-height: 329px;

  @media (min-width: ${({ theme }) => theme.ecrans.md}) and (max-width: 991px) {
    min-height: 193px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.espace(4)};
  text-align: center;

  p {
    margin: 0;
  }
`;

export const Titre = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.xl};
  font-style: italic;
  font-weight: 900;
`;
