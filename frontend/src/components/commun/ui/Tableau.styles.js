// Responsabilité : le style commun des tableaux à rangées (tableau d'honneur, classement général).
// Utilisé dans : ClassementGeneral, ClassementGeneral.styles, LigneScore, LigneScore.styles, TableauHonneur

import styled, { css } from 'styled-components';

// Pour une colonne cachée sur cell (la place manque).
export const cacheSurCell = css`
  @media (max-width: ${({ theme }) => theme.ecrans.sm}) {
    display: none;
  }
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

// Une rangée à fond léger, coins arrondis ; $enEvidence : jaune pis encadrée en noir.
export const Ligne = styled.tr`
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: ${({ theme, $enEvidence }) => ($enEvidence ? theme.palette.jaune : theme.couleurs.gris100)};
  outline: ${({ theme, $enEvidence }) => ($enEvidence ? theme.bordures.contour : 'none')};
  outline-offset: -2px; /* le contour reste à l'intérieur de la rangée */

  & > :first-child {
    border-radius: ${({ theme }) => `${theme.rayons.sm} 0 0 ${theme.rayons.sm}`};
  }
  & > :last-child {
    border-radius: ${({ theme }) => `0 ${theme.rayons.sm} ${theme.rayons.sm} 0`};
  }
`;

// Un gros chiffre italique (rang, score, total). $droite : aligné à droite.
export const Chiffre = styled.td`
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: ${({ theme }) => theme.texte.lg};
  font-style: italic;
  font-weight: 900;
  text-align: ${({ $droite }) => ($droite ? 'right' : 'left')};
`;

// Le nom sur une seule ligne (« … » s'il est trop long) : toutes les rangées ont la même hauteur.
export const Joueur = styled.th`
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
