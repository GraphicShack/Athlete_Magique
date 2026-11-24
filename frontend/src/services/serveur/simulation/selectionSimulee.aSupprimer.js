// Responsabilité : fait semblant de gérer la sélection des persos.

import PARTIE_EXEMPLE from '@/data/exemples/partieExemple.aSupprimer.js';
import { obtenirPersonnages } from '@/services/personnages.js';

const melanger = (liste) => [...liste].sort(() => Math.random() - 0.5);

// Le prochain à choisir : le premier, dans l'ordre, qui a pas encore de perso (null = fini).
const prochain = (joueurs, choix) =>
  joueurs.find(({ id }) => !choix.some(({ idJoueur }) => idJoueur === id))?.id ?? null;

// Tire 2 persos de plus que le nb de joueurs, pis l'ordre de choix.
export function nouvelleSelection(numero) {
  const joueurs = melanger(PARTIE_EXEMPLE.joueurs.map(({ id, nom, bot }) => ({ id, nom, bot })));
  const personnages = melanger(obtenirPersonnages()).slice(0, joueurs.length + 2);
  return {
    idMoi: PARTIE_EXEMPLE.idMoi,
    idChoisit: joueurs[0].id,
    course: { numero, nombreCourses: 3 },
    personnagesTires: personnages.map(({ id }) => id),
    joueurs,
    choix: [],
  };
}

const estPris = (selection, id) => selection.choix.some(({ idPersonnage }) => idPersonnage === id);

// Le premier perso encore libre (pour les autres joueurs).
export const premierLibre = (selection) => selection.personnagesTires.find((id) => !estPris(selection, id));

// Donne le perso à celui qui choisit ; lance une erreur si c'est pas permis.
export function choisir(selection, idPersonnage) {
  if (estPris(selection, idPersonnage)) throw new Error('Ce personnage est déjà pris.');
  const choix = [...selection.choix, { idJoueur: selection.idChoisit, idPersonnage }];
  return { ...selection, choix, idChoisit: prochain(selection.joueurs, choix) };
}
