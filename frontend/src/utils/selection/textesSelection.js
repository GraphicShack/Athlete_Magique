// Responsabilité : les textes de la sélection (message, bouton, étiquette).

import { texteNom } from '@/utils/textesJoueur.js';

// Qui choisit en ce moment.
export function messageSelection({ choisit, monTour }) {
  if (!choisit) return 'Tout le monde a choisi. La course va commencer.';
  if (monTour) return 'C’est à vous de choisir.';
  return `${texteNom(choisit)} choisit son personnage…`;
}

// Le bouton du perso au centre.
export function libelleChoisir({ nom, prisPar }) {
  return prisPar ? `${nom} est pris` : `Choisir ${nom}`;
}

// L'étiquette d'un perso déjà pris.
export function textePris({ prisPar, choisiParMoi }) {
  return choisiParMoi ? 'Choisi' : `Pris par ${texteNom(prisPar)}`;
}
