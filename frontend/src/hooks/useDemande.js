// Responsabilité : fait une demande au serveur pis garde si elle est en cours ou refusée.

import { useState } from 'react';

// Renvoie enCours, erreur (le texte, ou null) pis faire(demande), qui dit true si ça a marché.
function useDemande() {
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState(null);

  const faire = async (demande) => {
    setErreur(null);
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

  return { enCours, erreur, faire };
}

export default useDemande;
