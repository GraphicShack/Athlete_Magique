// Responsabilité : le message à montrer quand y'a pas de scores à afficher.

// Renvoie le message, ou null s'il y a des scores à montrer.
export function messageScores(etat, nombre) {
  if (etat === 'chargement') return 'Chargement des scores…';
  if (etat === 'erreur') return 'Impossible de charger les scores.';
  if (nombre === 0) return "Aucun score pour l'instant.";
  return null;
}
