/*
 * jetons.js : transforme les joueurs en jetons à poser sur la piste.
 *
 * Responsabilité : calculer les jetons à partir des joueurs, pour ne pas écrire deux fois
 * les mêmes positions (une fois pour la liste des joueurs, une fois pour la piste).
 */
// Un jeton par joueur : { id, position, couleur, initiales, image, tombe, actif }.
// Les joueurs doivent déjà avoir leur couleur (voir CoursePage.jsx).
export function jetonsDesJoueurs(joueurs, idActif) {
  return joueurs.map((joueur) => ({
    id: joueur.id,
    position: joueur.position,
    couleur: joueur.couleur,
    initiales: joueur.personnage.initiales,
    image: joueur.personnage.image, // l'image du personnage (fournie par services/partie.js)
    tombe: joueur.etat === 'tombe',
    actif: joueur.id === idActif,
  }));
}
