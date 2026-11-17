/*
 * messageTour.js : écrit le message du tour en cours.
 *
 * Une seule chose : le texte affiché à côté du dé, selon la phase (voir utils/tour/phaseTour.js).
 */
import { nombreDeCases } from '@/utils/nombreDeCases.js';

/**
 *   tour        : { joueur, etapes } (etapes : voir data/exemples/deroulementTour.js)
 *   obtenu      : valeur du dé arrêté
 *   deplacement : nombre de cases à avancer
 */
export function messageDuTour(phase, { tour, obtenu, deplacement }) {
  const { debut, lancer, fin } = tour.etapes;

  if (phase === 'debut') return debut.consigne;
  if (phase === 'lancer') return lancer.consigneAvant;
  if (phase === 'roule') return 'Le dé roule…';
  if (phase === 'pouvoir') return `${tour.joueur} a obtenu ${obtenu}. ${lancer.consigneApres}`;
  if (phase === 'deplacement') {
    return `${tour.joueur} va avancer de ${nombreDeCases(deplacement)}. ${tour.etapes.deplacement.consigne}`;
  }
  if (phase === 'fin') return fin.consigne;
  return `Le tour de ${tour.joueur} est terminé.`;
}
