/*
 * nomsJournal.js : les noms affichés dans le journal.
 *
 * Une seule chose : transformer un id en nom lisible.
 *   nomJoueur(joueurs, 'j1')     → « Félix (Magicien) »
 *   nomPersonnage(personnages, 'lievre') → « Lièvre »
 */
export function nomJoueur(joueurs, id) {
  const joueur = joueurs.find((j) => j.id === id);
  return joueur ? `${joueur.nom} (${joueur.personnage.nom})` : 'Un joueur';
}

export function nomPersonnage(personnages, id) {
  return personnages.find((p) => p.id === id)?.nom ?? id;
}
