/*
 * journal.js (service) : fait circuler les événements du journal (patron Observateur).
 *
 * Une seule chose : relier ceux qui ajoutent des événements (journaliser) et ceux qui les
 * écoutent (ecouterEvenements). Chaque événement ajouté est complété au format standard
 * (utils/journal/completerEvenement.js), puis envoyé à tous les abonnés.
 *
 * Il ne sait pas d'où viennent les événements : des boutons du tour, ou de la simulation
 * (services/journal/simulationJournal.js). Plus tard, ce sera le serveur.
 */
import { completerEvenement } from '@/utils/journal/completerEvenement.js';

// Les fonctions abonnées au journal.
const abonnes = new Set();

// S'abonner : recevoir(evenement) sera appelé à chaque nouvel événement.
// Renvoie une fonction pour se désabonner (quand on quitte la page).
export function ecouterEvenements(recevoir) {
  abonnes.add(recevoir);
  return () => abonnes.delete(recevoir);
}

// Ajouter un événement au journal : il est complété, puis envoyé à tous les abonnés.
export function journaliser(evenement) {
  const complet = completerEvenement(evenement);
  abonnes.forEach((recevoir) => recevoir(complet));
}
