/*
 * TableauPointage.styles.js : l'apparence de TableauPointage (TableauPointage.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * TableauPointage.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// Tableau sur toute la largeur, lignes séparées par un trait fin.
export const Tableau = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.texte.sm};

  th,
  td {
    padding: ${({ theme }) => theme.espace(2)} ${({ theme }) => theme.espace(3)};
    text-align: left;
    border-bottom: ${({ theme }) => theme.bordures.fine};
  }

  thead th {
    color: ${({ theme }) => theme.couleurs.gris700};
    font-weight: ${({ theme }) => theme.graisses.forte};
  }

  tbody th {
    font-weight: ${({ theme }) => theme.graisses.forte};
  }
`;
