/*
 * phaseTour.js : dit où en est le tour en cours.
 *
 * Une seule chose : à partir de l'état du tour, renvoyer sa phase :
 *   'lancer'  : le dé n'est pas encore lancé ;
 *   'roule'   : le dé roule ;
 *   'pouvoir' : le dé est arrêté, le joueur choisit comment utiliser son pouvoir ;
 *   'avancer' : le résultat est fixé, il ne reste qu'à avancer (commun à tous) ;
 *   'fini'    : le joueur a avancé (ou échangé sa place).
 */

/**
 *   fini          : true si le joueur a terminé
 *   lancers       : nombre de lancers faits (0 au départ)
 *   obtenu        : valeur du dé arrêté, ou null s'il roule
 *   choixFait     : true si le joueur a gardé ou doublé son résultat
 *   aUnPouvoir    : true si le personnage a des boutons après le lancer
 *   plusDeRelance : true si toutes les relances sont utilisées (Magicien)
 */
export function phaseDuTour({ fini, lancers, obtenu, choixFait, aUnPouvoir, plusDeRelance }) {
  if (fini) return 'fini';
  if (lancers === 0) return 'lancer';
  if (obtenu === null) return 'roule';
  if (choixFait || !aUnPouvoir || plusDeRelance) return 'avancer';
  return 'pouvoir';
}
