/*
 * joueursSalon.js : modifie la liste des joueurs de la salle d'attente.
 *
 * Une seule chose : renvoyer une NOUVELLE liste de joueurs (on ne modifie jamais l'ancienne).
 *   retirerJoueur(joueurs, 'j2') → la liste sans j2
 *   ajouterBot(joueurs)          → la liste avec un bot de plus à la fin
 */

// Le nom du prochain bot : le premier numéro libre (« Bot 1 », sinon « Bot 2 »…).
function nomProchainBot(joueurs) {
  let numero = 1;
  while (joueurs.some((joueur) => joueur.nom === `Bot ${numero}`)) numero += 1;
  return `Bot ${numero}`;
}

export function retirerJoueur(joueurs, id) {
  return joueurs.filter((joueur) => joueur.id !== id);
}

export function ajouterBot(joueurs) {
  const nom = nomProchainBot(joueurs);
  const bot = { id: nom, nom, bot: true, pret: true, hote: false };
  return [...joueurs, bot];
}
