// Responsabilité : garde la carte au centre du carrousel pis le perso choisi.

import { useState } from 'react';

// Renvoie la carte au centre, le perso choisi pis les fonctions pour les changer.
function useChoixPersonnage(personnages) {
  const [indexActif, setIndexActif] = useState(0); // rang de la carte au centre du carrousel
  const [idChoisi, setIdChoisi] = useState(null); // id du personnage choisi (null : aucun)

  // Valeurs déduites, recalculées à chaque affichage.
  const personnageActif = personnages[indexActif];
  const choisi = personnages.find((personnage) => personnage.id === idChoisi);
  const actifEstChoisi = personnageActif.id === idChoisi;

  // Choisit le perso au centre.
  const choisirActif = () => setIdChoisi(personnageActif.id);

  return {
    indexActif,
    changerIndex: setIndexActif,
    idChoisi,
    personnageActif,
    choisi,
    actifEstChoisi,
    choisirActif,
  };
}

export default useChoixPersonnage;
