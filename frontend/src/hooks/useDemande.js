// Responsabilité : fait une demande au serveur pis garde si elle est en cours ou refusée.

import { useEffect, useState } from 'react';

// etat (optionnel) : ce qu'on a reçu du serveur ; quand il change, l'ancienne erreur est plus bonne, on l'efface.
// Renvoie enCours, erreur (le texte, ou null) pis faire(demande), qui dit true si ça a marché.
function useDemande(etat) {
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState(null);

  useEffect(() => setErreur(null), [etat]);

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
