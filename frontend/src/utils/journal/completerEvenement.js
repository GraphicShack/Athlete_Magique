/*
 * completerEvenement.js : complète un événement avec les champs par défaut.
 *
 * Une seule chose : ajouter ce qui manque (id unique, champs vides),
 * pour que chaque événement ait toujours le format standard (voir data/exemples/evenementsExemple.js).
 */

// Compteur pour donner un id unique à chaque événement.
let dernierId = 0;

export function completerEvenement(evenement) {
  dernierId += 1;
  return {
    id: `local-${dernierId}`,
    cible: null,
    cause: null,
    details: {},
    ...evenement,
  };
}
