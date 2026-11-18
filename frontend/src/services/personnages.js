// Responsabilité : donne les persos avec leur image (seul accès aux données des persos).
// Utilisé dans : ApercuPersonnages, ContenuRegles, SelectionPage, partie, useJournal

import PERSONNAGES from '@/data/personnages/personnages.js';
import IMAGES_PERSONNAGES from '@/data/personnages/imagesPersonnages.js';

// La liste des persos, chacun avec son image : [{ id, nom, initiales, pouvoir, image }, …] Les composants n'ont donc pas besoin de chercher l'image eux-mêmes.
const PERSONNAGES_AVEC_IMAGE = PERSONNAGES.map((personnage) => ({
  ...personnage,
  image: IMAGES_PERSONNAGES[personnage.id],
}));

// Renvoie la liste des persos (avec leur image).
export function obtenirPersonnages() {
  return PERSONNAGES_AVEC_IMAGE;
}
