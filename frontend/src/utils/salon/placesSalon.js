/*
 * placesSalon.js : les calculs sur les places de la salle d'attente.
 *
 * Une seule chose : à partir du nombre de joueurs et de places, dire
 *   placesLibres(3, 4)                  → [4]   (les numéros des places vides)
 *   nombresImpossibles(['2','3','4'], 3) → ['2'] (on ne peut pas avoir moins de places que de joueurs)
 */
export function placesLibres(nombreJoueurs, placesMax) {
  const combien = Math.max(placesMax - nombreJoueurs, 0);
  return Array.from({ length: combien }, (_, i) => nombreJoueurs + i + 1);
}

export function nombresImpossibles(nombres, nombreJoueurs) {
  return nombres.filter((n) => Number(n) < nombreJoueurs);
}
