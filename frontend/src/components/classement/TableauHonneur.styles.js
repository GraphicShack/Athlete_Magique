// Responsabilité : définir le style de ce composant (styled-components).
// Utilisé dans : LigneScore.styles, TableauHonneur

import styled, { css } from 'styled-components';

// Pour une colonne cachée sur cell (la place manque).
export const cacheSurCell = css`
  @media (max-width: ${({ theme }) => theme.ecrans.sm}) {
    display: none;
  }
`;

// Le filtre : choix coché en jaune, pour ressortir sur le bandeau orange du panneau.
export const Filtre = styled.span`
  --teinte: ${({ theme }) => theme.palette.jaune};
`;

// La zone du tableau (ou du message) : toujours la même hauteur, celle de 8 scores.
// S'il y en a plus, elle défile à l'intérieur ; scrollbar-gutter garde la place de la barre de défilement.
export const Zone = styled.div`
  height: 31rem;
  overflow-y: auto;
  scrollbar-gutter: stable;
`;

// Tableau sur toute la largeur, rangées séparées par un petit espace.
// table-layout: fixed : la largeur des colonnes ne dépend pas de leur contenu.
export const Tableau = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0 ${({ theme }) => theme.espace(1.5)};

  th,
  td {
    padding: ${({ theme }) => theme.espace(2)};
  }
`;

// Le titre d'une colonne ; il reste visible quand la zone défile.
// $largeur (sans largeur = prend le reste), $droite (aligné à droite), $cacheSurCell.
export const Titre = styled.th`
  position: sticky;
  top: 0;
  width: ${({ $largeur }) => $largeur};
  background: ${({ theme }) => theme.couleurs.surface};
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.forte};
  text-align: ${({ $droite }) => ($droite ? 'right' : 'left')};
  ${({ $cacheSurCell }) => $cacheSurCell && cacheSurCell}
`;
