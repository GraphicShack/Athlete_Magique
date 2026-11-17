/*
 * genererCode.js : invente un code de salon au hasard, ex. « KZ4P7Q ».
 *
 * Une seule chose : tirer 6 caractères au hasard.
 * On évite les caractères qui se confondent à l'oral ou à l'écrit (0 et O, 1 et I).
 * Provisoire : plus tard, c'est le serveur qui donnera le code (il doit être unique).
 */

// Les caractères permis : lettres et chiffres, sans 0, O, 1 et I.
export const CARACTERES_CODE = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

// Le nombre de caractères d'un code.
export const LONGUEUR_CODE = 6;

export function genererCode(longueur = LONGUEUR_CODE) {
  let code = '';
  for (let i = 0; i < longueur; i += 1) {
    code += CARACTERES_CODE[Math.floor(Math.random() * CARACTERES_CODE.length)];
  }
  return code;
}
