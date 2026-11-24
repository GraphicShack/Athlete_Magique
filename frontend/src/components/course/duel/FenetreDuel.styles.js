// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// Les 2 adversaires côte à côte (l'un sous l'autre s'ils manquent de place).
export const Adversaires = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: ${({ theme }) => theme.espace(5)};
`;

// Un adversaire : sa carte, pis son dé au centre en dessous.
export const Adversaire = styled.div`
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.espace(5)};
  color: ${({ theme }) => theme.couleurs.texteSurPage}; /* le rond pointillé du dé */
`;

// La liste autour de la carte (CarteJoueur est un <li>).
export const Carte = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

// min-height : la place de 3 lignes, pour que la fenêtre change pas de taille.
export const Message = styled.p`
  margin: ${({ theme }) => theme.espace(5)} 0 0;
  min-height: 3lh;
  text-align: center;
  color: ${({ theme }) => theme.couleurs.texteSurPage};
`;
