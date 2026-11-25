// Responsabilité : la partie de départ, avec les essais demandés dans l'adresse.

import PARTIE_EXEMPLE from '@/data/exemples/partieExemple.aSupprimer.js';
import { changerJoueur } from './jeu/etat.aSupprimer.js';
import { DEBUT_DE_TOUR, completer } from './jeu/tour.aSupprimer.js';
import { COURSE_VIDE, JOUEUR_AU_DEPART, NOMBRE_COURSES } from './jeu/course.aSupprimer.js';

// /course?personnage=scientifique : je joue ce perso.
// /course?attente : c'est le tour d'un autre (?attente=bot : d'un bot).
// /course?duel : je suis le Duelliste (?duel=autre : c'est Angie).
// /fin-course?course=1 (ou 2, 3) : l'écran de fin, sans jouer.
// ?rapide : les autres jouent vite.
const adresse = new URLSearchParams(window.location.search);

export const courseDemandee = Number(adresse.get('course'));
export const rapide = adresse.has('rapide');

const changerSi = (condition, partie, id, changements) => (condition ? changerJoueur(partie, id, changements) : partie);

function essayerDuel(partie) {
  const duel = adresse.get('duel');
  if (duel === null) return partie;
  const [idDuelliste, idCible] = duel === 'autre' ? ['j2', 'j1'] : ['j1', 'j2'];
  const memeCase = changerJoueur(changerJoueur(partie, idCible, { position: 12 }), idDuelliste, {
    position: 12,
    idPersonnage: 'duelliste',
  });
  return { ...memeCase, duel: { id: 'd0', idDuelliste, idCible, valeurs: null, gagnant: null } };
}

// Une course déjà commencée, pour ouvrir /course directement.
export function partieDEssai() {
  const attente = adresse.get('attente');
  const perso = adresse.get('personnage');
  const partie = {
    ...COURSE_VIDE,
    ...PARTIE_EXEMPLE,
    idMoi: attente === null ? PARTIE_EXEMPLE.idMoi : 'j2',
    course: { numero: courseDemandee || 1, nombreCourses: NOMBRE_COURSES },
    joueurs: PARTIE_EXEMPLE.joueurs.map((joueur) => ({ ...JOUEUR_AU_DEPART, victoires: 0, ...joueur })),
    tour: { ...DEBUT_DE_TOUR, numero: 5 },
  };
  const avecPerso = changerSi(perso, partie, partie.idActif, { idPersonnage: perso });
  const avecBot = changerSi(attente === 'bot', avecPerso, partie.idActif, { nom: 'Bot 1', bot: true });
  return completer(essayerDuel(avecBot));
}
