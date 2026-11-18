/*
 * simulationJournal.js (service) : fait semblant d'être le serveur pour le journal.
 *
 * Une seule chose : ajouter au journal les événements d'exemple un par un, avec un petit
 * délai, comme pendant une vraie partie. Ce fichier disparaîtra quand le serveur existera.
 */
import EVENEMENTS_EXEMPLE from '@/data/exemples/evenementsExemple.js';
import { journaliser } from '@/services/journal/journal.js';

// Délai entre deux événements, en millisecondes.
const DELAI = 700;

// Démarre la simulation. Renvoie une fonction qui l'arrête (si on quitte la page avant la fin).
export function demarrerSimulation() {
  const minuteries = EVENEMENTS_EXEMPLE.map((evenement, i) => setTimeout(() => journaliser(evenement), (i + 1) * DELAI));
  return () => minuteries.forEach(clearTimeout);
}
