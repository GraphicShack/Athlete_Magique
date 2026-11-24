// Responsabilité : définir le style des blocs propres à cette page.

import styled from 'styled-components';
import { Page } from '@/components/commun/ui/MiseEnPage.js';

// Toute la page, jusqu'en bas de l'écran : c'est la zone où tombe la pluie de confettis.
export const Scene = styled(Page)`
  position: relative;
  overflow: hidden;
`;

// La phrase sous le titre.
export const SousTitre = styled.p`
  margin: ${({ theme }) => theme.espace(3)} 0 0;
  color: ${({ theme }) => theme.couleurs.texteSurPageDoux};
`;

// Les scores : au-dessus des confettis (z-index) pour rester lisibles ; le padding laisse la place au cadre rétro du panneau.
export const Scores = styled.div`
  position: relative;
  z-index: 2;
  padding: ${({ theme }) => theme.espace(4)};
`;
