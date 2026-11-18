// Responsabilité : invente un code de salon au hasard (ex. KZ4P7Q).
// Utilisé dans : nettoyerCode, salon, useRejoindre

// Les caractères permis : lettres et chiffres, sans 0, O, 1 et I.
export const CARACTERES_CODE = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

// Le nb de caractères d'un code.
export const LONGUEUR_CODE = 6;

// Tire « longueur » caractères au hasard parmi ceux permis.
export function genererCode(longueur = LONGUEUR_CODE) {
  let code = '';
  for (let i = 0; i < longueur; i += 1) {
    code += CARACTERES_CODE[Math.floor(Math.random() * CARACTERES_CODE.length)];
  }
  return code;
}
