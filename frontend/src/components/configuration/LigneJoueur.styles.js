// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';
import { rondCentre } from '@/styles/base/utilitaires.js';

// Carte blanche sur une ligne, avec une bande épaisse à gauche à la couleur du pion (comme CarteJoueur en course).
export const Carte = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(4)};
  min-height: 4rem;
  padding: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(4)};
  border: ${({ theme }) => theme.bordures.contour};
  border-left: 0.625rem solid ${({ $couleur }) => $couleur};
  border-radius: ${({ theme }) => theme.rayons.md};
  background: ${({ theme }) => theme.couleurs.surface};
`;

// La pastille pis le nom, côte à côte.
export const NomJoueur = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(2)};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  white-space: nowrap;
`;

// Rond numéroté, à la couleur du pion.
export const Pastille = styled.span`
  ${rondCentre}
  width: 2rem;
  height: 2rem;
  border: ${({ theme }) => theme.bordures.contour};
  background: ${({ $couleur }) => $couleur};
  font-family: ${({ theme }) => theme.polices.titre};
`;

// « Prêt » (point vert) ou « En attente » (point gris), poussé à droite.
export const Statut = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(2)};
  margin-left: auto;
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.forte};
  color: ${({ theme, $pret }) => ($pret ? theme.couleurs.encre : theme.couleurs.gris500)};

  &::before {
    content: '';
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    border: 0.125rem solid ${({ theme }) => theme.couleurs.encre};
    background: ${({ theme, $pret }) => ($pret ? theme.palette.vert : theme.couleurs.gris300)};
  }
`;
