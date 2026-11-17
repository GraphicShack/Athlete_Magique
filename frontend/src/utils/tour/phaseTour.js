/*
 * phaseTour.js : dit où en est le tour en cours.
 *
 * Une seule chose : à partir de l'état du tour, donner sa phase, et l'étape (1 à 4) qui va avec.
 *
 *   phase          étape   ce qui se passe
 *   'debut'        1       le joueur commence son tour (ou utilise son pouvoir de début de tour)
 *   'lancer'       2       le dé n'est pas encore lancé
 *   'roule'        2       le dé roule
 *   'pouvoir'      2       le dé est arrêté, le joueur choisit comment utiliser son pouvoir
 *   'deplacement'  3       le résultat est fixé, le joueur confirme son déplacement
 *   'fin'          4       le joueur termine son tour
 *   'termine'      4       le tour est terminé
 */

// L'étape (1 à 4) de chaque phase.
export const ETAPE_DE_PHASE = {
  debut: 1,
  lancer: 2,
  roule: 2,
  pouvoir: 2,
  deplacement: 3,
  fin: 4,
  termine: 4,
};

// Le nom de l'étape dans les données (voir data/exemples/deroulementTour.js).
export const CLES_ETAPES = { 1: 'debut', 2: 'lancer', 3: 'deplacement', 4: 'fin' };

/**
 *   etape         : l'étape choisie par le joueur (1, 2 ou 4 ; la 3 vient seule après le lancer)
 *   termine       : true si le joueur a cliqué « Fin du tour »
 *   lancers       : nombre de lancers faits (0 au départ)
 *   obtenu        : valeur du dé arrêté, ou null s'il roule
 *   choixFait     : true si le joueur a gardé ou doublé son résultat
 *   aUnPouvoir    : true s'il y a des boutons après le lancer
 *   plusDeRelance : true si toutes les relances sont utilisées (Magicien)
 */
export function phaseDuTour({ etape, termine, lancers, obtenu, choixFait, aUnPouvoir, plusDeRelance }) {
  if (termine) return 'termine';
  if (etape === 1) return 'debut';
  if (etape === 4) return 'fin';
  if (lancers === 0) return 'lancer';
  if (obtenu === null) return 'roule';
  if (choixFait || !aUnPouvoir || plusDeRelance) return 'deplacement';
  return 'pouvoir';
}
