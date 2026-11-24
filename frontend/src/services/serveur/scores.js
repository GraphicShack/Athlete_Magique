// Responsabilité : va chercher les meilleurs scores.

import { demander } from '@/services/serveur/serveur.js';

// filtre : 'tous', 'comptes' ou 'invites'.
// Renvoie les scores, du meilleur au moins bon : [{ id, rang, pseudo, type, score, date, vous }, …]
export async function obtenirScores(filtre) {
  const scores = await demander(`/api/honneur?filtre=${filtre}`);
  if (!Array.isArray(scores)) throw new Error('Les scores reçus ne sont pas une liste.');
  return scores;
}
