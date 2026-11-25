// Responsabilité : le tour d'un joueur (ce qu'il peut faire, pis ce que ça change).

import {
  actif, autresEnCourse, changerJoueur, changerTour, enCourse, lancerUnDe, noter, parPouvoir, trouver, voisins,
} from './etat.aSupprimer.js';
import { deplacer, sArreter, trebucher } from './deplacement.aSupprimer.js';
import { finirDuel, proposerDuels, repondreAuDuel } from './duel.aSupprimer.js';

export const DEBUT_DE_TOUR = { etape: 'debut', de: { valeur: null, lancers: 0 }, cases: null, trebucheApres: false };
const RELANCES_MAX = 2;

// À quelle étape le pouvoir de chaque perso s'utilise.
const ETAPE_DU_POUVOIR = {
  hypnotiste: 'debut', partyanimal: 'debut',
  magicien: 'lancer', scientifique: 'lancer', flipflop: 'lancer',
  lievre: 'deplacement', centaure: 'deplacement',
};

// ---------- début du tour

// Le Lièvre saute son déplacement s'il est seul en tête (pas s'il reste juste lui, sinon il finirait jamais).
function lievreSeulEnTete(partie) {
  const { id, idPersonnage, position } = actif(partie);
  const autres = autresEnCourse(partie, id);
  return idPersonnage === 'lievre' && autres.length > 0 && autres.every((autre) => autre.position < position);
}

function commencer(partie) {
  const { id, etat } = actif(partie);
  const commencee = noter(partie, 'TOUR_DEBUT');
  if (etat === 'tombe') return changerTour(noter(changerJoueur(commencee, id, { etat: null }), 'RELEVE'), { etape: 'fin' });
  if (lievreSeulEnTete(partie)) return changerTour(noter(commencee, 'SAUTE', { cause: parPouvoir('lievre') }), { etape: 'fin' });
  return changerTour(commencee, { etape: 'lancer' });
}

// Téléporter est pas un déplacement : ça déclenche juste l'arrêt sur la case.
function teleporter(partie, id, position) {
  const teleporte = noter(changerJoueur(partie, id, { position }), 'TELEPORTATION', {
    acteur: id,
    cause: parPouvoir('hypnotiste'),
    details: { a: position },
  });
  return sArreter(teleporte, id);
}

// Party Animal : les autres se rapprochent de 1 case.
function rassembler(partie) {
  const { id, position } = actif(partie);
  const notee = noter(commencer(partie), 'RASSEMBLEMENT', { cause: parPouvoir('partyanimal') });
  return autresEnCourse(partie, id).reduce(
    (suite, autre) => deplacer(suite, autre.id, Math.sign(position - autre.position), { muet: true }),
    notee
  );
}

// ---------- lancer du dé

// Le résultat est fixé : on ajoute les bonus (Lièvre, Party Animal).
function fixerCases(partie, cases) {
  const { id, idPersonnage } = actif(partie);
  const bonus = { lievre: 2, partyanimal: voisins(partie, id).length };
  return changerTour(partie, { etape: 'deplacement', cases: cases + (bonus[idPersonnage] ?? 0) });
}

// Lance ou relance ; s'il reste aucun choix, on passe tout de suite au déplacement.
function lancer(partie) {
  const valeur = lancerUnDe();
  const lancers = partie.tour.de.lancers + 1;
  const relance = lancers - 1;
  const lancee = changerTour(partie, { de: { valeur, lancers } });
  const notee =
    relance > 0
      ? noter(lancee, 'DE_RELANCE', { cause: parPouvoir('magicien'), details: { valeur, relance, maximum: RELANCES_MAX } })
      : noter(lancee, 'DE_LANCE', { details: { valeur } });
  const { idPersonnage } = actif(partie);
  const resteUnChoix = idPersonnage === 'scientifique' || (idPersonnage === 'magicien' && relance < RELANCES_MAX);
  return resteUnChoix ? notee : fixerCases(notee, valeur);
}

function garder(partie) {
  const { valeur } = partie.tour.de;
  return fixerCases(noter(partie, 'DE_GARDE', { details: { valeur } }), valeur);
}

function doubler(partie) {
  const cases = partie.tour.de.valeur * 2;
  const notee = noter(partie, 'DEPLACEMENT_DOUBLE', { cause: parPouvoir('scientifique'), details: { cases } });
  return changerTour(fixerCases(notee, cases), { trebucheApres: true });
}

// Flip Flop : on échange nos cases, au lieu de lancer le dé.
function echanger(partie, cible) {
  const { id, position } = actif(partie);
  const saCase = trouver(partie, cible).position;
  const echangee = changerJoueur(changerJoueur(partie, id, { position: saCase }), cible, { position });
  const notee = noter(echangee, 'ECHANGE', { cible, cause: parPouvoir('flipflop') });
  return changerTour(sArreter(notee, cible), { etape: 'fin' });
}

// ---------- déplacement pis fin

function avancer(partie) {
  const { id, idPersonnage } = actif(partie);
  const { cases, trebucheApres, de } = partie.tour;
  // Un déplacement sans bonus est pas noté dans le journal (le double est déjà noté).
  const aUnBonus = cases > de.valeur && idPersonnage !== 'scientifique';
  const avance = deplacer(partie, id, cases, { cause: parPouvoir(idPersonnage), muet: !aUnBonus });
  const fini = trebucheApres ? trebucher(avance, id, parPouvoir('scientifique')) : avance;
  return changerTour(fini, { etape: 'fin' });
}

// Le tour passe au prochain joueur encore en course.
function finirTour(partie) {
  const rang = partie.joueurs.indexOf(actif(partie));
  const apres = [...partie.joueurs.slice(rang + 1), ...partie.joueurs.slice(0, rang + 1)];
  const { id } = apres.find(enCourse);
  return changerTour({ ...noter(partie, 'TOUR_FIN'), idActif: id }, { ...DEBUT_DE_TOUR, numero: partie.tour.numero + 1 });
}

const ACTIONS = {
  COMMENCER: commencer,
  PASSER_POUVOIR: (partie) => noter(commencer(partie), 'POUVOIR_PASSE'),
  HYPNOTISER: (partie, cible) => teleporter(commencer(partie), cible, actif(partie).position),
  RASSEMBLER: rassembler,
  LANCER: lancer,
  RELANCER: lancer,
  GARDER: garder,
  DOUBLER: doubler,
  ECHANGER: echanger,
  AVANCER: avancer,
  FINIR_TOUR: finirTour,
};

// ---------- ce que le joueur actif a le droit de faire

// Un pouvoir avec une cible : l'action existe seulement s'il y a une cible.
const avecCible = (type, ciblesPossibles) => (ciblesPossibles.length > 0 ? [{ type, ciblesPossibles }] : []);

const ACTIONS_PERMISES = {
  debut: ({ idPersonnage }, cibles) => {
    if (idPersonnage === 'partyanimal') return [{ type: 'RASSEMBLER' }];
    if (idPersonnage === 'hypnotiste' && cibles.length > 0) return [...avecCible('HYPNOTISER', cibles), { type: 'PASSER_POUVOIR' }];
    return [{ type: 'COMMENCER' }];
  },
  lancer: ({ idPersonnage }, cibles, { lancers }) => {
    if (lancers === 0) return [{ type: 'LANCER' }, ...(idPersonnage === 'flipflop' ? avecCible('ECHANGER', cibles) : [])];
    if (idPersonnage === 'magicien') return [{ type: 'RELANCER', relance: lancers, relancesMax: RELANCES_MAX }, { type: 'GARDER' }];
    return [{ type: 'DOUBLER' }, { type: 'GARDER' }];
  },
  deplacement: () => [{ type: 'AVANCER' }],
  fin: () => [{ type: 'FINIR_TOUR' }],
};

// Ajoute à la partie ce qui dépend de l'étape.
export function completer(partie) {
  const joueur = actif(partie);
  // Éliminé ou arrivé pendant son tour : son tour est fini.
  const etape = enCourse(joueur) ? partie.tour.etape : 'fin';
  const cibles = autresEnCourse(partie, joueur.id).filter(({ position }) => position !== joueur.position);
  const actions = ACTIONS_PERMISES[etape](joueur, cibles.map(({ id }) => id), partie.tour.de);
  const pouvoirActif = ETAPE_DU_POUVOIR[joueur.idPersonnage] === etape && actions[0].type !== 'COMMENCER';
  return changerTour(partie, { etape, actions: partie.finie ? [] : actions, pouvoirActif });
}

const conclure = (partie) => completer(proposerDuels(partie));

// Joue une action ; lance une erreur si elle est pas permise.
export function jouerAction(partie, type, cible) {
  const action = partie.tour.actions.find((permise) => permise.type === type);
  const cibleCorrecte = !action?.ciblesPossibles || action.ciblesPossibles.includes(cible);
  if (!action || !cibleCorrecte || partie.duel) throw new Error('Tu ne peux pas faire ça maintenant.');
  return conclure(ACTIONS[type](partie, cible));
}

export const jouerReponseDuel = (partie, accepter) => completer(repondreAuDuel(partie, accepter));
export const jouerFinDuel = (partie) => conclure(finirDuel(partie));
