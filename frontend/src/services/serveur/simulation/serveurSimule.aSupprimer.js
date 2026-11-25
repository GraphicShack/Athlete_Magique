// Responsabilité : fait semblant d'être le serveur (à enlever quand le vrai est branché).

import { SALON_DEPART, repondreSalon, remplirDeBots, joueursDuSalon } from './salonSimule.aSupprimer.js';
import { nouvelleSelection, persoLibre, choisir } from './selectionSimulee.aSupprimer.js';
import { jouerAction, jouerFinDuel, jouerReponseDuel } from './jeu/tour.aSupprimer.js';
import { nouvelleCourse, resultatCourse } from './jeu/course.aSupprimer.js';
import { choisirAction } from './jeu/bot.aSupprimer.js';
import { courseDemandee, partieDEssai, rapide } from './essais.aSupprimer.js';
import { finInventee } from './finsSimulees.aSupprimer.js';
import { repondreScores } from './scoresSimules.aSupprimer.js';

// En ms.
const DELAI = 200; // un vrai serveur répond jamais tout de suite
const PAUSE = rapide ? 150 : 1000; // entre 2 actions des autres, pour laisser le temps aux animations
const PAUSE_DUEL = 5000; // le temps de voir les dés rouler pis le résultat
const PAUSE_FIN = 3000; // le temps de voir le dernier pion arriver

const attendre = (duree) => new Promise((continuer) => setTimeout(continuer, duree));

// Les joueurs de la sélection directe (/selection) : ceux du salon.
const selectionDeDepart = () =>
  nouvelleSelection(1, joueursDuSalon(remplirDeBots(SALON_DEPART)), SALON_DEPART.idMoi);

let salon = SALON_DEPART;
let selection = selectionDeDepart();
let partie = partieDEssai();
let abonnes = []; // [{ message, recevoir }, …]

// ---------- parler à l'interface

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

// ---------- la sélection

// Une nouvelle sélection, pis tout le monde y va.
function commencerSelection(numero, joueurs) {
  changerSelection(nouvelleSelection(numero, joueurs, salon.idMoi));
  changerSalon({ ...salon, statut: 'selection' });
  choisirPourLesAutres();
}

// Les autres choisissent tout seuls ; quand tout le monde a choisi, la course commence.
async function choisirPourLesAutres() {
  while (selection.idChoisit !== selection.idMoi) {
    const avant = selection;
    await attendre(PAUSE);
    if (selection !== avant) return; // une autre sélection a commencé entre-temps
    if (selection.idChoisit === null) {
      commencerCourse();
      return;
    }
    changerSelection(choisir(selection, persoLibre(selection)));
  }
}

// ---------- la course

function commencerCourse() {
  const { course, joueurs, choix, idMoi } = selection;
  changerPartie(nouvelleCourse(course.numero, joueurs, choix, idMoi));
  changerSalon({ ...salon, statut: 'course' });
  faireAvancer();
}

function finirCourse() {
  diffuser('course:fin', resultatCourse(partie));
  changerSalon({ ...salon, statut: 'fin' });
}

// La prochaine chose qui se fait toute seule : { pause, faire }, ou null si c'est à moi.
function prochaineEtape() {
  const { duel, finie, idActif, idMoi } = partie;
  if (finie) return { pause: PAUSE_FIN, faire: finirCourse };
  if (duel?.valeurs) return { pause: PAUSE_DUEL, faire: () => changerPartie(jouerFinDuel(partie)) };
  if ((duel?.idDuelliste ?? idActif) === idMoi) return null;
  if (duel) return { pause: PAUSE, faire: () => changerPartie(jouerReponseDuel(partie, true)) };
  const { type, cible } = choisirAction(partie);
  return { pause: PAUSE, faire: () => changerPartie(jouerAction(partie, type, cible)) };
}

// Fait jouer les autres, jusqu'à ce que ça soit à moi ou que la course finisse.
async function faireAvancer() {
  const etape = prochaineEtape();
  if (!etape) return;
  const avant = partie;
  await attendre(etape.pause);
  if (partie !== avant) return; // une autre course a commencé entre-temps
  etape.faire();
  if (partie !== avant) faireAvancer();
}

// Ce que j'ai fait, pis la suite.
function jouer(nouvelle) {
  changerPartie(nouvelle);
  faireAvancer();
}

// ---------- les demandes de l'interface (une erreur = c'est refusé)

const DEMANDES = {
  'tour:action': ({ type, cible }) => jouer(jouerAction(partie, type, cible)),
  'duel:repondre': ({ accepter }) => jouer(jouerReponseDuel(partie, accepter)),
  'course:suivante': () => commencerSelection(partie.course.numero + 1, partie.joueurs),
  'salon:lancer': () => {
    changerSalon(remplirDeBots(salon));
    commencerSelection(1, joueursDuSalon(salon));
  },
  'selection:choisir': ({ idPersonnage }) => {
    if (selection.idChoisit !== selection.idMoi) throw new Error("C'est pas à toi de choisir.");
    changerSelection(choisir(selection, idPersonnage));
    choisirPourLesAutres();
  },
  'salon:creer': (donnees) => {
    // On repart à neuf (pis on arrête ceux qui jouaient encore).
    changerSelection(selectionDeDepart());
    changerPartie(partieDEssai());
    changerSalon(repondreSalon(salon, 'salon:creer', donnees));
  },
};

export async function envoyer(message, donnees) {
  await attendre(DELAI);
  if (DEMANDES[message]) DEMANDES[message](donnees);
  else changerSalon(repondreSalon(salon, message, donnees));
}

export async function demander(route) {
  await attendre(DELAI);
  return repondreScores(route);
}

export function ecouter(message, recevoir) {
  const abonne = { message, recevoir };
  abonnes = [...abonnes, abonne];
  return () => {
    abonnes = abonnes.filter((autre) => autre !== abonne);
  };
}

// À l'ouverture du site, on reçoit tout une fois (comme un joueur qui se reconnecte).
attendre(DELAI).then(() => {
  diffuser('salon:etat', salon);
  diffuser('selection:etat', selection);
  diffuser('partie:etat', partie);
  if (courseDemandee) diffuser('course:fin', finInventee(courseDemandee));
  choisirPourLesAutres();
  faireAvancer();
});
