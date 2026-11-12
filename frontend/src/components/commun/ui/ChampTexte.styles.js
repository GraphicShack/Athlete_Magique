/*
 * ChampTexte.styles.js : l'apparence de ChampTexte (ChampTexte.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * ChampTexte.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';
import { cacheVisuellement } from '@/styles/base/utilitaires.js';

// L'étiquette au-dessus du champ.
export const Groupe = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(1)};
`;

export const Etiquette = styled.label`
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.forte};
  ${({ $cachee }) => $cachee && cacheVisuellement}
`;

// Champ blanc à contour noir.
export const Champ = styled.input`
  padding: ${({ theme }) => theme.espace(2.5)} ${({ theme }) => theme.espace(3)};
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: ${({ theme }) => theme.couleurs.surface};
  color: ${({ theme }) => theme.couleurs.encre};
  font: inherit;

  /* Texte d'exemple, en gris. */
  &::placeholder {
    color: ${({ theme }) => theme.couleurs.gris500};
  }
`;
