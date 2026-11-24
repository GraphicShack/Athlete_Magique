// Responsabilité : le texte dans un panneau (petite taille, bons espaces entre paragraphes, listes pis tableaux).
// Utilisé dans : ClassementGeneral.styles, ContenuRegles, PartieTerminee, ProchaineCourse

import styled from 'styled-components';

const ContenuPanneau = styled.div`
  font-size: ${({ theme }) => theme.texte.sm};

  p,
  ul,
  ol,
  dl,
  table {
    margin: 0 0 ${({ theme }) => theme.espace(3)};
  }

  > :last-child {
    margin-bottom: 0;
  }

  ul,
  ol {
    padding-left: ${({ theme }) => theme.espace(5)};
  }

  li + li {
    margin-top: ${({ theme }) => theme.espace(1.5)};
  }

  dt {
    font-weight: ${({ theme }) => theme.graisses.forte};
  }

  dd {
    margin: 0 0 ${({ theme }) => theme.espace(2)};
    color: ${({ theme }) => theme.couleurs.gris700};
  }
`;

export default ContenuPanneau;
