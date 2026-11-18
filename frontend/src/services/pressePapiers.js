// Responsabilité : copie un texte dans le presse-papiers du navigateur.
// Utilisé dans : useCopier

export function copierTexte(texte) {
  return navigator.clipboard.writeText(texte);
}
