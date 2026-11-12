/*
 * regles.js (service) : le seul endroit où les composants vont chercher les chiffres
 * des règles (barème des points, nombre de cases, cases Étoile).
 *
 * Responsabilité : fournir ces chiffres aux composants, sans qu'ils sachent d'où ils viennent.
 *
 * Aujourd'hui, ils viennent du dossier data/ et sont renvoyés tout de suite (synchrone).
 * S'ils viennent plus tard du serveur ou du moteur de jeu, il faudra changer ce fichier,
 * et les composants devront gérer l'attente (chargement) et les erreurs. Ils continueront
 * quand même de passer par ce service.
 */
import POINTAGE from '@/data/pointage.js';
import { NOMBRE_CASES, CASES_ETOILE } from '@/data/piste.js';

// Les points de chaque course : [{ course, premiere, deuxieme }, …]
export function obtenirPointage() {
  return POINTAGE;
}

// La piste : { nombreCases, casesEtoile }
export function obtenirPiste() {
  return { nombreCases: NOMBRE_CASES, casesEtoile: CASES_ETOILE };
}
