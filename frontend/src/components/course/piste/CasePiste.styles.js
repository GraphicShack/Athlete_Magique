// Responsabilité : définir le style de ce composant (styled-components).

import styled, { css } from 'styled-components';
import { caseQuiBrille } from '@/styles/animations/gain.js';

// Fond pis texte de la case selon son type (le thème donne toutes les couleurs de la piste).
const couleurs = ({ theme, $type, $repere, $indice }) => {
  if ($type === 'etoile') return css`background: ${theme.piste.etoile}; color: ${theme.piste.etoileTexte};`;
  if ($type === 'rocher') return css`background: ${theme.piste.rocher}; color: ${theme.piste.rocherTexte};`;
  if ($repere) return css`background: ${theme.piste.repere}; color: ${theme.piste.repereTexte};`;
  return css`background: ${theme.piste.cases[$indice]}; color: ${theme.piste.texteCase};`;
};

// La case : un carré placé dans la grille du plateau.
export const Carre = styled.div`
  grid-column: ${({ $colonne }) => $colonne};
  grid-row: ${({ $rangee }) => $rangee};
  position: relative;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: min(${({ theme }) => theme.rayons.sm}, 15%);
  ${couleurs}
  ${({ $brille }) => $brille && caseQuiBrille}
`;

// Gros numéro (repères pis étoiles) ; sa taille suit la largeur du plateau (cqw).
export const Numero = styled.span`
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(0.6rem, 3.6cqw, 1.8rem);
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  line-height: 1;
  white-space: nowrap;
`;

// Petit numéro, en haut à gauche des autres cases.
export const PetitNumero = styled.span`
  position: absolute;
  z-index: 1; /* au-dessus du rocher */
  top: 6%;
  left: 8%;
  font-size: clamp(0.5rem, 2.1cqw, 1rem);
  font-weight: ${({ theme }) => theme.graisses.forte};
  opacity: 0.85;
`;

// Le dessin du rocher, centré dans la case (les jetons passent par-dessus).
export const Rocher = styled.img`
  position: absolute;
  inset: 12%;
  width: 76%;
  height: 76%;
  object-fit: contain;
  pointer-events: none;
`;

// Les jetons, centrés par-dessus la case.
export const Jetons = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.125rem;
`;
