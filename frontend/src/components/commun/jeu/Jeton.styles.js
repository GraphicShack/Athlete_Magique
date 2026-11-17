/*
 * Jeton.styles.js : l'apparence de Jeton (Jeton.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * Jeton.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';
import { rondCentre } from '@/styles/base/utilitaires.js';
import { sautJeton } from '@/styles/animations/sautJeton.js';

// Disque à contour blanc, puis un anneau noir (ou rouge s'il est actif).
// Avec une image : le contour prend la couleur du joueur, pour reconnaître son pion.
export const Disque = styled.span`
  ${rondCentre}
  flex-shrink: 0;
  overflow: hidden; /* l'image suit le rond */
  /* Taille proportionnelle au plateau (cqw), plafonnée pour les grands écrans */
  width: clamp(1.1rem, 5.6cqw, 2.8rem);
  height: clamp(1.1rem, 5.6cqw, 2.8rem);
  background: ${({ $couleur }) => $couleur};
  color: ${({ theme }) => theme.piste.jetonTexte};
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(0.35rem, 1.5cqw, 0.85rem);
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  border: ${({ $avecImage }) => ($avecImage ? '3px' : '2px')} solid
    ${({ theme, $couleur, $avecImage }) => ($avecImage ? $couleur : theme.piste.jetonContour)};
  box-shadow: 0 0 0 2px
    ${({ theme, $actif }) => ($actif ? theme.couleurs.accent : theme.couleurs.encre)};
  /* Tombé : couché sur le côté et un peu transparent. */
  transform: ${({ $tombe }) => ($tombe ? 'rotate(90deg) scaleX(0.7)' : 'none')};
  opacity: ${({ $tombe }) => ($tombe ? 0.75 : 1)};
  transition: transform ${({ theme }) => theme.transition};

  /* Le pion qui avance saute en arc depuis la case précédente. */
  ${({ $saute }) => $saute && sautJeton}
`;

// L'image du personnage, qui remplit le rond.
export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
