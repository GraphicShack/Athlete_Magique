/*
 * CoursePage.styles.js : l'apparence de l'écran de course (pages/CoursePage.jsx).
 *
 * Responsabilité : définir le style des blocs propres à cette page (disposition, espaces…).
 * CoursePage.jsx, lui, s'occupe seulement de ce qui est affiché et dans quel ordre.
 * Chaque fichier a ainsi une seule raison de changer.
 */
import styled from 'styled-components';

// Une colonne sur téléphone ; à partir d'un ordinateur portable, la grille dessinée plus haut.
export const Ecran = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(18rem, 2fr); /* tour : 3 parts, journal : 2 parts */
    grid-template-areas:
      'entete  entete'
      'joueurs joueurs'
      'piste   piste'
      'tour    journal';
    column-gap: ${({ theme }) => theme.espace(8)};
    row-gap: ${({ theme }) => theme.espace(6)};
  }
`;

// Chaque bloc occupe sa zone ; la carte qu'il contient s'étire à la hauteur de la rangée
// (le tour actif et le journal finissent donc à la même hauteur).
export const Zone = styled.div`
  grid-area: ${({ $zone }) => $zone};
  display: flex;
  flex-direction: column;
  min-width: 0; /* le bloc peut rétrécir sous la largeur de son contenu */

  & > * {
    flex: 1;
  }
`;
