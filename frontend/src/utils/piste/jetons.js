// Responsabilité : transforme les joueurs en jetons pour la piste.

import { sautEntre } from '@/utils/piste/dispositionPiste.js';

// Un jeton par joueur encore en course (un éliminé est retiré de la piste) : { id, position, couleur, initiales, image, tombe, actif, saut, fondu }. Les joueurs doivent déjà avoir leur couleur (voir useJoueursCourse.js).
export function jetonsDesJoueurs(joueurs, idActif, mouvement = null, fondus = {}) {
  return joueurs.filter((joueur) => joueur.etat !== 'elimine').map((joueur) => ({
    id: joueur.id,
    position: joueur.position,
    couleur: joueur.couleur,
    initiales: joueur.personnage.initiales,
    image: joueur.personnage.image, // l'image du personnage
    tombe: joueur.etat === 'tombe',
    actif: joueur.id === idActif,
    saut: mouvement && joueur.id === mouvement.id ? sautEntre(mouvement.depuis, joueur.position) : null,
    fondu: fondus[joueur.id] ?? null,
  }));
}
