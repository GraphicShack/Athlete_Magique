// Responsabilité : les petites animations réutilisables (fondu, apparaître, grandir…).

import { keyframes } from 'styled-components';

// Courbe de vitesse : départ rapide, arrivée tout en douceur.
export const COURBE = 'cubic-bezier(0.32, 0.72, 0, 1)';

// Apparaître en transparence.
export const fondu = keyframes`
  from {
    opacity: 0;
  }
`;

// Apparaître en montant légèrement (ex. blocs d'une liste, en cascade).
export const apparaitre = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
`;

// Arriver en tournant (ex. le bouton × de la fenêtre).
export const tourner = keyframes`
  from {
    opacity: 0;
    transform: rotate(-135deg) scale(0.6);
  }
`;

// Grandir à partir d'un petit rond de la couleur d'un bouton (variable --couleur-bouton).
export const grandir = keyframes`
  from {
    transform: scale(0.08);
    border-radius: 999px;
    background-color: var(--couleur-bouton);
  }
`;

// Inverse de « grandir » : rétrécir en un petit rond pis disparaître (fermeture d'une fenêtre).
export const retrecir = keyframes`
  to {
    transform: scale(0.18);
    border-radius: 999px;
    opacity: 0;
  }
`;
