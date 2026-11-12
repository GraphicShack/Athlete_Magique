/*
 * BandeauJoueurs.styles.js : l'apparence de BandeauJoueurs (BandeauJoueurs.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * BandeauJoueurs.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// Les cartes en ligne, qui défilent de côté si elles ne tiennent pas.
export const Bandeau = styled.ol`
  list-style: none;
  margin: 0;
  /* Marge intérieure : laisse la place au cadre rétro de la carte active. */
  padding: ${({ theme }) => theme.espace(3)};
  display: flex;
  gap: ${({ theme }) => theme.espace(5)};
  overflow-x: auto; /* défile de côté si les cartes ne tiennent pas */

  & > * {
    flex: 1 0 14rem; /* chaque carte fait au moins 14rem et partage la place restante */
  }
`;

// Place vide : cadre en pointillés.
export const PlaceVide = styled.li`
  padding: ${({ theme }) => theme.espace(4)};
  border: 2px dashed ${({ theme }) => theme.couleurs.texteSurPageDoux};
  border-radius: ${({ theme }) => theme.rayons.md};
  color: ${({ theme }) => theme.couleurs.texteSurPageDoux};
  font-size: ${({ theme }) => theme.texte.sm};
  text-align: center;
`;
