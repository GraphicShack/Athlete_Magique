/*
 * ContenuParametres.styles.js : l'apparence de ContenuParametres (ContenuParametres.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * ContenuParametres.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// Une colonne sur téléphone, deux à partir de la tablette.
// L'espace laisse la place aux liserés colorés autour des panneaux.
export const Grille = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.espace(8)};
  padding: ${({ theme }) => theme.espace(2)};

  @media (min-width: ${({ theme }) => theme.ecrans.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

// Le champ du pseudo et le choix de la langue, l'un sous l'autre.
export const ChampsCompte = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(4)};
`;

// Les deux boutons du bas, à droite.
export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.espace(3)};
  margin-top: ${({ theme }) => theme.espace(8)};
`;
