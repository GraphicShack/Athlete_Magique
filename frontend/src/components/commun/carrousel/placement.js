/*
 * Calculs du carrousel. Ce sont des fonctions « pures » : elles reçoivent des nombres
 * et renvoient un résultat, sans rien modifier. On peut donc les tester facilement.
 */

// Disposition des cartes (en % de la largeur d'une carte)
const ECART_CENTRE = 62; // distance entre la carte du centre et ses voisines
const ECART_COTE = 20; // distance entre deux cartes empilées sur un côté
const ROTATION = 55; // angle des cartes de côté, en degrés
const RECUL = 150; // profondeur des cartes de côté, en pixels

/**
 * Reste d'une division, toujours positif.
 * Exemples avec 10 cartes : modulo(12, 10) = 2 ; modulo(-1, 10) = 9.
 * Sert à faire « boucler » le carrousel : après la carte 9 vient la carte 0.
 */
export function modulo(nombre, total) {
  return ((nombre % total) + total) % total;
}

/**
 * Distance entre une carte et le centre, en prenant le chemin le plus court sur la boucle.
 * Exemple avec 10 cartes : la carte 9 est à -1 de la carte 0 (juste à gauche), pas à +9.
 * Le résultat est entre -5 et +5.
 */
export function ecartCirculaire(ecart, total) {
  return modulo(ecart + total / 2, total) - total / 2;
}

/**
 * Transformation CSS d'une carte selon son écart avec le centre.
 *   écart 0       → de face, au centre
 *   écart 1 ou -1 → tournée, juste à droite ou à gauche
 *   écart 2, 3…   → empilée un peu plus loin sur le côté
 * L'écart peut être décimal pendant un glisser (ex. 0,4) : la carte est alors
 * à mi-chemin, ce qui rend le mouvement fluide.
 */
export function placement(ecart) {
  const distance = Math.abs(ecart);
  const sens = ecart < 0 ? -1 : 1;

  let x;
  let profondeur;
  let angle;

  if (distance <= 1) {
    // Entre le centre et la première place de côté : on avance proportionnellement.
    x = ecart * ECART_CENTRE;
    profondeur = -RECUL * distance;
    angle = -ecart * ROTATION;
  } else {
    // Plus loin : toutes les cartes ont le même angle, et s'empilent.
    x = sens * (ECART_CENTRE + (distance - 1) * ECART_COTE);
    profondeur = -RECUL - (distance - 1) * 10;
    angle = -sens * ROTATION;
  }

  return `translateX(${x}%) translateZ(${profondeur}px) rotateY(${angle}deg)`;
}
