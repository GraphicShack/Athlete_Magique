// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';
import { COLONNES, RANGEES } from '@/utils/piste/dispositionPiste.js';

// Le plateau garde toujours les proportions de la grille (8 colonnes sur 4 rangées).
// Pourquoi container-type: inline-size : à l'intérieur, 1cqw = 1 % de la largeur du plateau ; les pions pis les numéros grossissent avec lui.
export const Plateau = styled.div`
  container-type: inline-size;
  width: 100%;
  max-width: calc(100cqh * ${COLONNES} / ${RANGEES});
  aspect-ratio: ${COLONNES} / ${RANGEES};
  display: grid;
  grid-template-columns: repeat(${COLONNES}, minmax(0, 1fr));
  grid-template-rows: repeat(${RANGEES}, minmax(0, 1fr));
  gap: 0.8%;
  padding: 1.6%;
  background: ${({ theme }) => theme.piste.fond};
  border-radius: ${({ theme }) => theme.rayons.lg};
  box-shadow: inset 0 0 0 0.25rem ${({ theme }) => theme.piste.fond},
    inset 0 0 0 0.375rem ${({ theme }) => theme.piste.contour};
`;

// Ce qui est commun au Départ pis à l'Arrivée : une case de la grille, à la place donnée.
const PlaceSpeciale = styled.div`
  grid-column: ${({ $colonne }) => $colonne};
  grid-row: ${({ $rangee }) => $rangee};
  position: relative;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: min(${({ theme }) => theme.rayons.sm}, 15%);
`;

// Case Départ, bleue.
export const Depart = styled(PlaceSpeciale)`
  background: ${({ theme }) => theme.piste.depart};
  color: ${({ theme }) => theme.piste.departTexte};
`;

// Case Arrivée : damier noir pis blanc, comme une ligne d'arrivée.
export const Arrivee = styled(PlaceSpeciale)`
  background: repeating-conic-gradient(
      ${({ theme }) => theme.piste.arrivee} 0% 25%,
      ${({ theme }) => theme.piste.arriveeDamier} 0% 50%
    )
    0 0 / 50% 50%;
`;

// « Départ » ou « Arrivée », en haut de la case.
export const Nom = styled.span`
  position: absolute;
  top: 6%;
  padding: 1px 0.3125rem;
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: ${({ theme }) => theme.piste.arriveeDamier};
  color: ${({ theme }) => theme.piste.departTexte};
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(0.45rem, 1.6cqw, 0.85rem);
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  font-style: italic;
  text-transform: uppercase;
`;

// Les jetons posés sur le Départ ou l'Arrivée, en bas de la case.
export const Jetons = styled.div`
  position: absolute;
  bottom: 6%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.125rem;
`;
