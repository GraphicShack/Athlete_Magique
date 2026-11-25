// Responsabilité : fait semblant d'être la logique du jeu (un tour simple, pas toutes les règles).

import PARTIE_EXEMPLE from '@/data/exemples/partieExemple.aSupprimer.js';

// Pour essayer : /course?personnage=scientifique, /course?attente (tour d'un autre), /course?attente=bot.
const parametres = new URLSearchParams(window.location.search);

// À quelle étape le pouvoir de chaque perso s'utilise.
const ETAPE_DU_POUVOIR = {
  hypnotiste: 'debut', partyanimal: 'debut',
  magicien: 'lancer', scientifique: 'lancer', flipflop: 'lancer',
  lievre: 'deplacement', centaure: 'deplacement',
};

const DEBUT_DE_TOUR = { etape: 'debut', de: { valeur: null, lancers: 0 }, cases: null };
const RELANCES_MAX = 2;

const actif = (partie) => partie.joueurs.find((joueur) => joueur.id === partie.idActif);

// ---------- petits changements (chacun renvoie une nouvelle partie)

const changerTour = (partie, changements) => ({ ...partie, tour: { ...partie.tour, ...changements } });

const changerJoueur = (partie, id, changements) => ({
  ...partie,
  joueurs: partie.joueurs.map((joueur) => (joueur.id === id ? { ...joueur, ...changements } : joueur)),
});

const changerActif = (partie, changements) => changerJoueur(partie, partie.idActif, changements);

const position = (partie, id) => partie.joueurs.find((joueur) => joueur.id === id).position;

const noter = (partie, type, details = {}, parPouvoir = false, qui = {}) => ({
  ...partie,
  journal: [
    ...partie.journal,
    {
      id: `e${partie.journal.length + 1}`,
      course: partie.course.numero,
      tour: partie.tour.numero,
      etape: partie.tour.etape,
      type,
      acteur: partie.idActif,
      cible: null,
      cause: parPouvoir ? { genre: 'pouvoir', id: actif(partie).idPersonnage } : null,
      details,
      ...qui,
    },
  ],
});

// Le résultat est fixé : on passe au déplacement (+ 2 pour le Lièvre).
const fixerCases = (partie, cases) =>
  changerTour(partie, { etape: 'deplacement', cases: cases + (actif(partie).idPersonnage === 'lievre' ? 2 : 0) });

// Commence le tour ; un perso tombé se relève pis saute son déplacement.
function commencer(partie) {
  const commencee = noter(partie, 'TOUR_DEBUT');
  if (actif(partie).etat !== 'tombe') return changerTour(commencee, { etape: 'lancer' });
  return changerTour(noter(changerActif(commencee, { etat: null }), 'RELEVE'), { etape: 'fin' });
}

// Lance ou relance le dé ; s'il reste aucun choix, on passe tout de suite au déplacement.
function lancer(partie) {
  const valeur = 1 + Math.floor(Math.random() * 6);
  const lancers = partie.tour.de.lancers + 1;
  const relance = lancers - 1;
  const lancee = changerTour(partie, { de: { valeur, lancers } });
  const notee =
    relance > 0
      ? noter(lancee, 'DE_RELANCE', { valeur, relance, maximum: RELANCES_MAX }, true)
      : noter(lancee, 'DE_LANCE', { valeur });
  const perso = actif(partie).idPersonnage;
  const resteUnChoix = perso === 'scientifique' || (perso === 'magicien' && relance < RELANCES_MAX);
  return resteUnChoix ? notee : fixerCases(notee, valeur);
}

function avancer(partie) {
  const { position: de, idPersonnage } = actif(partie);
  const { cases } = partie.tour;
  const a = de + cases;
  const parPouvoir = ETAPE_DU_POUVOIR[idPersonnage] === 'deplacement';
  // Un déplacement sans pouvoir est pas noté dans le journal.
  const notee = parPouvoir ? noter(partie, 'DEPLACEMENT', { de, a, cases }, true) : partie;
  return changerTour(changerActif(notee, { position: a }), { etape: 'fin' });
}

// Hypnotiste : la cible arrive sur ma case.
function hypnotiser(partie, cible) {
  const a = actif(partie).position;
  const commencee = commencer(partie);
  return noter(changerJoueur(commencee, cible, { position: a }), 'TELEPORTATION', { a }, true, { acteur: cible });
}

// Flip Flop : on échange nos cases, au lieu de lancer le dé.
function echanger(partie, cible) {
  const [maCase, saCase] = [actif(partie).position, position(partie, cible)];
  const echangee = changerJoueur(changerActif(partie, { position: saCase }), cible, { position: maCase });
  return changerTour(noter(echangee, 'ECHANGE', {}, true, { cible }), { etape: 'fin' });
}

// Le tour passe au joueur suivant.
function finirTour(partie) {
  const rang = partie.joueurs.indexOf(actif(partie));
  const suivant = partie.joueurs[(rang + 1) % partie.joueurs.length];
  return changerTour({ ...noter(partie, 'TOUR_FIN'), idActif: suivant.id }, { ...DEBUT_DE_TOUR, numero: partie.tour.numero + 1 });
}

const ACTIONS = {
  COMMENCER: commencer,
  PASSER_POUVOIR: commencer,
  HYPNOTISER: hypnotiser,
  RASSEMBLER: (partie) => noter(commencer(partie), 'RASSEMBLEMENT', {}, true),
  LANCER: lancer,
  RELANCER: lancer,
  GARDER: (partie) => fixerCases(noter(partie, 'DE_GARDE', { valeur: partie.tour.de.valeur }), partie.tour.de.valeur),
  DOUBLER: (partie) => {
    const cases = partie.tour.de.valeur * 2;
    return fixerCases(noter(partie, 'DEPLACEMENT_DOUBLE', { cases }, true), cases);
  },
  ECHANGER: echanger,
  AVANCER: avancer,
  FINIR_TOUR: finirTour,
};

// ---------- ce que le joueur actif a le droit de faire

function actionsPermises(partie) {
  const { etape, de } = partie.tour;
  const perso = actif(partie).idPersonnage;
  const ciblesPossibles = partie.joueurs.map(({ id }) => id).filter((id) => id !== partie.idActif);
  if (etape === 'deplacement') return [{ type: 'AVANCER' }];
  if (etape === 'fin') return [{ type: 'FINIR_TOUR' }];
  if (etape === 'debut') {
    if (perso === 'hypnotiste') return [{ type: 'HYPNOTISER', ciblesPossibles }, { type: 'PASSER_POUVOIR' }];
    if (perso === 'partyanimal') return [{ type: 'RASSEMBLER' }];
    return [{ type: 'COMMENCER' }];
  }
  if (de.lancers === 0) return perso === 'flipflop' ? [{ type: 'LANCER' }, { type: 'ECHANGER', ciblesPossibles }] : [{ type: 'LANCER' }];
  if (perso === 'magicien') return [{ type: 'RELANCER', relance: de.lancers, relancesMax: RELANCES_MAX }, { type: 'GARDER' }];
  return [{ type: 'DOUBLER' }, { type: 'GARDER' }];
}

// Ajoute à la partie ce qui dépend de l'étape.
const completer = (partie) =>
  changerTour(partie, {
    pouvoirActif: ETAPE_DU_POUVOIR[actif(partie).idPersonnage] === partie.tour.etape,
    actions: actionsPermises(partie),
  });

// ---------- utilisé par le serveur simulé

// choix : les persos choisis à la sélection (aucun si on ouvre /course directement).
export function nouvellePartie(numero, choix = []) {
  const attente = parametres.get('attente');
  const partie = {
    ...PARTIE_EXEMPLE,
    joueurs: PARTIE_EXEMPLE.joueurs.map((joueur) => ({
      ...joueur,
      idPersonnage: choix.find(({ idJoueur }) => idJoueur === joueur.id)?.idPersonnage ?? joueur.idPersonnage,
    })),
    journal: choix.length > 0 ? [] : PARTIE_EXEMPLE.journal,
    idMoi: attente === null ? PARTIE_EXEMPLE.idMoi : 'j2',
    course: { numero, nombreCourses: 3 },
    tour: { ...DEBUT_DE_TOUR, numero: 5 },
  };
  const perso = parametres.get('personnage');
  const essai = { ...(perso && { idPersonnage: perso }), ...(attente === 'bot' && { nom: 'Bot 1', bot: true }) };
  return completer(changerActif(partie, essai));
}

// Joue une action ; lance une erreur si elle est pas permise.
export function jouerAction(partie, type, cible) {
  const action = partie.tour.actions.find((permise) => permise.type === type);
  const cibleCorrecte = !action?.ciblesPossibles || action.ciblesPossibles.includes(cible);
  if (!action || !cibleCorrecte) throw new Error('Tu ne peux pas faire ça maintenant.');
  return completer(ACTIONS[type](partie, cible));
}
