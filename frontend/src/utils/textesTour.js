/*
 * textesTour.js : petites fonctions qui préparent le message et les boutons du tour en cours.
 *
 * Responsabilité : transformer l'état du tour (phase, dé, relances) en textes et en boutons
 * prêts à afficher, pour que les composants n'aient qu'à les montrer.
 * Aucune règle de jeu ici : les boutons possibles viennent des données (data/pouvoirsAuLancer.js).
 *
 * Les phases du tour (voir hooks/useTourDemo.js) :
 *   'lancer'  : le dé n'est pas encore lancé ;
 *   'roule'   : le dé roule ;
 *   'pouvoir' : le dé est arrêté, le joueur choisit comment utiliser son pouvoir ;
 *   'avancer' : le résultat est fixé, il ne reste qu'à avancer (commun à tous) ;
 *   'fini'    : le joueur a avancé.
 */

// « 1 case », « 3 cases ».
export const cases = (n) => (n > 1 ? `${n} cases` : `${n} case`);

/**
 * Le message du tour selon la phase.
 *   tour        : { joueur, consigneAvant, consigneApres }
 *   obtenu      : valeur du dé arrêté
 *   deplacement : nombre de cases à avancer (ex. le double pour le Scientifique Fusé)
 */
export function messageDuTour(phase, { tour, obtenu, deplacement }) {
  if (phase === 'lancer') return tour.consigneAvant;
  if (phase === 'roule') return 'Le dé roule…';
  if (phase === 'pouvoir') return `${tour.joueur} a obtenu ${obtenu}. ${tour.consigneApres}`;
  if (phase === 'avancer') return `${tour.joueur} va avancer de ${cases(deplacement)}.`;
  return `${tour.joueur} avance de ${cases(deplacement)}.`;
}

/**
 * Prépare un bouton :
 *   - maximum : ajoute « (1 sur 2) » au libellé, et le rend inactif une fois le maximum atteint ;
 *   - avecValeurDe : ajoute la valeur du dé au libellé (« Garder le » → « Garder le 4 »).
 */
function preparerAction(action, { obtenu, relances }) {
  let libelle = action.libelle;
  let inactif = false;

  if (action.maximum) {
    inactif = relances >= action.maximum;
    libelle = inactif ? `${libelle} (plus de relance)` : `${libelle} (${relances + 1} sur ${action.maximum})`;
  }
  if (action.avecValeurDe) {
    libelle = `${libelle} ${obtenu}`;
  }

  return { ...action, libelle, inactif };
}

/**
 * Les boutons à montrer selon la phase :
 *   'lancer'  : les boutons avantLancer du personnage ;
 *   'roule'   : les mêmes boutons qu'avant, mais inactifs (on attend le dé) ;
 *   'pouvoir' : les boutons apresLancer du personnage ;
 *   'avancer' : « Avancer de N », commun à tous ;
 *   'fini'    : aucun bouton.
 */
export function actionsDuTour(phase, { tour, obtenu, relances, deplacement }) {
  if (phase === 'lancer') return tour.avantLancer.map((a) => preparerAction(a, { obtenu, relances }));
  if (phase === 'pouvoir') return tour.apresLancer.map((a) => preparerAction(a, { obtenu, relances }));
  if (phase === 'avancer') return [{ id: 'avancer', libelle: `Avancer de ${deplacement}`, principal: true }];
  if (phase === 'roule') {
    // Pendant que le dé roule : les boutons de la phase d'où l'on vient, grisés.
    const boutons = relances > 0 ? tour.apresLancer : tour.avantLancer;
    return boutons.map((a) => ({ ...preparerAction(a, { obtenu: '…', relances: relances - 1 }), inactif: true }));
  }
  return [];
}
