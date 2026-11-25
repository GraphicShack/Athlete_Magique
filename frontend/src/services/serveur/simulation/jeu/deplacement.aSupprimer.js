// Responsabilité : déplacer un perso pis régler tout ce que ça déclenche (cases, pouvoirs, arrivée).

import { obtenirPointage } from '@/services/regles.js';
import {
  CASE_ARRIVEE, CASES_ETOILE, autresEnCourse, changerJoueur, enCourse, noter, ordreDepuisActif, parCase, parPouvoir,
  trouver, voisins,
} from './etat.aSupprimer.js';

// La course finit à 2 arrivées, ou quand y'a plus personne sur la piste.
const verifierFin = (partie) => ({ ...partie, finie: partie.arrivees.length >= 2 || !partie.joueurs.some(enCourse) });

// Tombe (ça se cumule pas).
export function trebucher(partie, id, cause) {
  const joueur = trouver(partie, id);
  if (!enCourse(joueur) || joueur.etat === 'tombe') return partie;
  const tombe = changerJoueur(partie, id, { etat: 'tombe' });
  return noter(tombe, 'TREBUCHE', { acteur: id, cause, details: { case: joueur.position } });
}

// Éliminé : il perd aussi les points de ses étoiles de cette course.
function eliminer(partie, id, par) {
  const { points, etoiles } = trouver(partie, id);
  const elimine = changerJoueur(partie, id, { etat: 'elimine', points: points - etoiles, etoiles: 0 });
  return verifierFin(noter(elimine, 'ELIMINE', { acteur: par, cible: id, cause: parPouvoir('bouche') }));
}

// S'arrêter sur une case (aussi après une téléportation) : B.O.U.C.H.E. élimine si y'a exactement un autre perso.
export function sArreter(partie, id) {
  const joueur = trouver(partie, id);
  if (joueur.idPersonnage !== 'bouche' || !enCourse(joueur)) return partie;
  const surMaCase = voisins(partie, id);
  return surMaCase.length === 1 ? eliminer(partie, surMaCase[0].id, id) : partie;
}

// Franchit la ligne : sa place pis ses points.
function arriver(partie, id) {
  const place = partie.arrivees.length + 1;
  const { premiere, deuxieme } = obtenirPointage().find(({ course }) => course === partie.course.numero);
  const gagnes = place === 1 ? premiere : deuxieme;
  const { points, victoires } = trouver(partie, id);

  const changements = { place, pointsCourse: gagnes, points: points + gagnes, victoires: victoires + (place === 1 ? 1 : 0) };
  const arrive = { ...changerJoueur(partie, id, changements), arrivees: [...partie.arrivees, id] };
  const notee = noter(arrive, 'ARRIVEE', { acteur: id, details: { rang: place } });
  const raison = place === 1 ? '1re place' : '2e place';
  return verifierFin(noter(notee, 'POINTS', { acteur: id, details: { points: gagnes, raison } }));
}

// L'effet de la case où il finit : étoile ou rocher.
function effetDeLaCase(partie, id) {
  const { position, points, etoiles } = trouver(partie, id);
  if (CASES_ETOILE.includes(position)) {
    const etoile = changerJoueur(partie, id, { points: points + 1, etoiles: etoiles + 1 });
    return noter(etoile, 'POINTS', { acteur: id, details: { points: 1, raison: 'case Étoile' } });
  }
  return partie.rochers.includes(position) ? trebucher(partie, id, parCase('rocher')) : partie;
}

// Ce que fait le pouvoir de « moi » quand « id » vient de bouger (depasses : ceux qu'il a dépassés).
const POUVOIRS = {
  banana: (partie, moi, { id, depasses }) => (depasses.includes(moi) ? trebucher(partie, id, parPouvoir('banana')) : partie),
  centaure: (partie, moi, { id, depasses }) =>
    id === moi ? depasses.reduce((suite, autre) => deplacer(suite, autre, -2, { cause: parPouvoir('centaure') }), partie) : partie,
  bouche: (partie, moi, { id }) => (id === moi ? sArreter(partie, id) : partie),
};

const appliquerPouvoir = (partie, { id, idPersonnage }, mouvement) => {
  const pouvoir = POUVOIRS[idPersonnage];
  const peutAgir = pouvoir && !partie.finie && trouver(partie, id).etat !== 'elimine';
  return peutAgir ? pouvoir(partie, id, mouvement) : partie;
};

// Déplace un perso de « cases » (négatif = il recule). muet : pas noté dans le journal.
export function deplacer(partie, id, cases, { cause = null, muet = false } = {}) {
  const joueur = trouver(partie, id);
  const de = joueur.position;
  const a = Math.min(Math.max(de + cases, 0), CASE_ARRIVEE);
  if (partie.finie || !enCourse(joueur) || a === de) return partie;

  // Dépasser : commencer derrière pis finir devant (donc jamais en reculant).
  const depasses = autresEnCourse(partie, id).filter(({ position }) => position > de && position < a).map((autre) => autre.id);

  const bouge = { ...changerJoueur(partie, id, { position: a }), bouges: [...partie.bouges, id] };
  const type = a > de ? 'DEPLACEMENT' : 'RECUL';
  const notee = muet ? bouge : noter(bouge, type, { acteur: id, cause, details: { de, a, cases: Math.abs(a - de) } });

  // L'ordre des règles : la case, le pouvoir de celui qui joue, pis ceux des autres.
  const rendu = a === CASE_ARRIVEE ? arriver(notee, id) : effetDeLaCase(notee, id);
  return ordreDepuisActif(rendu).reduce((suite, autre) => appliquerPouvoir(suite, autre, { id, depasses }), rendu);
}
