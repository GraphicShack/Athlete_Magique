/*
 * phrasesJournal.js : la phrase de base de chaque type d'événement du journal.
 *
 * Une seule chose : une phrase par type (voir data/exemples/evenementsExemple.js pour le format).
 * Pour ajouter un type : ajouter une ligne ici, sans toucher au reste.
 *
 * Chaque phrase reçoit :
 *   d             : les détails de l'événement
 *   acteur, cible : les noms à afficher, ex. « Félix (Magicien) »
 */
import { nombreDeCases } from '@/utils/nombreDeCases.js';

export const PHRASES = {
  COURSE_DEBUT: ({ d }) => `La course ${d.numero} commence.`,
  COURSE_FIN: ({ d }) => `La course ${d.numero} est terminée.`,
  TOUR_DEBUT: ({ acteur }) => `Début du tour de ${acteur}.`,
  TOUR_FIN: ({ acteur }) => `Fin du tour de ${acteur}.`,
  HYPNOSE: ({ acteur }) => `${acteur} va téléporter un personnage sur sa case.`,
  RASSEMBLEMENT: ({ acteur }) => `Tous les autres personnages se rapprochent de 1 case de ${acteur}.`,
  DE_LANCE: ({ d, acteur }) => `${acteur} lance le dé : ${d.valeur}.`,
  DE_RELANCE: ({ d, acteur }) => `${acteur} relance le dé (${d.relance} sur ${d.maximum}) : ${d.valeur}.`,
  DE_GARDE: ({ d, acteur }) => `${acteur} garde le ${d.valeur}.`,
  DEPLACEMENT_DOUBLE: ({ d, acteur }) => `${acteur} double son déplacement : ${nombreDeCases(d.cases)}, puis il trébuchera.`,
  ECHANGE_DEMANDE: ({ acteur }) => `${acteur} renonce au dé pour échanger sa place.`,
  DEPLACEMENT: ({ d, acteur }) => `${acteur} avance de ${nombreDeCases(d.cases)}, jusqu’à la case ${d.a}.`,
  RECUL: ({ d, acteur }) => `${acteur} recule de ${nombreDeCases(d.cases)}, jusqu’à la case ${d.a}.`,
  TELEPORTATION: ({ d, acteur }) => `${acteur} est téléporté sur la case ${d.a}.`,
  ECHANGE: ({ acteur, cible }) => `${acteur} échange sa place avec ${cible}.`,
  TREBUCHE: ({ d, acteur }) => `${acteur} trébuche sur la case ${d.case}.`,
  RELEVE: ({ acteur }) => `${acteur} se relève et saute son déplacement.`,
  ELIMINE: ({ acteur, cible }) => `${cible} est éliminé par ${acteur}.`,
  DUEL: ({ d, acteur, cible }) =>
    `Duel : ${acteur} ${d.valeurActeur} contre ${cible} ${d.valeurCible}. ${d.gagnant === 'acteur' ? acteur : cible} avance de 2 cases.`,
  POINTS: ({ d, acteur }) => `${acteur} gagne ${d.points} point${d.points > 1 ? 's' : ''} (${d.raison}).`,
  ARRIVEE: ({ d, acteur }) => `${acteur} franchit l’arrivée en ${d.rang === 1 ? '1re' : `${d.rang}e`} place.`,
};
