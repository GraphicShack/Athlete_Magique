// Responsabilité : le rideau en cascade (des colonnes montent l'une après l'autre, de gauche à droite).
// Inspiration : « Curtains: Stagger wipe » de Matt Perry (Motion), https://motion.dev/examples/react-curtains-stagger-wipe (idée seulement, refaite en CSS pour le projet).

import { css } from 'styled-components';
import { masqueColonnes, tailleColonnes } from './colonnes.js';

const COLONNES = [0, 1, 2, 3, 4];
const RETARD = 12; // % de l'anim entre le départ de 2 colonnes
const DUREE = 100 - RETARD * (COLONNES.length - 1); // % de l'anim que prend une colonne

// Où en est une colonne (0 à 100) à un moment de l'anim (0 à 100), avec un départ pis une arrivée en douceur.
function avance(colonne, moment) {
  const part = Math.min(Math.max((moment - colonne * RETARD) / DUREE, 0), 1);
  return 100 * part * part * (3 - 2 * part);
}

// Les étapes de l'anim, une tous les 5 %. hauteur : transforme l'avance en hauteur de colonne.
const etapes = (hauteur) =>
  Array.from({ length: 21 }, (_, i) => i * 5)
    .map((moment) => `${moment}% { ${tailleColonnes(COLONNES.map((colonne) => hauteur(avance(colonne, moment))))} }`)
    .join('\n');

export const rideauCascade = css`
  @keyframes cascade-cacher {
    ${etapes((part) => 100 - part)}
  }
  @keyframes cascade-montrer {
    ${etapes((part) => part)}
  }

  html[data-rideau='cascade']::view-transition-old(root) {
    ${masqueColonnes(COLONNES.map(() => '0%'))}
    animation: cascade-cacher 850ms linear both;
  }
  html[data-rideau='cascade']::view-transition-new(root) {
    ${masqueColonnes(COLONNES.map(() => '100%'))}
    animation: cascade-montrer 850ms linear 330ms both;
  }
`;
