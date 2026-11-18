// Responsabilité : dit où en est le tour (phase pis étape).
// Utilisé dans : useTourDemo

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

// Trouve la phase du tour à partir de son état (étape choisie, dé, choix, relances).
export function phaseDuTour({ etape, termine, lancers, obtenu, choixFait, aUnPouvoir, plusDeRelance }) {
  if (termine) return 'termine';
  if (etape === 1) return 'debut';
  if (etape === 4) return 'fin';
  if (lancers === 0) return 'lancer';
  if (obtenu === null) return 'roule';
  if (choixFait || !aUnPouvoir || plusDeRelance) return 'deplacement';
  return 'pouvoir';
}
