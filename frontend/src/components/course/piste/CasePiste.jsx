import styled, { css } from 'styled-components';
import { positionCase, estRepere, indiceCouleur, coinCase } from './dispositionPiste.js';

/**
 * Une case de la piste. Elle se place elle-même dans la grille selon son numéro
 * et affiche les jetons qu'on lui donne en enfants.
 * type : 'normale' | 'etoile' | 'rocher'
 */
function CasePiste({ numero, type = 'normale', children }) {
  const { colonne, rangee } = positionCase(numero);
  const repere = estRepere(numero);
  const afficherNumero = repere || type === 'etoile';

  return (
    <Carre
      $colonne={colonne}
      $rangee={rangee}
      $type={type}
      $repere={repere}
      $indice={indiceCouleur(numero)}
      $coin={coinCase(numero)}
      aria-label={`Case ${numero}`}
    >
      {afficherNumero ? (
        <Numero>
          {type === 'etoile' && '★ '}
          {numero}
        </Numero>
      ) : (
        <PetitNumero>{numero}</PetitNumero>
      )}
      {type === 'rocher' && <Mention>Rocher</Mention>}
      {children && <Jetons>{children}</Jetons>}
    </Carre>
  );
}

const couleurs = ({ theme, $type, $repere, $indice }) => {
  if ($type === 'etoile') return css`background: ${theme.piste.etoile}; color: ${theme.piste.etoileTexte};`;
  if ($type === 'rocher') return css`background: ${theme.piste.rocher}; color: ${theme.piste.rocherTexte};`;
  if ($repere) return css`background: ${theme.piste.repere}; color: ${theme.piste.repereTexte};`;
  return css`background: ${theme.piste.cases[$indice]}; color: ${theme.piste.texteCase};`;
};

// --coin-piste est défini par Piste : l'arrondi qui épouse la bordure du plateau.
const ARRONDIS = {
  hautDroite: 'border-top-right-radius: var(--coin-piste);',
  basDroite: 'border-bottom-right-radius: var(--coin-piste);',
};

const Carre = styled.div`
  grid-column: ${({ $colonne }) => $colonne};
  grid-row: ${({ $rangee }) => $rangee};
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: min(${({ theme }) => theme.rayons.sm}, 15%);
  ${({ $coin }) => ARRONDIS[$coin] ?? ''}
  ${couleurs}
`;

const Numero = styled.span`
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(0.5rem, 2cqw, 1.6rem);
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  line-height: 1;
  white-space: nowrap;
`;

const PetitNumero = styled.span`
  position: absolute;
  top: 6%;
  left: 8%;
  font-size: clamp(0.35rem, 1cqw, 0.65rem);
  font-weight: ${({ theme }) => theme.graisses.forte};
  opacity: 0.55;
`;

const Mention = styled.span`
  position: absolute;
  bottom: 6%;
  font-size: clamp(0.3rem, 0.85cqw, 0.6rem);
  font-weight: ${({ theme }) => theme.graisses.forte};
  text-transform: uppercase;
`;

const Jetons = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

export default CasePiste;
