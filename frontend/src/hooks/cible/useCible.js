// Responsabilité : retient l'action qui attend une cible, pis l'envoie quand elle est choisie.

import { useEffect, useState } from 'react';

// actions : permises par le serveur. jouer(type, cible) : envoie l'action.
function useCible(actions, jouer) {
  const [typeEnAttente, setTypeEnAttente] = useState(null);

  // Si le serveur permet plus cette action, y'a plus de cible à choisir.
  const enAttente = actions.find(({ type, ciblesPossibles }) => ciblesPossibles && type === typeEnAttente) ?? null;

  // … pis on l'oublie, sinon la fenêtre se rouvrirait toute seule si l'action revenait.
  useEffect(() => {
    if (!enAttente) setTypeEnAttente(null);
  }, [enAttente]);

  // Un clic sur un bouton : on joue tout de suite, ou on attend la cible.
  const surAction = (type) => {
    const demandeUneCible = actions.some((action) => action.type === type && action.ciblesPossibles);
    if (demandeUneCible) setTypeEnAttente(type);
    else jouer(type);
  };

  return {
    enAttente,
    surAction,
    choisir: (idCible) => jouer(typeEnAttente, idCible),
    annuler: () => setTypeEnAttente(null),
  };
}

export default useCible;
