// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';
import Liste from '@/components/commun/ui/Liste.jsx';

// Les cartes des joueurs en grille de 2 colonnes (2 × 2 pour 4 joueurs), dans l'ordre de jeu.
export const Joueurs = styled(Liste)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(4)};
  padding: 0.625rem;
`;
