// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';
import { rondCentre } from '@/styles/base/utilitaires.js';
import { sautJeton } from '@/styles/animations/sautJeton.js';
import { FONDUS } from '@/styles/animations/teleportation.js';

// Disque à contour blanc, puis un anneau noir (ou rouge s'il est actif).
// Pourquoi 5.6cqw : le pion suit la largeur du plateau (cqw), avec un min pis un max (clamp) pour rester lisible.
export const Disque = styled.span`
  ${rondCentre}
  flex-shrink: 0;
  overflow: hidden;
  width: clamp(1.1rem, 5.6cqw, 2.8rem);
  height: clamp(1.1rem, 5.6cqw, 2.8rem);
  background: ${({ $couleur }) => $couleur};
  color: ${({ theme }) => theme.piste.jetonTexte};
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(0.35rem, 1.5cqw, 0.85rem);
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  border: ${({ $avecImage }) => ($avecImage ? '0.1875rem' : '0.125rem')} solid
    ${({ theme, $couleur, $avecImage }) => ($avecImage ? $couleur : theme.piste.jetonContour)};
  box-shadow: 0 0 0 0.125rem
    ${({ theme, $actif }) => ($actif ? theme.couleurs.accent : theme.couleurs.encre)};
  transform: ${({ $tombe }) => ($tombe ? 'rotate(90deg) scaleX(0.7)' : 'none')};
  opacity: ${({ $tombe }) => ($tombe ? 0.75 : 1)};
  transition: transform ${({ theme }) => theme.transition};

  ${({ $saute }) => $saute && sautJeton}
  ${({ $fondu }) => FONDUS[$fondu]}
`;

// L'image du perso, qui remplit le rond.
export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
