// Responsabilité : définir le style de ce composant (styled-components).
// Utilisé dans : ClassementGeneral

import styled from 'styled-components';
import ContenuPanneau from '@/components/commun/ui/ContenuPanneau.js';
import { cacheSurCell, Tableau } from '@/components/commun/ui/Tableau.styles.js';

// « Magicien · 1 victoire », sous le nom.
export const Detail = styled.div`
  font-size: ${({ theme }) => theme.texte.xs};
  font-weight: ${({ theme }) => theme.graisses.normale};
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Les points de la course pis des étoiles : cachés sur cell.
export const Points = styled.td`
  ${cacheSurCell}
  text-align: right;
`;

// Le contenu prend toute la hauteur du panneau.
export const Contenu = styled(ContenuPanneau)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Les rangées se partagent la hauteur qui reste ; celle des titres reste petite.
export const TableauPlein = styled(Tableau)`
  flex: 1;

  th,
  td {
    padding-block: ${({ theme }) => theme.espace(1)};
  }
  thead {
    height: 1px;
  }
`;

// L'explication des égalités ; cachée sur un ordi à petit écran (la place manque).
export const Explication = styled.p`
  font-size: ${({ theme }) => theme.texte.xs};

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) and (max-height: 780px) {
    display: none;
  }
`;
