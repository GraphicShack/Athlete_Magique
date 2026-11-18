// Responsabilité : les calculs sur les places du salon (places libres, choix impossibles).
// Utilisé dans : ConfigurationPage

export function placesLibres(nombreJoueurs, placesMax) {
  const combien = Math.max(placesMax - nombreJoueurs, 0);
  return Array.from({ length: combien }, (_, i) => nombreJoueurs + i + 1);
}

// Les nb de places plus petits que le nb de joueurs (ex. '2' s'il y a 3 joueurs).
export function nombresImpossibles(nombres, nombreJoueurs) {
  return nombres.filter((n) => Number(n) < nombreJoueurs);
}
