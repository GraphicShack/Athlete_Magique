// Responsabilité : écrit la phrase complète d'un événement (phrase + cause).

import { nomJoueur, nomPersonnage } from '@/utils/journal/nomsJournal.js';
import { PHRASES } from '@/utils/journal/phrasesJournal.js';

// Les cases à préciser entre parenthèses (les autres causes sont évidentes).
const CASES = { rocher: 'rocher', etoile: 'case Étoile' };

// Ajoute la cause à la fin de la phrase : un pouvoir, un rocher ou une case Étoile.
function ajouterCause(phrase, cause) {
  const sansPoint = phrase.slice(0, -1);
  if (cause?.genre === 'pouvoir') return `${sansPoint} (pouvoir : ${nomPersonnage(cause.id)}).`;
  if (cause?.genre === 'case' && CASES[cause.id]) return `${sansPoint} (${CASES[cause.id]}).`;
  return phrase;
}

// Renvoie la phrase de l'événement ; joueurs sert à trouver les noms.
export function texteEvenement(evenement, joueurs) {
  const ecrire = PHRASES[evenement.type];
  if (!ecrire) return `Événement : ${evenement.type}.`;

  const phrase = ecrire({
    d: evenement.details ?? {},
    acteur: evenement.acteur ? nomJoueur(joueurs, evenement.acteur) : '',
    cible: evenement.cible ? nomJoueur(joueurs, evenement.cible) : '',
  });
  return ajouterCause(phrase, evenement.cause);
}
