/*
 * texteEvenement.js : écrit la phrase complète d'un événement du journal.
 *
 * Une seule chose : transformer un événement en phrase lisible.
 *   1. la phrase de base selon le type (voir utils/journal/phrasesJournal.js) ;
 *   2. la cause ajoutée à la fin, si elle est utile (ajouterCause).
 *
 * Exemple : « Angie avance de 6 cases. » → « Angie avance de 6 cases (pouvoir : Lièvre). »
 * Un type inconnu ne fait pas planter le journal : il affiche un texte de secours.
 */
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

/**
 *   evenement     : un événement au format standard
 *   nomJoueur     : fonction id → nom affiché, ex. 'j1' → « Félix (Magicien) »
 *   nomPersonnage : fonction id → nom du personnage, ex. 'lievre' → « Lièvre »
 */
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
