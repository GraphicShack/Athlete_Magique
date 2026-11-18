// Responsabilité : écrit le message du tour selon la phase.
// Utilisé dans : useTourDemo

import { nombreDeCases } from '@/utils/nombreDeCases.js';

// Renvoie le message à afficher selon la phase.
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
