// Responsabilité : une boîte qui garde une valeur pis prévient quand elle change.
// Utilisé dans : salon

export function creerBoite(valeurDepart) {
  let valeur = valeurDepart;
  const abonnes = new Set();

  return {
    lire: () => valeur,
    // Met une nouvelle valeur dans la boîte, pis prévient tout le monde.
    changer: (nouvelle) => {
      valeur = nouvelle;
      abonnes.forEach((prevenir) => prevenir());
    },
    // Être prévenu des changements. Renvoie une fonction pour arrêter.
    abonner: (prevenir) => {
      abonnes.add(prevenir);
      return () => abonnes.delete(prevenir);
    },
  };
}
