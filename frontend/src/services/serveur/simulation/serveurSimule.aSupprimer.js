// Responsabilité : fait semblant d'être le serveur (à enlever quand le vrai est branché).
// Utilisé dans : serveur

import { SALON_DEPART, repondreSalon } from './salonSimule.aSupprimer.js';
import { prochaineFin, finDemandee } from './finsSimulees.aSupprimer.js';
import { repondreScores } from './scoresSimules.aSupprimer.js';

// Comme un vrai serveur, il répond jamais tout de suite.
const attendre = () => new Promise((continuer) => setTimeout(continuer, 200));

let salon = SALON_DEPART;
let abonnes = []; // [{ message, recevoir }, …]

// Envoie des données à tous ceux qui écoutent ce message.
function diffuser(message, donnees) {
  abonnes.filter((abonne) => abonne.message === message).forEach((abonne) => abonne.recevoir(donnees));
}

// À l'ouverture du site, on reçoit l'état une fois (comme un joueur qui se reconnecte).
attendre().then(() => {
  diffuser('salon:etat', salon);
  if (finDemandee) diffuser('course:fin', prochaineFin());
});

export async function demander(route) {
  await attendre();
  return repondreScores(route);
}

export async function envoyer(message, donnees) {
  await attendre();
  if (message === 'course:suivante') return;
  if (message === 'tour:action') {
    diffuser('course:fin', prochaineFin()); // ici, la course finit après un seul tour
    return;
  }
  salon = repondreSalon(salon, message, donnees); // lance une erreur si c'est refusé
  diffuser('salon:etat', salon);
}

export function ecouter(message, recevoir) {
  const abonne = { message, recevoir };
  abonnes = [...abonnes, abonne];
  return () => {
    abonnes = abonnes.filter((autre) => autre !== abonne);
  };
}
