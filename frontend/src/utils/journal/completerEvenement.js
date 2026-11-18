// Responsabilité : ajoute ce qui manque à un événement (id, champs vides).
// Utilisé dans : journal

// Compteur pour donner un id unique à chaque événement.
let dernierId = 0;

// Renvoie l'événement avec un id unique pis les champs manquants.
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
