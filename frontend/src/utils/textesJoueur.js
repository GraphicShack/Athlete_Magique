// Responsabilité : les petits textes d'un joueur (« Case 15 », « 3 pts », « 1re place »…).
// Utilisé dans : ClassementGeneral, ListeJoueurs, PartieTerminee, ProchaineCourse, ResultatCourse

import { obtenirPiste } from '@/services/regles.js';

// Texte de chaque état ; un perso « debout » n'affiche rien.
const ETATS = { tombe: 'tombé', elimine: 'éliminé' };

// 0 → « Départ », 15 → « Case 15 », plus de 30 → « Arrivé ».
function textePosition(position) {
  if (position === 0) return 'Départ';
  if (position > obtenirPiste().nombreCases) return 'Arrivé';
  return `Case ${position}`;
}

// 1 → « 1 pt », 3 → « 3 pts ».
export function textePoints(points) {
  return `${points} ${points > 1 ? 'pts' : 'pt'}`;
}

// 'tombe' → « tombé », 'elimine' → « éliminé », 'debout' → rien.
function texteEtat(etat) {
  return ETATS[etat] ?? '';
}

// « Félix », ou « Bot 1 (bot) ».
export function texteNom({ nom, bot }) {
  return bot ? `${nom} (bot)` : nom;
}

// Pendant la course : « Magicien · Case 12 · tombé ».
export function texteDetail({ personnage, position, etat }) {
  return [personnage.nom, textePosition(position), texteEtat(etat)].filter(Boolean).join(' · ');
}

// À la fin de la course : place 1, 2, ou null s'il n'a pas franchi la ligne.
export function textePlace(place) {
  if (place === 1) return '1re place : a franchi la ligne en premier';
  if (place === 2) return '2e place : a franchi la ligne en deuxième';
  return "N'a pas franchi la ligne";
}
