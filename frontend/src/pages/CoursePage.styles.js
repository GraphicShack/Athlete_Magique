/*
 * CoursePage.styles.js : l'apparence de l'écran de course (CoursePage.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style des blocs propres à cette page (disposition, espaces…).
 * CoursePage.jsx, lui, s'occupe seulement de ce qui est affiché et dans quel ordre.
 * Chaque fichier a ainsi une seule raison de changer.
 */
import styled, { css } from 'styled-components';

// Une colonne sur téléphone (la page défile) ; à partir d'un ordinateur portable,
// l'en-tête puis deux colonnes, le tout tenant dans la hauteur de l'écran.
export const Ecran = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    display: grid;
    /* Toute la hauteur de l'écran, moins les marges du cadre de l'application (py-4 : 1,5rem en haut et en bas). */
    height: calc(100dvh - 3rem);
    /* À droite : entre 20rem et 32rem, sans dépasser 36 % de la largeur ; la piste prend le reste. */
    grid-template-columns: minmax(0, 1fr) minmax(20rem, min(32rem, 36%));
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-areas:
      'entete entete'
      'gauche droite';
    column-gap: ${({ theme }) => theme.espace(8)};
    row-gap: ${({ theme }) => theme.espace(5)};
  }
`;

export const EnTete = styled.div`
  grid-area: entete;
`;

// Une colonne : ses blocs l'un sous l'autre. Chaque colonne partage sa hauteur entre
// ses propres blocs (voir Bloc), sans dépendre de l'autre colonne.
export const Colonne = styled.div`
  grid-area: ${({ $cote }) => $cote};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};
  min-width: 0; /* la colonne peut rétrécir sous la largeur de son contenu */
  min-height: 0;

  /* À droite, en bas : laisse la place aux boutons « Règles » et « Paramètres »,
     au même endroit que sur les autres pages (en bas à droite de l'écran). */
  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    gap: ${({ theme }) => theme.espace(5)};
    padding-bottom: ${({ $cote }) => ($cote === 'droite' ? '4rem' : 0)};
  }
`;

// La hauteur d'un bloc dans sa colonne (sur ordinateur) :
//   remplit : prend toute la place qui reste ;
//   contenu : la hauteur de ce qu'il contient.
const TAILLES = {
  remplit: css`
    flex: 1 1 0;
  `,
  contenu: css`
    flex: 0 0 auto;
  `,
};

// Un bloc : la carte qu'il contient s'étire pour le remplir.
// min-height: 0 : le bloc peut être plus petit que son contenu (qui défile alors à l'intérieur).
export const Bloc = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;

  & > * {
    flex: 1;
    min-height: 0;
  }

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    ${({ $taille }) => TAILLES[$taille]}
  }
`;
