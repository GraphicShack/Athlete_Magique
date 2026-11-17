/*
 * jetons.js : transforme les joueurs en jetons à poser sur la piste.
 *
 * Responsabilité : calculer les jetons à partir des joueurs, pour ne pas écrire deux fois
 * les mêmes positions (une fois pour la liste des joueurs, une fois pour la piste).
 */
import { sautEntre } from '@/utils/piste/dispositionPiste.js';

// Un jeton par joueur : { id, position, couleur, initiales, image, tombe, actif, saut }.
// Les joueurs doivent déjà avoir leur couleur (voir CoursePage.jsx).
// mouvement (optionnel) : { id, depuis } le joueur dont le pion avance, et la case qu'il quitte.
// Son jeton reçoit « saut » ({ dx, dy }) pour l'animation en arc ; les autres, null.
export function jetonsDesJoueurs(joueurs, idActif, mouvement = null) {
  return joueurs.map((joueur) => ({
    id: joueur.id,
    position: joueur.position,
    couleur: joueur.couleur,
    initiales: joueur.personnage.initiales,
    image: joueur.personnage.image, // l'image du personnage (fournie par services/partie.js)
    tombe: joueur.etat === 'tombe',
    actif: joueur.id === idActif,
    saut: mouvement && joueur.id === mouvement.id ? sautEntre(mouvement.depuis, joueur.position) : null,
  }));
}
