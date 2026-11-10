/**
 * Données de la piste tirées des règles du jeu.
 * Elles sont dans un seul fichier pour que l'affichage (la piste, la liste des joueurs…)
 * ne dépende pas des détails d'un autre composant.
 */

// La piste compte 30 cases ; au-delà de la case 30, un personnage a franchi l'arrivée.
export const NOMBRE_CASES = 30;

// Cases Étoile : s'y arrêter rapporte 1 point.
export const CASES_ETOILE = [10, 20];
