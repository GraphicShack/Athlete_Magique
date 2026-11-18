// Responsabilité : garde le résultat d'une copie (copié ou erreur) pendant 2 sec.
// Utilisé dans : PanneauCode

import { useState } from 'react';
import { copierTexte } from '@/services/pressePapiers.js';

// Renvoie le résultat de la copie (null, 'copie' ou 'erreur') pis la fonction copier.
function useCopier() {
  const [etat, setEtat] = useState(null);

  // Montre le résultat, puis l'efface après 2 sec.
  const montrer = (resultat) => {
    setEtat(resultat);
    setTimeout(() => setEtat(null), 2000);
  };

  // Copie le texte, pis montre si ça a marché.
  const copier = (texte) =>
    copierTexte(texte)
      .then(() => montrer('copie'))
      .catch(() => montrer('erreur'));

  return { etat, copier };
}

export default useCopier;
