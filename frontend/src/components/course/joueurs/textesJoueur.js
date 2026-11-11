/*
 * textesJoueur.js : petites fonctions qui transforment les données d'un joueur en texte à afficher.
 *
 * Responsabilité : écrire une seule fois les textes « Case 15 », « 3 pts », « tombé »…
 * Ce sont des fonctions « pures » : même entrée, même résultat. Faciles à lire et à tester.
 */
import { NOMBRE_CASES } from '../../../donnees/piste.js';

// Texte de chaque état ; un personnage « debout » n'affiche rien.
const ETATS = { tombe: 'tombé', elimine: 'éliminé' };

/** 0 → « Départ », 15 → « Case 15 », plus de 30 → « Arrivé ». */
export function textePosition(position) {
  if (position === 0) return 'Départ';
  if (position > NOMBRE_CASES) return 'Arrivé';
  return `Case ${position}`;
}

/** 1 → « 1 pt », 3 → « 3 pts ». */
export function textePoints(points) {
  return `${points} ${points > 1 ? 'pts' : 'pt'}`;
}

/** 'tombe' → « tombé », 'elimine' → « éliminé », 'debout' → rien. */
export function texteEtat(etat) {
  return ETATS[etat] ?? '';
}
