// Responsabilité : met un joueur sur une nouvelle case (renvoie une copie de la liste).
// Utilisé dans : useJoueursCourse

export function deplacerJoueur(joueurs, idJoueur, position) {
  return joueurs.map((joueur) => (joueur.id === idJoueur ? { ...joueur, position } : joueur));
}
