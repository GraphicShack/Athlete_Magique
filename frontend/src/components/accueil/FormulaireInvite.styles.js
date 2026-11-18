// Responsabilité : définir le style de ce composant (styled-components).
// Utilisé dans : FormulaireInvite

import styled from 'styled-components';

// Les éléments l'un sous l'autre.
export const Bloc = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(2)};
`;

// « Jouer en invité »
export const SousTitre = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.md};
`;

// Petite phrase d'explication sous le champ.
export const Aide = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.texte.xs};
  color: ${({ theme }) => theme.couleurs.gris700};
`;
