// Responsabilité : écrit la phrase complète d'un événement (phrase + cause).

import { PHRASES } from '@/utils/journal/phrasesJournal.js';

// Les cases à préciser entre parenthèses (les autres causes sont évidentes).
const CASES = { rocher: 'rocher', etoile: 'case Étoile' };

// Ajoute la cause à la fin de la phrase : un pouvoir, un rocher ou une case Étoile.
function ajouterCause(phrase, cause, nomPersonnage) {
  const sansPoint = phrase.slice(0, -1);
  if (cause?.genre === 'pouvoir') return `${sansPoint} (pouvoir : ${nomPersonnage(cause.id)}).`;
  if (cause?.genre === 'case' && CASES[cause.id]) return `${sansPoint} (${CASES[cause.id]}).`;
  return phrase;
}

// Renvoie la phrase de l'événement ; nomJoueur pis nomPersonnage transforment un id en nom.
export function texteEvenement(evenement, { nomJoueur, nomPersonnage }) {
  const ecrire = PHRASES[evenement.type];
  if (!ecrire) return `Événement : ${evenement.type}.`;

  const phrase = ecrire({
    d: evenement.details ?? {},
    acteur: evenement.acteur ? nomJoueur(evenement.acteur) : '',
    cible: evenement.cible ? nomJoueur(evenement.cible) : '',
  });
  return ajouterCause(phrase, evenement.cause, nomPersonnage);
}
