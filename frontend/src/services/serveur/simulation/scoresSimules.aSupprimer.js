// Responsabilité : ce que le faux serveur répond pour le tableau d'honneur.

import SCORES_EXEMPLE from '@/data/exemples/scoresExemple.aSupprimer.js';

// Ajoute le rang : 1 + le nb de scores meilleurs (deux scores égaux ont donc le même rang).
const classer = (scores) =>
  scores.map((score) => ({ ...score, rang: 1 + scores.filter((autre) => autre.score > score.score).length }));

const deType = (type) => SCORES_EXEMPLE.filter((score) => score.type === type);

const REPONSES = {
  '/api/honneur?filtre=tous': classer(SCORES_EXEMPLE),
  '/api/honneur?filtre=comptes': classer(deType('compte')),
  '/api/honneur?filtre=invites': classer(deType('invite')),
};

// Renvoie les scores de cette route.
export function repondreScores(route) {
  return REPONSES[route];
}
