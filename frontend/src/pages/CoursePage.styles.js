// Responsabilité : définir le style des blocs propres à cette page (disposition, espaces…).
// Utilisé dans : CoursePage

import styled, { css } from 'styled-components';

// Une colonne sur cell (la page défile) ; à partir d'un ordinateur portable, l'en-tête puis deux colonnes, le tout tenant dans la hauteur de l'écran.
export const Ecran = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    display: grid;
    height: calc(100dvh - 3rem);
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

// Une colonne : ses blocs l'un sous l'autre.
export const Colonne = styled.div`
  grid-area: ${({ $cote }) => $cote};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};
  min-width: 0;
  min-height: 0;

  @media (min-width: ${({ theme }) => theme.ecrans.lg}) {
    gap: ${({ theme }) => theme.espace(5)};
    padding-bottom: ${({ $cote }) => ($cote === 'droite' ? '4rem' : 0)};
  }
`;

// La hauteur d'un bloc dans sa colonne (sur ordinateur) : remplit : prend toute la place qui reste ; contenu : la hauteur de ce qu'il contient.
const TAILLES = {
  remplit: css`
    flex: 1 1 0;
  `,
  contenu: css`
    flex: 0 0 auto;
  `,
};

// Un bloc : la carte qu'il contient s'étire pour le remplir.
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
