/*
 * deplacerJoueur.js : place un joueur sur une nouvelle case.
 *
 * Une seule chose : renvoyer la liste des joueurs avec la nouvelle case de l'un d'eux.
 * La liste de départ n'est pas modifiée (on en fait une copie).
 *
 *   deplacerJoueur(joueurs, 'j1', 17) → les mêmes joueurs, mais j1 est sur la case 17
 */
export function deplacerJoueur(joueurs, idJoueur, position) {
  return joueurs.map((joueur) => (joueur.id === idJoueur ? { ...joueur, position } : joueur));
}
