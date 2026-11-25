// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// Les joueurs côte à côte (l'un sous l'autre s'ils manquent de place).
export const Grille = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: ${({ theme }) => theme.espace(5)};
`;

// Un joueur : sa carte, pis le reste au centre en dessous.
export const Colonne = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr); /* la carte dépasse jamais sa colonne */
  min-width: 0;
  justify-items: center;
  align-content: start;
  gap: ${({ theme }) => theme.espace(5)};
  color: ${({ theme }) => theme.couleurs.texteSurPage};
`;

// La liste autour de la carte (CarteJoueur est un <li>).
export const Carte = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;
