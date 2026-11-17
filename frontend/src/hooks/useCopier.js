/*
 * useCopier.js : hook qui retient le résultat d'une copie, pour l'afficher sur un bouton.
 *
 * Une seule chose : retenir « copié » ou « erreur » pendant 2 secondes.
 * La copie elle-même est faite par services/pressePapiers.js.
 *
 * Utilisation :
 *   const { etat, copier } = useCopier();
 *   etat : null (rien), 'copie' (réussi) ou 'erreur' (refusé)
 */
import { useState } from 'react';
import { copierTexte } from '@/services/pressePapiers.js';

function useCopier() {
  const [etat, setEtat] = useState(null);

  // Montre le résultat, puis l'efface après 2 secondes.
  const montrer = (resultat) => {
    setEtat(resultat);
    setTimeout(() => setEtat(null), 2000);
  };

  const copier = (texte) =>
    copierTexte(texte)
      .then(() => montrer('copie'))
      .catch(() => montrer('erreur'));

  return { etat, copier };
}

export default useCopier;
