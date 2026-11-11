/*
 * pointage.js : les points gagnés à chaque course, pour la 1re et la 2e place.
 *
 * Responsabilité : fournir le barème à afficher (tableau des règles, bilan de fin de course).
 * Le calcul des points est fait par le moteur de jeu, pas ici.
 */
const POINTAGE = [
  { course: 1, premiere: 3, deuxieme: 1 },
  { course: 2, premiere: 4, deuxieme: 2 },
  { course: 3, premiere: 5, deuxieme: 3 },
];

export default POINTAGE;
