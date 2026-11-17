/*
 * dispositionPiste.js : la géométrie de la piste, c'est-à-dire où se place chaque case dans la grille.
 *
 * Responsabilité : calculer la colonne, la rangée et la couleur de chaque case.
 * Aucune règle de jeu ici, seulement de l'affichage. Ce sont des fonctions « pures ».
 *
 * La piste serpente sur 4 rangées de 8 : les rangées 2 et 4 se lisent de droite à gauche.
 *
 *   [Départ ][  1 ][  2 ][  3 ][  4 ][  5 ][  6 ][  7 ]   →
 *   [  15   ][ 14 ][ 13 ][ 12 ][ 11 ][ 10 ][  9 ][  8 ]   ←
 *   [  16   ][ 17 ][ 18 ][ 19 ][ 20 ][ 21 ][ 22 ][ 23 ]   →
 *   [Arrivée][ 30 ][ 29 ][ 28 ][ 27 ][ 26 ][ 25 ][ 24 ]   ←
 */

// Taille de la grille du plateau.
export const COLONNES = 8;
export const RANGEES = 4;

// Rang de chaque place sur le parcours : 0 pour le Départ, 1 à 30 pour les cases,
// et la dernière place de la grille (31) pour l'Arrivée.
export const RANG_DEPART = 0;
export const RANG_ARRIVEE = COLONNES * RANGEES - 1;

/** Position { colonne, rangee } (grille CSS, à partir de 1) d'une place du parcours, selon son rang. */
export function positionSurPiste(rang) {
  const rangee = Math.floor(rang / COLONNES) + 1;
  const place = rang % COLONNES; // 0 à 7, dans le sens de lecture de la rangée
  // Rangées 1 et 3 : de gauche à droite. Rangées 2 et 4 : de droite à gauche.
  const colonne = rangee % 2 === 1 ? place + 1 : COLONNES - place;
  return { colonne, rangee };
}

/** Position { colonne, rangee } d'une case numérotée de 1 à 30 (son rang est son numéro). */
export function positionCase(numero) {
  return positionSurPiste(numero);
}

/** Une case sur cinq est un repère qui affiche son numéro. */
export function estRepere(numero) {
  return numero % 5 === 0;
}

/** Indice de couleur d'une case : 0 à 3 pour rose, or, vert, bleu (theme.piste.cases) ; 4 tombe sur un repère. */
export function indiceCouleur(numero) {
  return (numero - 1) % 5;
}

/**
 * Le saut d'une place à la suivante : de combien de colonnes (dx) et de rangées (dy)
 * se trouve la place de départ par rapport à la place d'arrivée.
 * Ex. de la case 7 à la case 8 (fin de rangée) : { dx: 0, dy: -1 } (la case 7 est au-dessus).
 * Au-delà de la dernière case, le pion est sur l'Arrivée.
 */
export function sautEntre(depuis, vers) {
  const a = positionSurPiste(Math.min(depuis, RANG_ARRIVEE));
  const b = positionSurPiste(Math.min(vers, RANG_ARRIVEE));
  return { dx: a.colonne - b.colonne, dy: a.rangee - b.rangee };
}
