// Responsabilité : nettoie le code tapé (majuscules, caractères permis, 6 max).
// Utilisé dans : useRejoindre

import { CARACTERES_CODE, LONGUEUR_CODE } from '@/utils/salon/genererCode.js';

// Garde juste les caractères permis, en majuscules, 6 max.
export function nettoyerCode(texte) {
  return [...texte.toUpperCase()]
    .filter((caractere) => CARACTERES_CODE.includes(caractere))
    .join('')
    .slice(0, LONGUEUR_CODE);
}
