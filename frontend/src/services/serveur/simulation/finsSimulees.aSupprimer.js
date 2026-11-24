// Responsabilité : ce que le faux serveur envoie à la fin d'une course.

import FINS_EXEMPLE from '@/data/exemples/finsExemple.aSupprimer.js';

// Pour essayer l'écran sans jouer : /fin-course?course=1 (ou 2, 3). 0 si c'est pas demandé.
export const courseDemandee = Number(new URLSearchParams(window.location.search).get('course'));

// Renvoie la fin de cette course (1, 2 ou 3).
export function finDeCourse(numero) {
  return FINS_EXEMPLE[numero - 1];
}
