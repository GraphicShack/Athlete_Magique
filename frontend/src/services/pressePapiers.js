/*
 * pressePapiers.js (service) : copie un texte dans le presse-papiers du navigateur.
 *
 * Une seule chose : demander la copie au navigateur. Renvoie une promesse :
 * réussie si le texte est copié, refusée sinon (ex. la page n'est pas au premier plan).
 */
export function copierTexte(texte) {
  return navigator.clipboard.writeText(texte);
}
