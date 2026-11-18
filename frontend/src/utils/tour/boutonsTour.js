// Responsabilité : prépare les boutons du tour selon la phase.
// Utilisé dans : useTourDemo

// Prépare un bouton : - maximum : ajoute « (1 sur 2) », pis rend le bouton inactif une fois le maximum atteint ; - avecValeurDe : ajoute la valeur du dé (« Garder le » → « Garder le 4 ») ; - avecDeplacement : ajoute le nb de cases, bonus compris (« Avancer de » → « Avancer de 6 »).
function preparerBouton(bouton, { obtenu, relances, deplacement }) {
  let libelle = bouton.libelle;
  let inactif = false;

  if (bouton.maximum) {
    inactif = relances >= bouton.maximum;
    libelle = inactif ? `${libelle} (plus de relance)` : `${libelle} (${relances + 1} sur ${bouton.maximum})`;
  }
  if (bouton.avecValeurDe) {
    libelle = `${libelle} ${obtenu}`;
  }
  if (bouton.avecDeplacement) {
    libelle = `${libelle} ${deplacement + (bouton.bonus ?? 0)}`;
  }

  return { ...bouton, libelle, inactif };
}

// Renvoie les boutons de la phase, déjà préparés.
export function boutonsDuTour(phase, { tour, obtenu, relances, deplacement }) {
  const { debut, lancer, fin } = tour.etapes;
  // Prépare chaque bouton d'une liste.
  const preparer = (boutons) => boutons.map((b) => preparerBouton(b, { obtenu, relances, deplacement }));

  if (phase === 'debut') return preparer(debut.boutons);
  if (phase === 'lancer') return preparer(lancer.avantLancer);
  if (phase === 'pouvoir') return preparer(lancer.apresLancer);
  if (phase === 'deplacement') return preparer(tour.etapes.deplacement.boutons);
  if (phase === 'fin') return preparer(fin.boutons);
  if (phase === 'roule') {
    // Les boutons de la phase d'où l'on vient, grisés.
    const boutons = relances > 0 ? lancer.apresLancer : lancer.avantLancer;
    return boutons.map((b) => ({ ...preparerBouton(b, { obtenu: '…', relances: relances - 1 }), inactif: true }));
  }
  return [];
}
