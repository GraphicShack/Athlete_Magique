// Responsabilité : fait circuler les événements du journal (patron Observateur).

import { completerEvenement } from '@/utils/journal/completerEvenement.js';

// Les fonctions abonnées au journal.
const abonnes = new Set();

// S'abonner : recevoir(evenement) sera appelé à chaque nouvel événement.
export function ecouterEvenements(recevoir) {
  abonnes.add(recevoir);
  return () => abonnes.delete(recevoir);
}

// Ajouter un événement au journal : il est complété, puis envoyé à tous les abonnés.
export function journaliser(evenement) {
  const complet = completerEvenement(evenement);
  abonnes.forEach((recevoir) => recevoir(complet));
}
