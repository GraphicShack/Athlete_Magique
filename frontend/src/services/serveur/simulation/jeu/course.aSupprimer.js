// Responsabilité : préparer une course, pis en donner le résultat.

import { CASES_ETOILE, melanger, noter } from './etat.aSupprimer.js';
import { DEBUT_DE_TOUR, completer } from './tour.aSupprimer.js';

export const NOMBRE_COURSES = 3;

// Le moins de points en premier (égalité = hasard) : pour choisir les persos, pis pour jouer.
export const duDernierAuPremier = (joueurs) => melanger(joueurs).sort((a, b) => a.points - b.points);

// 3 rochers entre les cases 5 pis 25, jamais sur une étoile.
function tirerRochers() {
  const possibles = Array.from({ length: 21 }, (_, i) => i + 5).filter((numero) => !CASES_ETOILE.includes(numero));
  return melanger(possibles).slice(0, 3).sort((a, b) => a - b);
}

// Ce que le jeu retient pendant une course.
export const COURSE_VIDE = {
  arrivees: [], // les id, dans l'ordre d'arrivée
  bouges: [], // ceux qui ont bougé pendant l'action en cours
  duel: null,
  duelsEnAttente: [],
  nombreDuels: 0,
  finie: false,
  journal: [],
};

export const JOUEUR_AU_DEPART = { position: 0, teleportations: 0, etat: null, etoiles: 0, place: null, pointsCourse: 0 };

// joueurs : { id, numero, nom, bot, points, victoires }. choix : { idJoueur, idPersonnage }.
export function nouvelleCourse(numero, joueurs, choix, idMoi) {
  const ordre = duDernierAuPremier(joueurs).map((joueur) => ({
    ...joueur,
    ...JOUEUR_AU_DEPART,
    idPersonnage: choix.find(({ idJoueur }) => idJoueur === joueur.id).idPersonnage,
  }));
  const partie = {
    ...COURSE_VIDE,
    idMoi,
    idActif: ordre[0].id,
    course: { numero, nombreCourses: NOMBRE_COURSES },
    rochers: tirerRochers(),
    joueurs: ordre,
    tour: { ...DEBUT_DE_TOUR, numero: 1 },
  };
  return completer(noter(partie, 'COURSE_DEBUT', { acteur: null, details: { numero } }));
}

// Le message « course:fin » : le classement, pis l'ordre du prochain choix.
export function resultatCourse({ course, joueurs }) {
  const meilleur = (a, b) => b.points - a.points || b.victoires - a.victoires;
  const classes = [...joueurs].sort(meilleur);

  return {
    ...course,
    joueurs: classes.map((joueur) => ({
      ...joueur,
      total: joueur.points,
      rang: 1 + classes.findIndex((autre) => meilleur(autre, joueur) === 0), // pareil si égalité
    })),
    ordreChoix: course.numero < NOMBRE_COURSES ? duDernierAuPremier(joueurs).map(({ nom }) => nom) : [],
  };
}
