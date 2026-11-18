// Responsabilité : écrit « 1 case » ou « 3 cases ».
// Utilisé dans : etapesTour, phrasesJournal

export function nombreDeCases(n) {
  return n > 1 ? `${n} cases` : `${n} case`;
}
