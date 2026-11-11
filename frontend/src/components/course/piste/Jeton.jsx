/*
 * Jeton.jsx : le pion d'un personnage sur la piste, un disque à sa couleur avec ses initiales.
 *
 * Responsabilité : montrer l'état du pion : couché s'il est tombé, entouré de rouge
 * si c'est le pion du joueur actif.
 *
 * Props :
 *   couleur   : couleur du joueur
 *   initiales : ex. « MA »
 *   tombe     : true si le personnage est tombé
 *   actif     : true si c'est le pion du joueur dont c'est le tour
 */
import styled from 'styled-components';
import { rondCentre } from '../../../styles/base/utilitaires.js';

function Jeton({ couleur, initiales, tombe = false, actif = false }) {
  return (
    // title : texte affiché quand on laisse la souris sur le pion.
    <Disque $couleur={couleur} $tombe={tombe} $actif={actif} title={tombe ? `${initiales} (tombé)` : initiales}>
      {initiales}
    </Disque>
  );
}

// Disque à contour blanc, puis un anneau noir (ou rouge s'il est actif).
const Disque = styled.span`
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

export default Jeton;
