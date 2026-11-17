/*
 * nettoyerCode.js : nettoie un code de salon tapé par le joueur.
 *
 * Une seule chose : garder seulement ce qui peut faire partie d'un code.
 *   - met en majuscules : « kz4p » → « KZ4P » ;
 *   - enlève les espaces et les caractères qui n'existent pas dans un code (0, O, 1, I, tirets…) ;
 *   - coupe à 6 caractères.
 */
import { CARACTERES_CODE, LONGUEUR_CODE } from '@/utils/salon/genererCode.js';

export function nettoyerCode(texte) {
  return [...texte.toUpperCase()]
    .filter((caractere) => CARACTERES_CODE.includes(caractere))
    .join('')
    .slice(0, LONGUEUR_CODE);
}
