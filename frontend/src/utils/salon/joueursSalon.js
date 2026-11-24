// Responsabilité : modifie la liste des joueurs du salon (renvoie tjrs une nouvelle liste, jamais l'ancienne).
// Utilisé dans : salonSimule

// Trouve le 1er nom de bot libre (« Bot 1 », sinon « Bot 2 »…).
function nomProchainBot(joueurs) {
  let numero = 1;
  while (joueurs.some((joueur) => joueur.nom === `Bot ${numero}`)) numero += 1;
  return `Bot ${numero}`;
}

// Enlève le joueur qui a cet id.
export function retirerJoueur(joueurs, id) {
  return joueurs.filter((joueur) => joueur.id !== id);
}

// Ajoute un bot (déjà prêt) à la fin de la liste.
export function ajouterBot(joueurs) {
  const nom = nomProchainBot(joueurs);
  const bot = { id: nom, nom, bot: true, pret: true, hote: false };
  return [...joueurs, bot];
}
