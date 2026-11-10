import styled from 'styled-components';
import { rondCentre } from '../../../styles/utilitaires.js';

/** Pion d'un personnage : un disque à sa couleur, avec ses initiales. */
function Jeton({ couleur, initiales, tombe = false, actif = false }) {
  return (
    <Disque $couleur={couleur} $tombe={tombe} $actif={actif} title={tombe ? `${initiales} (tombé)` : initiales}>
      {initiales}
    </Disque>
  );
}

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
  transform: ${({ $tombe }) => ($tombe ? 'rotate(90deg) scaleX(0.7)' : 'none')};
  opacity: ${({ $tombe }) => ($tombe ? 0.75 : 1)};
  transition: transform ${({ theme }) => theme.transition};
`;

export default Jeton;
