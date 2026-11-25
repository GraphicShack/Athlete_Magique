// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';
import Liste from '@/components/commun/ui/Liste.jsx';

// Les cartes l'une sous l'autre ; elles se partagent la hauteur du panneau.
// Le cadre du gagnant dépasse de 9px : le padding lui fait de la place, pis la marge négative va chercher
// cette place dans le bord du panneau.
export const Resultats = styled(Liste)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin: -0.625rem;
  padding: 0.625rem;

  & > li {
    flex: 1;
  }

  /* Sur cell, la place manque : pas d'avatar, pis les textes passent à la ligne au lieu d'être coupés. */
  @media ${({ theme }) => theme.medias.cell} {
    li > [aria-hidden] {
      display: none;
    }
    li * {
      white-space: normal;
    }
  }
`;
