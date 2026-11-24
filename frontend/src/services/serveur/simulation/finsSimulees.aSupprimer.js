// Responsabilité : ce que le faux serveur envoie à la fin d'une course.

import FINS_EXEMPLE from '@/data/exemples/finsExemple.aSupprimer.js';

// Pour essayer l'écran sans jouer : /fin-course?course=1 (ou 2, 3).
export const finDemandee = Number(new URLSearchParams(window.location.search).get('course'));

let prochaine = finDemandee ? finDemandee - 1 : 0;

// Renvoie la fin de la course 1, puis 2, puis 3, puis on recommence.
export function prochaineFin() {
  const fin = FINS_EXEMPLE[prochaine % FINS_EXEMPLE.length];
  prochaine += 1;
  return fin;
}
