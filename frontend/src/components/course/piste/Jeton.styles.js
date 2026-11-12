/*
 * Jeton.styles.js : l'apparence de Jeton (Jeton.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * Jeton.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';
import { rondCentre } from '@/styles/base/utilitaires.js';

// Disque à contour blanc, puis un anneau noir (ou rouge s'il est actif).
export const Disque = styled.span`
  ${rondCentre}
  /* Taille proportionnelle au plateau (cqw), plafonnée pour les grands écrans */
  width: clamp(0.75rem, 3.4cqw, 1.9rem);
  height: clamp(0.75rem, 3.4cqw, 1.9rem);
  background: ${({ $couleur }) => $couleur};
  color: ${({ theme }) => theme.piste.jetonTexte};
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(0.3rem, 1.1cqw, 0.75rem);
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  border: 2px solid ${({ theme }) => theme.piste.jetonContour};
  box-shadow: 0 0 0 2px
    ${({ theme, $actif }) => ($actif ? theme.couleurs.accent : theme.couleurs.encre)};
  /* Tombé : couché sur le côté et un peu transparent. */
  transform: ${({ $tombe }) => ($tombe ? 'rotate(90deg) scaleX(0.7)' : 'none')};
  opacity: ${({ $tombe }) => ($tombe ? 0.75 : 1)};
  transition: transform ${({ theme }) => theme.transition};
`;
