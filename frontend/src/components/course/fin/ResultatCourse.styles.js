// Responsabilité : définir le style de ce composant (styled-components).
// Utilisé dans : ResultatCourse

import styled from 'styled-components';
import Liste from '@/components/commun/ui/Liste.jsx';

// Les cartes l'une sous l'autre ; elles se partagent la hauteur du panneau.
// Le cadre du gagnant dépasse de 9px : le padding lui fait de la place, pis la marge négative va chercher
// cette place dans le bord du panneau.
export const Resultats = styled(Liste)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 1.4vh, 16px);
  margin: -10px;
  padding: 10px;

  & > li {
    flex: 1;
  }

  /* Sur cell, la place manque : pas d'avatar, pis les textes passent à la ligne au lieu d'être coupés. */
  @media (max-width: ${({ theme }) => theme.ecrans.sm}) {
    li > [aria-hidden] {
      display: none;
    }
    li * {
      white-space: normal;
    }
  }
`;
