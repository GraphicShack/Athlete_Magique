/*
 * BoutonsAction.styles.js : l'apparence de BoutonsAction (BoutonsAction.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 */
import styled from 'styled-components';

// Les boutons d'action, en colonnes d'au moins 8rem.
// Hauteur fixe : celle d'un bouton de 2 lignes (2 lignes de texte + marges intérieures + contour),
// même s'il n'y a qu'une ligne ou aucun bouton. Ainsi, le panneau ne bouge pas d'une phase à l'autre.
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
