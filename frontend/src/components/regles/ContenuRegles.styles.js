/*
 * ContenuRegles.styles.js : l'apparence de ContenuRegles (ContenuRegles.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * ContenuRegles.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';
import Panneau from '@/components/commun/ui/Panneau.jsx';

// Une colonne, puis deux à partir d'un ordinateur portable.
export const Grille = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.espace(6)};

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

// Panneau qui occupe toute la largeur de la grille (les personnages).
export const PanneauLarge = styled(Panneau)`
  grid-column: 1 / -1;
`;

// Autant de colonnes de 15rem que la largeur le permet.
export const GrillePersonnages = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: ${({ theme }) => theme.espace(3)};
`;

// Mise en forme du texte des règles : paragraphes, listes et définitions.
export const Contenu = styled.div`
  font-size: ${({ theme }) => theme.texte.sm};

  p,
  ul,
  ol,
  dl,
  table {
    margin: 0 0 ${({ theme }) => theme.espace(3)};
  }

  /* Pas de marge sous le dernier élément. */
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
