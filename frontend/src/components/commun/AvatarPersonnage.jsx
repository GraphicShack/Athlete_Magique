/*
 * AvatarPersonnage.jsx : le rond qui représente un personnage (carte joueur, tour actif).
 *
 * Responsabilité : afficher les initiales du personnage (« MA », « DU »…) dans un rond.
 *
 * Props :
 *   initiales : les lettres à afficher
 *   taille    : 'md' (par défaut) ou 'lg'
 */
import styled from 'styled-components';
import { rondCentre } from '../../styles/base/utilitaires.js';

// Diamètre du rond pour chaque taille.
const TAILLES = { md: '2.75rem', lg: '4rem' };

function AvatarPersonnage({ initiales, taille = 'md' }) {
  return (
    // aria-hidden : décoratif, le nom du personnage est toujours écrit à côté.
    <Rond $taille={TAILLES[taille]} aria-hidden="true">
      {initiales}
    </Rond>
  );
}

// Rond blanc à contour noir.
const Rond = styled.span`
  ${rondCentre}
  flex-shrink: 0;
  width: ${({ $taille }) => $taille};
  height: ${({ $taille }) => $taille};
  border: ${({ theme }) => theme.bordures.contour};
  background: ${({ theme }) => theme.couleurs.surface};
  font-family: ${({ theme }) => theme.polices.titre};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  font-size: calc(${({ $taille }) => $taille} * 0.34); /* les initiales suivent la taille du rond */
`;

export default AvatarPersonnage;
