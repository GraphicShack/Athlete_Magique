/*
 * de.js (service) : lance le dé.
 *
 * Une seule chose : donner le résultat d'un lancer, de 1 à 6.
 * Provisoire : tirage au hasard ici. Plus tard, c'est le serveur (le moteur de jeu)
 * qui décidera du résultat, et seule cette fonction changera.
 */
export function lancerDe() {
  return 1 + Math.floor(Math.random() * 6);
}
