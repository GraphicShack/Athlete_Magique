/*
 * journal.js (service) : relie ceux qui ajoutent des événements et ceux qui les écoutent.
 *
 * C'est un fichier qui connecte : il ne fait rien lui-même, il utilise
 *   - simulationJournal.js : les événements d'exemple (en attendant le serveur) ;
 *   - completerEvenement.js : met chaque nouvel événement au format standard.
 *
 * Patron Observateur : on s'abonne avec ecouterEvenements, puis chaque événement ajouté
 * avec journaliser est envoyé à tous les abonnés.
 */
import { simulerEvenements } from '@/services/journal/simulationJournal.js';
import { completerEvenement } from '@/utils/journal/completerEvenement.js';
import PARTIE_EXEMPLE from '@/data/exemples/partieExemple.js';

// Les fonctions abonnées au journal.
const abonnes = new Set();

// S'abonner : recevoir(evenement) sera appelé à chaque nouvel événement.
// Renvoie une fonction pour se désabonner (quand on quitte la page).
export function ecouterEvenements(recevoir) {
  abonnes.add(recevoir);
  const arreterSimulation = simulerEvenements(recevoir);
  return () => {
    abonnes.delete(recevoir);
    arreterSimulation();
  };
}

// Ajouter un événement au journal : il est complété, puis envoyé à tous les abonnés.
export function journaliser(evenement) {
  const complet = completerEvenement(evenement, PARTIE_EXEMPLE.course.numero);
  abonnes.forEach((recevoir) => recevoir(complet));
}
