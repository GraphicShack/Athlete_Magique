// Responsabilité : copie un texte dans le presse-papiers du navigateur.

export function copierTexte(texte) {
  return navigator.clipboard.writeText(texte);
}
