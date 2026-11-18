// Responsabilité : les petits textes d'un joueur (« Case 15 », « 3 pts », « tombé »…).
// Utilisé dans : CarteJoueur

import { obtenirPiste } from '@/services/regles.js';

// Texte de chaque état ; un perso « debout » n'affiche rien.
const ETATS = { tombe: 'tombé', elimine: 'éliminé' };

// 0 → « Départ », 15 → « Case 15 », plus de 30 → « Arrivé ».
export function textePosition(position) {
  if (position === 0) return 'Départ';
  if (position > obtenirPiste().nombreCases) return 'Arrivé';
  return `Case ${position}`;
}

// 1 → « 1 pt », 3 → « 3 pts ».
export function textePoints(points) {
  return `${points} ${points > 1 ? 'pts' : 'pt'}`;
}

// 'tombe' → « tombé », 'elimine' → « éliminé », 'debout' → rien.
export function texteEtat(etat) {
  return ETATS[etat] ?? '';
}
