/*
 * boutonsTour.js : prépare les boutons du tour en cours.
 *
 * Une seule chose : donner les boutons à afficher, prêts à montrer.
 *   1. choisir les boutons selon la phase du tour (boutonsDuTour) ;
 *   2. écrire le libellé de chacun et dire s'il est inactif (preparerBouton).
 *
 * Les phases :
 *   'lancer'  : les boutons avantLancer du personnage ;
 *   'roule'   : les mêmes qu'avant, mais inactifs (on attend le dé) ;
 *   'pouvoir' : les boutons apresLancer du personnage ;
 *   'avancer' : « Avancer de N », commun à tous ;
 *   'fini'    : aucun bouton.
 */

// Prépare un bouton :
//   - maximum : ajoute « (1 sur 2) », et rend le bouton inactif une fois le maximum atteint ;
//   - avecValeurDe : ajoute la valeur du dé (« Garder le » → « Garder le 4 »).
function preparerBouton(bouton, { obtenu, relances }) {
  let libelle = bouton.libelle;
  let inactif = false;

  if (bouton.maximum) {
    inactif = relances >= bouton.maximum;
    libelle = inactif ? `${libelle} (plus de relance)` : `${libelle} (${relances + 1} sur ${bouton.maximum})`;
  }
  if (bouton.avecValeurDe) {
    libelle = `${libelle} ${obtenu}`;
  }

  return { ...bouton, libelle, inactif };
}

export function boutonsDuTour(phase, { tour, obtenu, relances, deplacement }) {
  if (phase === 'lancer') return tour.avantLancer.map((b) => preparerBouton(b, { obtenu, relances }));
  if (phase === 'pouvoir') return tour.apresLancer.map((b) => preparerBouton(b, { obtenu, relances }));
  if (phase === 'avancer') return [{ id: 'avancer', libelle: `Avancer de ${deplacement}`, principal: true }];
  if (phase === 'roule') {
    // Les boutons de la phase d'où l'on vient, grisés.
    const boutons = relances > 0 ? tour.apresLancer : tour.avantLancer;
    return boutons.map((b) => ({ ...preparerBouton(b, { obtenu: '…', relances: relances - 1 }), inactif: true }));
  }
  return [];
}
