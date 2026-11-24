// Responsabilité : définir le style de ce composant (styled-components).
// Utilisé dans : ContenuRegles

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

// Panneau qui occupe toute la largeur de la grille (les persos).
export const PanneauLarge = styled(Panneau)`
  grid-column: 1 / -1;
`;

// Autant de colonnes de 15rem que la largeur le permet.
export const GrillePersonnages = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: ${({ theme }) => theme.espace(3)};
`;
