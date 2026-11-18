// Responsabilité : transforme un id en nom lisible pour le journal.
// Utilisé dans : useJournal

export function nomJoueur(joueurs, id) {
  const joueur = joueurs.find((j) => j.id === id);
  return joueur ? `${joueur.nom} (${joueur.personnage.nom})` : 'Un joueur';
}

// 'lievre' → « Lièvre ».
export function nomPersonnage(personnages, id) {
  return personnages.find((p) => p.id === id)?.nom ?? id;
}
