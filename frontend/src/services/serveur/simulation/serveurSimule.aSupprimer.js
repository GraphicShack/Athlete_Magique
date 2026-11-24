// Responsabilité : fait semblant d'être le serveur (à enlever quand le vrai est branché).
// Utilisé dans : serveur

import { SALON_DEPART, repondreSalon } from './salonSimule.aSupprimer.js';
import { repondreScores } from './scoresSimules.aSupprimer.js';

// Comme un vrai serveur, il répond jamais tout de suite.
const attendre = () => new Promise((continuer) => setTimeout(continuer, 200));

let salon = SALON_DEPART;
let abonnes = []; // [{ message, recevoir }, …]

// Envoie le salon à tous ceux qui l'écoutent.
function diffuserSalon() {
  abonnes.filter((abonne) => abonne.message === 'salon:etat').forEach((abonne) => abonne.recevoir(salon));
}

// À l'ouverture du site, on reçoit le salon une fois (comme un joueur qui se reconnecte).
attendre().then(diffuserSalon);

export async function demander(route) {
  await attendre();
  return repondreScores(route);
}

export async function envoyer(message, donnees) {
  await attendre();
  salon = repondreSalon(salon, message, donnees); // lance une erreur si c'est refusé
  diffuserSalon();
}

export function ecouter(message, recevoir) {
  const abonne = { message, recevoir };
  abonnes = [...abonnes, abonne];
  return () => {
    abonnes = abonnes.filter((autre) => autre !== abonne);
  };
}
