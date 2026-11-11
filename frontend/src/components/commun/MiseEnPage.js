/*
 * MiseEnPage.js : la disposition commune des pages Configuration, Sélection et Classement.
 *
 *   ┌──────────── en-tête, étapes, titre ────────────┐
 *   ├──────────────────────────────┬─────────────────┤
 *   │ panneau principal (2 parts)  │ résumé (1 part) │
 *   └──────────────────────────────┴─────────────────┘
 *
 * Responsabilité : écrire cette disposition une seule fois. Sur téléphone, tout s'empile.
 */
import styled from 'styled-components';

// La page : les blocs l'un sous l'autre. Elle remplit la hauteur de l'écran (flex: 1),
// en gardant de la place en bas pour les boutons « Règles » et « Paramètres ».
export const Page = styled.div`
  flex: 1;
  padding-bottom: ${({ theme }) => theme.espace(16)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};
`;

// Une colonne sur téléphone ; à partir de la tablette, le panneau principal (2 parts) et le résumé (1 part).
// La marge intérieure laisse la place aux liserés colorés autour des panneaux.
// flex: 1 : la grille prend toute la hauteur restante, et ses panneaux s'étirent avec elle.
export const GrilleDeuxColonnes = styled.div`
  flex: 1;
  display: grid;
  gap: ${({ theme }) => theme.espace(8)};
  padding: ${({ theme }) => theme.espace(2)};

  @media (min-width: ${({ theme }) => theme.ecrans.md}) {
    grid-template-columns: minmax(0, 2fr) minmax(16rem, 1fr);
  }
`;

// Liste « titre en gras, explication en gris » des panneaux de résumé.
export const PointsResume = styled.dl`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(4)};
  margin: 0 0 ${({ theme }) => theme.espace(6)};

  dt {
    font-family: ${({ theme }) => theme.polices.titre};
    font-size: ${({ theme }) => theme.texte.lg};
    font-weight: 800;
  }

  dd {
    margin: 0;
    font-size: ${({ theme }) => theme.texte.sm};
    color: ${({ theme }) => theme.couleurs.gris700};
  }
`;

// Boutons du bas d'un panneau de résumé : toute la largeur, poussés en bas (margin-top: auto).
export const ActionsResume = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(2)};
  margin-top: auto;

  & > * {
    width: 100%;
  }
`;
