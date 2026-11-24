// Responsabilité : fait une demande au serveur pis garde si elle est en cours ou refusée.

import { useState } from 'react';

// Renvoie enCours, erreur (le texte, ou null), faire(demande), qui dit true si ça a marché, pis effacer (l'erreur).
function useDemande() {
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState(null);

  const effacer = () => setErreur(null);

  const faire = async (demande) => {
    effacer();
    setEnCours(true);
    try {
      await demande();
      return true;
    } catch (probleme) {
      setErreur(probleme.message);
      return false;
    } finally {
      setEnCours(false);
    }
  };

  return { enCours, erreur, faire, effacer };
}

export default useDemande;
