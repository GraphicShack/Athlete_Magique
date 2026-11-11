/*
 * piste.js : les chiffres de la piste tirés des règles du jeu.
 *
 * Responsabilité : être la seule source de ces chiffres, pour que la piste,
 * la liste des joueurs et leurs textes (« Case 15 », « Arrivé ») soient toujours d'accord.
 */

// La piste compte 30 cases ; au-delà de la case 30, un personnage a franchi l'arrivée.
export const NOMBRE_CASES = 30;

// Cases Étoile : s'y arrêter rapporte 1 point.
export const CASES_ETOILE = [10, 20];
