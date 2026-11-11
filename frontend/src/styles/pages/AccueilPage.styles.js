/*
 * AccueilPage.styles.js : l'apparence de la page d'accueil (pages/AccueilPage.jsx).
 *
 * Responsabilité : définir le style des blocs propres à cette page (disposition, espaces…).
 * AccueilPage.jsx, lui, s'occupe seulement de ce qui est affiché et dans quel ordre.
 * Chaque fichier a ainsi une seule raison de changer.
 */
import styled from 'styled-components';

// La page : l'en-tête, puis la grille, l'un sous l'autre.
export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(8)};
`;

// Sur téléphone : une colonne. Dès la taille tablette : deux colonnes, puis les personnages en dessous.
export const Grille = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(8)};

  @media (min-width: ${({ theme }) => theme.ecrans.md}) {
    display: grid;
    /* Colonne de gauche souple ; colonne de droite entre 19rem et 24rem. */
    grid-template-columns: minmax(0, 1fr) minmax(19rem, 24rem);
    grid-template-areas:
      'accroche    connexion'
      'personnages personnages';
    align-items: center;
    column-gap: ${({ theme }) => theme.espace(10)};
    row-gap: ${({ theme }) => theme.espace(8)};
  }
`;

// Chaque bloc occupe la zone de la grille dont on lui donne le nom.
export const Zone = styled.div`
  grid-area: ${({ $zone }) => $zone};
`;
