import styled, { useTheme } from 'styled-components';
import { rondCentre } from '../../styles/utilitaires.js';
import ICONES from './iconesPersonnages.jsx';

const TAILLES = { md: '2.75rem', lg: '4rem' };

/**
 * Rond qui représente un personnage : son icône si on connaît son identifiant,
 * sinon ses initiales (« MA », « DU »…).
 * id : identifiant du personnage (voir donnees/personnages.js), optionnel.
 */
function AvatarPersonnage({ id, initiales, taille = 'md' }) {
  const theme = useTheme();
  const icone = ICONES[id];

  return (
    <Rond $taille={TAILLES[taille]} $fond={icone?.fond(theme)} aria-hidden="true">
      {icone ? (
        <svg viewBox="0 0 48 48" width="100%" height="100%">
          {icone.dessin(theme)}
        </svg>
      ) : (
        initiales
      )}
    </Rond>
  );
}

const Rond = styled.span`
  ${rondCentre}
  flex-shrink: 0;
  overflow: hidden;
  width: ${({ $taille }) => $taille};
  height: ${({ $taille }) => $taille};
  border: ${({ theme }) => theme.bordures.contour};
  background: ${({ theme, $fond }) => $fond ?? theme.couleurs.surface};
  font-family: ${({ theme }) => theme.polices.titre};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  font-size: calc(${({ $taille }) => $taille} * 0.34);
`;

export default AvatarPersonnage;
