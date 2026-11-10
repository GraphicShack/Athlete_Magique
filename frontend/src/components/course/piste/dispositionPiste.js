/*
 * Géométrie de la piste : où se place chaque case dans la grille.
 * Aucune règle de jeu ici, seulement de l'affichage.
 *
 * La piste fait une boucle, dans le sens des aiguilles d'une montre :
 *
 *   [ Départ ][ 1 ][ 2 ] … [ 13 ]   ← rangée du haut, de gauche à droite
 *   [ Podium ][   Bannière   ][ 14 ]
 *   [ Podium ][   Bannière   ][ 15 ]
 *   [Arrivée ][ 30 ] … [ 17 ][ 16 ]  ← rangée du bas, de droite à gauche
 */

export const NOMBRE_CASES = 30;
export const COLONNES = 16;
export const RANGEES = 4;

const DERNIERE_CASE_DU_HAUT = 13; // cases 1 à 13
const DERNIERE_CASE_DE_DROITE = 15; // cases 14 et 15
const LARGEUR_DEPART = 3; // la case Départ occupe 3 colonnes

/** Position { colonne, rangee } d'une case numérotée de 1 à 30 (grille CSS, à partir de 1). */
export function positionCase(numero) {
  if (numero <= DERNIERE_CASE_DU_HAUT) {
    return { colonne: LARGEUR_DEPART + numero, rangee: 1 };
  }
  if (numero <= DERNIERE_CASE_DE_DROITE) {
    return { colonne: COLONNES, rangee: numero - DERNIERE_CASE_DU_HAUT + 1 };
  }
  return { colonne: COLONNES - (numero - DERNIERE_CASE_DE_DROITE - 1), rangee: RANGEES };
}

/**
 * Coin du plateau occupé par une case, ou null.
 * Les cases de coin sont arrondies pour suivre la bordure de la piste.
 * (Le Départ occupe le coin en haut à gauche, l'Arrivée celui en bas à gauche.)
 */
export function coinCase(numero) {
  if (numero === DERNIERE_CASE_DU_HAUT) return 'hautDroite';
  if (numero === DERNIERE_CASE_DE_DROITE + 1) return 'basDroite';
  return null;
}

/** Une case sur cinq est un repère qui affiche son numéro. */
export function estRepere(numero) {
  return numero % 5 === 0;
}

/** Indice de couleur (0 à 3) d'une case régulière : rose, orange, vert, bleu, puis repère. */
export function indiceCouleur(numero) {
  return (numero - 1) % 5;
}
