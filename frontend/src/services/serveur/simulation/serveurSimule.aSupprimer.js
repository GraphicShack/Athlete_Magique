// Responsabilité : fait semblant d'être le serveur (à enlever quand le vrai est branché).

import { SALON_DEPART, repondreSalon } from './salonSimule.aSupprimer.js';
import { nouvelleSelection, premierLibre, choisir } from './selectionSimulee.aSupprimer.js';
import { nouvellePartie, jouerAction } from './partieSimulee.aSupprimer.js';
import { courseDemandee, finDeCourse } from './finsSimulees.aSupprimer.js';
import { repondreScores } from './scoresSimules.aSupprimer.js';

const DELAI = 200; // ms : comme un vrai serveur, il répond jamais tout de suite
const PAUSE = 1000; // ms entre 2 actions des autres, pour laisser le temps aux animations

const attendre = (duree) => new Promise((continuer) => setTimeout(continuer, duree));

let salon = SALON_DEPART;
let selection = nouvelleSelection(1);
let partie = nouvellePartie(courseDemandee || 1);
let abonnes = []; // [{ message, recevoir }, …]

// Envoie des données à tous ceux qui écoutent ce message.
function diffuser(message, donnees) {
  abonnes.filter((abonne) => abonne.message === message).forEach((abonne) => abonne.recevoir(donnees));
}

function changerSalon(nouveau) {
  salon = nouveau;
  diffuser('salon:etat', salon);
}

function changerSelection(nouvelle) {
  selection = nouvelle;
  diffuser('selection:etat', selection);
}

function changerPartie(nouvelle) {
  partie = nouvelle;
  diffuser('partie:etat', partie);
}

// Une nouvelle sélection, pis tout le monde y va.
function commencerSelection(numero) {
  changerSelection(nouvelleSelection(numero));
  changerSalon({ ...salon, statut: 'selection' });
  choisirPourLesAutres();
}

// Les autres choisissent tout seuls ; quand tout le monde a choisi, on va à la course.
async function choisirPourLesAutres() {
  while (selection.idChoisit !== selection.idMoi) {
    const avant = selection;
    await attendre(PAUSE);
    if (selection !== avant) return; // une autre sélection a commencé entre-temps
    if (selection.idChoisit === null) {
      changerPartie(nouvellePartie(selection.course.numero, selection.choix));
      changerSalon({ ...salon, statut: 'course' });
      return;
    }
    changerSelection(choisir(selection, premierLibre(selection)));
  }
}

// Après mon tour : les autres jouent tout seuls, pis la course finit quand ça revient à moi.
async function jouerLesAutres() {
  while (partie.idActif !== partie.idMoi) {
    const avant = partie;
    await attendre(PAUSE);
    if (partie !== avant) return; // une autre partie a commencé entre-temps
    const { actions } = partie.tour;
    const choix = actions.find(({ type }) => type === 'GARDER') ?? actions[0];
    changerPartie(jouerAction(partie, choix.type));
  }
  await attendre(PAUSE);
  diffuser('course:fin', finDeCourse(partie.course.numero));
}

// À l'ouverture du site, on reçoit tout une fois (comme un joueur qui se reconnecte).
attendre(DELAI).then(() => {
  diffuser('salon:etat', salon);
  diffuser('selection:etat', selection);
  diffuser('partie:etat', partie);
  choisirPourLesAutres();
  if (courseDemandee) diffuser('course:fin', finDeCourse(courseDemandee));
});

export async function demander(route) {
  await attendre(DELAI);
  return repondreScores(route);
}

export async function envoyer(message, donnees) {
  await attendre(DELAI);

  if (message === 'tour:action') {
    changerPartie(jouerAction(partie, donnees.type)); // lance une erreur si c'est refusé
    if (donnees.type === 'FINIR_TOUR') jouerLesAutres();
    return;
  }
  if (message === 'course:suivante') {
    commencerSelection(partie.course.numero + 1);
    return;
  }
  if (message === 'salon:lancer') {
    commencerSelection(1);
    return;
  }
  if (message === 'selection:choisir') {
    if (selection.idChoisit !== selection.idMoi) throw new Error("C'est pas à toi de choisir.");
    changerSelection(choisir(selection, donnees.idPersonnage));
    choisirPourLesAutres();
    return;
  }

  changerSalon(repondreSalon(salon, message, donnees)); // lance une erreur si c'est refusé
}

export function ecouter(message, recevoir) {
  const abonne = { message, recevoir };
  abonnes = [...abonnes, abonne];
  return () => {
    abonnes = abonnes.filter((autre) => autre !== abonne);
  };
}
