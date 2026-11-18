// Responsabilité : transforme les joueurs en jetons pour la piste.
// Utilisé dans : useJoueursCourse

import { sautEntre } from '@/utils/piste/dispositionPiste.js';

// Un jeton par joueur : { id, position, couleur, initiales, image, tombe, actif, saut }. Les joueurs doivent déjà avoir leur couleur (voir CoursePage.jsx).
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
