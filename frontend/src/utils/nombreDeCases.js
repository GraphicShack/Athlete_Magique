/*
 * nombreDeCases.js : écrit un nombre de cases au singulier ou au pluriel.
 *
 * Une seule chose : 1 → « 1 case », 3 → « 3 cases ».
 */
export function nombreDeCases(n) {
  return n > 1 ? `${n} cases` : `${n} case`;
}
