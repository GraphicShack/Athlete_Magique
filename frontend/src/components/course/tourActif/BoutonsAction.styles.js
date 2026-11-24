// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// Les boutons d'action, en colonnes d'au moins 8rem.
// Pourquoi --hauteur-bouton : chaque bouton (pis la rangée vide) a la hauteur d'un bouton de 2 lignes, pour pas que le panneau bouge.
export const Actions = styled.div`
  --hauteur-bouton: calc(2lh + 2 * ${({ theme }) => theme.espace(3)} + 4px);
  min-height: var(--hauteur-bouton);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: ${({ theme }) => theme.espace(2)};
  margin-top: ${({ theme }) => theme.espace(3)};

  & > button {
    min-height: var(--hauteur-bouton);
  }
`;
