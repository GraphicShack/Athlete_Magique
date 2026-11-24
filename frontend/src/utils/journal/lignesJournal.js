// Responsabilité : transforme les événements reçus en lignes à afficher dans le journal.

import { texteEvenement } from '@/utils/journal/texteEvenement.js';

// evenements : du plus ancien au plus récent. Renvoie [{ id, tour, texte }], le plus récent en premier.
export function lignesJournal(evenements, joueurs) {
  return [...evenements].reverse().map((evenement) => ({
    id: evenement.id,
    tour: evenement.tour,
    texte: texteEvenement(evenement, joueurs),
  }));
}
