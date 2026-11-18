/*
 * useChoixPersonnage.js : hook qui retient le choix du personnage sur la page Sélection.
 *
 * Une seule chose : retenir la carte au centre du carrousel et le personnage choisi,
 * et donner ce qui s'en déduit.
 *
 * Utilisation :
 *   const choix = useChoixPersonnage(personnages);
 *   choix.personnageActif   : le personnage au centre du carrousel
 *   choix.choisi            : le personnage choisi, ou undefined
 *   choix.actifEstChoisi    : true si la carte du centre est celle qui est choisie
 *   choix.indexActif, choix.changerIndex : la carte au centre, et la fonction pour la changer
 *   choix.choisirActif()    : choisit le personnage du centre
 */
import { useState } from 'react';

function useChoixPersonnage(personnages) {
  const [indexActif, setIndexActif] = useState(0); // rang de la carte au centre du carrousel
  const [idChoisi, setIdChoisi] = useState(null); // id du personnage choisi (null : aucun)

  // Valeurs déduites, recalculées à chaque affichage.
  const personnageActif = personnages[indexActif];
  const choisi = personnages.find((personnage) => personnage.id === idChoisi);
  const actifEstChoisi = personnageActif.id === idChoisi;

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
