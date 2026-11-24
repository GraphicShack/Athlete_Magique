// Responsabilité : écrit la date d'un score (« 9 oct. », « 9 oct. 2025 », « Aujourd'hui »).

export function texteDate(texte) {
  // Un jour sans heure (« 2026-10-09 ») : on ajoute minuit, sinon JavaScript le lit à l'heure de Londres pis affiche la veille.
  const date = new Date(texte?.length === 10 ? `${texte}T00:00` : texte);
  if (!texte || Number.isNaN(date.getTime())) return '—'; // pas de date, ou illisible

  const aujourdhui = new Date();
  if (date.toDateString() === aujourdhui.toDateString()) return "Aujourd'hui";

  // L'année est montrée seulement si c'est pas celle-ci.
  const annee = date.getFullYear() === aujourdhui.getFullYear() ? undefined : 'numeric';
  return date.toLocaleDateString('fr-CA', { day: 'numeric', month: 'short', year: annee });
}
