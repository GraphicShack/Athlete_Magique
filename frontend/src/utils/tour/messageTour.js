/*
 * messageTour.js : écrit le message du tour en cours.
 *
 * Une seule chose : le texte affiché à côté du dé, selon la phase (voir utils/tour/phaseTour.js).
 */
import { nombreDeCases } from '@/utils/nombreDeCases.js';

/**
 *   tour        : { joueur, consigneAvant, consigneApres }
 *   obtenu      : valeur du dé arrêté
 *   deplacement : nombre de cases à avancer
 */
export function messageDuTour(phase, { tour, obtenu, deplacement }) {
  if (phase === 'lancer') return tour.consigneAvant;
  if (phase === 'roule') return 'Le dé roule…';
  if (phase === 'pouvoir') return `${tour.joueur} a obtenu ${obtenu}. ${tour.consigneApres}`;
  if (phase === 'avancer') return `${tour.joueur} va avancer de ${nombreDeCases(deplacement)}.`;
  return `${tour.joueur} avance de ${nombreDeCases(deplacement)}.`;
}
