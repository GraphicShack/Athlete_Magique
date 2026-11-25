// Responsabilité : fait semblant de gérer la sélection des persos.

import { obtenirPersonnages } from '@/services/personnages.js';
import { melanger } from './jeu/etat.aSupprimer.js';
import { NOMBRE_COURSES, duDernierAuPremier } from './jeu/course.aSupprimer.js';

// Le prochain à choisir : le premier, dans l'ordre, qui a pas encore de perso (null = fini).
const prochain = (joueurs, choix) =>
  joueurs.find(({ id }) => !choix.some(({ idJoueur }) => idJoueur === id))?.id ?? null;

// Tire 2 persos de plus que le nb de joueurs ; le moins bien classé choisit en premier.
export function nouvelleSelection(numero, joueurs, idMoi) {
  const ordre = duDernierAuPremier(joueurs);
  const personnages = melanger(obtenirPersonnages()).slice(0, joueurs.length + 2);
  return {
    idMoi,
    idChoisit: ordre[0].id,
    course: { numero, nombreCourses: NOMBRE_COURSES },
    personnagesTires: personnages.map(({ id }) => id),
    joueurs: ordre,
    choix: [],
  };
}

const estPris = (selection, id) => selection.choix.some(({ idPersonnage }) => idPersonnage === id);

// Un perso encore libre, au hasard (pour les autres joueurs).
export const persoLibre = (selection) => melanger(selection.personnagesTires).find((id) => !estPris(selection, id));

// Donne le perso à celui qui choisit ; lance une erreur si c'est pas permis.
export function choisir(selection, idPersonnage) {
  if (estPris(selection, idPersonnage)) throw new Error('Ce personnage est déjà pris.');
  const choix = [...selection.choix, { idJoueur: selection.idChoisit, idPersonnage }];
  return { ...selection, choix, idChoisit: prochain(selection.joueurs, choix) };
}
