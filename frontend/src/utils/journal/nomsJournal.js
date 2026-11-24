// Responsabilité : transforme un id en nom lisible pour le journal.

import { obtenirPersonnage } from '@/services/personnages.js';

// 'j1' → « Félix (Magicien) ».
export function nomJoueur(joueurs, id) {
  const joueur = joueurs.find((j) => j.id === id);
  return joueur ? `${joueur.nom} (${joueur.personnage.nom})` : 'Un joueur';
}

// 'lievre' → « Lièvre ».
export function nomPersonnage(id) {
  return obtenirPersonnage(id)?.nom ?? id;
}
