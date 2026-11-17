/*
 * simulationJournal.js (service) : fait semblant d'être le serveur pour le journal.
 *
 * Une seule chose : envoyer les événements d'exemple un par un, avec un petit délai,
 * comme pendant une vraie partie. Ce fichier disparaîtra quand le serveur existera.
 */
import EVENEMENTS_EXEMPLE from '@/data/exemples/evenementsExemple.js';

// Délai entre deux événements, en millisecondes.
const DELAI = 300;

// Appelle recevoir(evenement) pour chaque événement d'exemple.
// Renvoie une fonction qui arrête l'envoi (si on quitte la page avant la fin).
export function simulerEvenements(recevoir) {
  const minuteries = EVENEMENTS_EXEMPLE.map((evenement, i) => setTimeout(() => recevoir(evenement), (i + 1) * DELAI));
  return () => minuteries.forEach(clearTimeout);
}
