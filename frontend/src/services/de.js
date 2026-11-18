// Responsabilité : lance le dé (au hasard pour l'instant, le serveur plus tard).
// Utilisé dans : useLancerDe

export function lancerDe() {
  return 1 + Math.floor(Math.random() * 6);
}
