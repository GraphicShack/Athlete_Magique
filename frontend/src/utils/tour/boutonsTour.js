// Responsabilité : écrit le libellé final d'un bouton du tour pis dit s'il est grisé.
// Utilisé dans : useTourDemo

// Complète le libellé selon les options du bouton :
// avecRelances → « (1 sur 2) » ; avecValeurDe → « Garder le 4 » ; avecDeplacement → « Avancer de 6 » (bonus compris).
export function preparerBouton(bouton, { valeurDe, relances, relancesMax, cases }) {
  let libelle = bouton.libelle;
  let inactif = false;

  if (bouton.avecRelances) {
    inactif = relances >= relancesMax;
    libelle = inactif ? `${libelle} (plus de relance)` : `${libelle} (${relances + 1} sur ${relancesMax})`;
  }
  if (bouton.avecValeurDe) libelle = `${libelle} ${valeurDe}`;
  if (bouton.avecDeplacement) libelle = `${libelle} ${cases + (bouton.bonus ?? 0)}`;

  return { ...bouton, libelle, inactif };
}
