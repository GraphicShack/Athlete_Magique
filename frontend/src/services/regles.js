// Responsabilité : donne les chiffres des règles (points, piste) aux composants.
// Utilisé dans : ContenuRegles, Piste, ProchaineCourse, textesJoueur

import POINTAGE from '@/data/regles/pointage.js';
import { NOMBRE_CASES, CASES_ETOILE } from '@/data/regles/piste.js';

// Les points de chaque course : [{ course, premiere, deuxieme }, …]
export function obtenirPointage() {
  return POINTAGE;
}

// La piste : { nombreCases, casesEtoile }
export function obtenirPiste() {
  return { nombreCases: NOMBRE_CASES, casesEtoile: CASES_ETOILE };
}
