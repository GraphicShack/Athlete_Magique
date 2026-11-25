// Responsabilité : une fin de course inventée, pour essayer l'écran sans jouer.

import FINS_EXEMPLE from '@/data/exemples/finsExemple.aSupprimer.js';

// Renvoie la fin de cette course (1, 2 ou 3).
export function finInventee(numero) {
  return FINS_EXEMPLE[numero - 1];
}
