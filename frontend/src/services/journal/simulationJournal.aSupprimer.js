// Responsabilité : fait semblant d'être le serveur en envoyant les événements d'exemple.
// Utilisé dans : useSimulationJournal

import EVENEMENTS_EXEMPLE from '@/data/exemples/evenementsExemple.aSupprimer.js';
import { journaliser } from '@/services/journal/journal.js';

// Délai entre deux événements, en millisecondes.
const DELAI = 700;

// Démarre la simulation. Renvoie une fonction qui l'arrête (si on quitte la page avant la fin).
export function demarrerSimulation() {
  const minuteries = EVENEMENTS_EXEMPLE.map((evenement, i) => setTimeout(() => journaliser(evenement), (i + 1) * DELAI));
  return () => minuteries.forEach(clearTimeout);
}
