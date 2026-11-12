/*
 * LigneJoueur.styles.js : l'apparence de LigneJoueur (LigneJoueur.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * LigneJoueur.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';
import { rondCentre } from '@/styles/base/utilitaires.js';

// Carte blanche sur une ligne, avec une bande épaisse à gauche à la couleur du pion
// (comme CarteJoueur en course). Les éléments passent à la ligne s'ils manquent de place.
export const Carte = styled.li`
  flex: 1; /* les lignes se partagent la hauteur de la liste… */
  max-height: 7rem; /* … sans devenir trop hautes */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(4)};
  padding: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(4)};
  border: ${({ theme }) => theme.bordures.contour};
  border-left: 10px solid ${({ $couleur }) => $couleur};
  border-radius: ${({ theme }) => theme.rayons.md};
  background: ${({ theme }) => theme.couleurs.surface};
`;

// La pastille et « Joueur N », côte à côte.
export const NomJoueur = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(2)};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  white-space: nowrap;
`;

// Le champ prend toute la place libre au milieu (au moins 10rem).
export const Pseudo = styled.div`
  flex: 1 1 10rem;
`;

// Rond numéroté, à la couleur du pion.
export const Pastille = styled.span`
  ${rondCentre}
  width: 2rem;
  height: 2rem;
  border: ${({ theme }) => theme.bordures.contour};
  background: ${({ $couleur }) => $couleur};
  font-family: ${({ theme }) => theme.polices.titre};
`;
