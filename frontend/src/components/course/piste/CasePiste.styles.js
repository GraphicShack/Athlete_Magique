/*
 * CasePiste.styles.js : l'apparence de CasePiste (CasePiste.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * CasePiste.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled, { css } from 'styled-components';

// Fond et texte de la case selon son type (le thème donne toutes les couleurs de la piste).
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

// La case : un carré placé dans la grille du plateau.
export const Carre = styled.div`
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

// Gros numéro (repères et étoiles) ; sa taille suit la largeur du plateau (cqw).
export const Numero = styled.span`
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(0.5rem, 2cqw, 1.6rem);
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  line-height: 1;
  white-space: nowrap;
`;

// Petit numéro discret, en haut à gauche des autres cases.
export const PetitNumero = styled.span`
  position: absolute;
  top: 6%;
  left: 8%;
  font-size: clamp(0.35rem, 1cqw, 0.65rem);
  font-weight: ${({ theme }) => theme.graisses.forte};
  opacity: 0.55;
`;

// Mot « Rocher » en bas de la case.
export const Mention = styled.span`
  position: absolute;
  bottom: 6%;
  font-size: clamp(0.3rem, 0.85cqw, 0.6rem);
  font-weight: ${({ theme }) => theme.graisses.forte};
  text-transform: uppercase;
`;

// Les jetons, centrés par-dessus la case.
export const Jetons = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;
