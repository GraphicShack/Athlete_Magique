// Responsabilité : les calculs de position des cartes du carrousel.
// Utilisé dans : Carrousel, useDefilement
// Inspiration : l'exemple « Coverflow » de Motion (motion.dev), https://images.motion.dev/examples/stage/react/gallery-odd-lights-coverflow/v-07b8c907e0fa/stage.mp4 (refait en CSS, sans la librairie).

// Disposition des cartes (en % de la largeur d'une carte)
const ECART_CENTRE = 62; // distance entre la carte du centre et ses voisines
const ECART_COTE = 20; // distance entre deux cartes empilées sur un côté
const ROTATION = 55; // angle des cartes de côté, en degrés
const RECUL = 150; // profondeur des cartes de côté, en pixels

// Reste d'une division, toujours positif.
export function modulo(nombre, total) {
  return ((nombre % total) + total) % total;
}

// Distance entre une carte pis le centre, en prenant le chemin le plus court sur la boucle.
export function ecartCirculaire(ecart, total) {
  return modulo(ecart + total / 2, total) - total / 2;
}

// Transformation CSS d'une carte selon son écart avec le centre.
export function placement(ecart) {
  const distance = Math.abs(ecart);
  const sens = ecart < 0 ? -1 : 1;

  let x;
  let profondeur;
  let angle;

  if (distance <= 1) {
    // Entre le centre pis la première place de côté : on avance proportionnellement.
    x = ecart * ECART_CENTRE;
    profondeur = -RECUL * distance;
    angle = -ecart * ROTATION;
  } else {
    // Plus loin : toutes les cartes ont le même angle, pis s'empilent.
    x = sens * (ECART_CENTRE + (distance - 1) * ECART_COTE);
    profondeur = -RECUL - (distance - 1) * 10;
    angle = -sens * ROTATION;
  }

  return `translateX(${x}%) translateZ(${profondeur}px) rotateY(${angle}deg)`;
}
