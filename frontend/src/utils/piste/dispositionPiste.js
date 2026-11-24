// Responsabilité : la géométrie de la piste (colonne, rangée, couleur de chaque case).

// Taille de la grille du plateau.
export const COLONNES = 8;
export const RANGEES = 4;

// Rang de chaque place sur le parcours : 0 pour le Départ, 1 à 30 pour les cases, pis la dernière place de la grille (31) pour l'Arrivée.
export const RANG_DEPART = 0;
export const RANG_ARRIVEE = COLONNES * RANGEES - 1;

// Position { colonne, rangee } (grille CSS, à partir de 1) d'une place du parcours, selon son rang.
export function positionSurPiste(rang) {
  const rangee = Math.floor(rang / COLONNES) + 1;
  const place = rang % COLONNES; // 0 à 7, dans le sens de lecture de la rangée
  // Rangées 1 et 3 : de gauche à droite. Rangées 2 et 4 : de droite à gauche.
  const colonne = rangee % 2 === 1 ? place + 1 : COLONNES - place;
  return { colonne, rangee };
}

// Position { colonne, rangee } d'une case numérotée de 1 à 30 (son rang est son numéro).
export function positionCase(numero) {
  return positionSurPiste(numero);
}

// Une case sur cinq est un repère qui affiche son numéro.
export function estRepere(numero) {
  return numero % 5 === 0;
}

// Indice de couleur d'une case : 0 à 3 pour rose, or, vert, bleu (theme.piste.cases) ; 4 tombe sur un repère.
export function indiceCouleur(numero) {
  return (numero - 1) % 5;
}

// Le saut d'une place à la suivante : de combien de colonnes (dx) pis de rangées (dy) se trouve la place de départ par rapport à la place d'arrivée.
export function sautEntre(depuis, vers) {
  const a = positionSurPiste(Math.min(depuis, RANG_ARRIVEE));
  const b = positionSurPiste(Math.min(vers, RANG_ARRIVEE));
  return { dx: a.colonne - b.colonne, dy: a.rangee - b.rangee };
}
