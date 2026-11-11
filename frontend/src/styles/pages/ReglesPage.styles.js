/*
 * ReglesPage.styles.js : l'apparence de la page des règles (pages/ReglesPage.jsx).
 *
 * Responsabilité : définir le style des blocs propres à cette page (disposition, espaces…).
 * ReglesPage.jsx, lui, s'occupe seulement de ce qui est affiché et dans quel ordre.
 * Chaque fichier a ainsi une seule raison de changer.
 */
import styled from 'styled-components';

// La page : les blocs l'un sous l'autre.
export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};
`;

// Titre et court résumé du jeu, sur une largeur limitée pour rester lisible.
export const Introduction = styled.div`
  max-width: 48rem;

  p {
    margin: 0;
    margin-top: ${({ theme }) => theme.espace(3)};
    color: ${({ theme }) => theme.couleurs.texteSurPageDoux};
  }
`;

// Dernière case de la grille des règles : réserve la place de la mascotte, en bas à droite.
export const EmplacementMascotte = styled.div`
  margin-bottom: -1.5rem; /* compense l’espace inférieur du conteneur principal (py-4) */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    grid-column: 2;
  }
`;

// « sticky » : la mascotte reste collée au bas de l'écran tant que sa case est visible.
export const Mascotte = styled.div`
  position: sticky;
  bottom: 0;
  align-self: flex-end;
  max-width: 100%;
`;
