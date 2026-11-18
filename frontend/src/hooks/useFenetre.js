/*
 * useFenetre.js : hook qui retient si une fenêtre (FenetreModale) est ouverte ou fermée.
 *
 * Une seule chose : l'état ouvert / fermé, avec deux fonctions pour le changer.
 * Utilisé par les boutons qui ouvrent une fenêtre (Règles, Paramètres).
 *
 * Utilisation :
 *   const fenetre = useFenetre();
 *   <button onClick={fenetre.ouvrir}>Ouvrir</button>
 *   <FenetreModale ouverte={fenetre.ouverte} onFermer={fenetre.fermer}>…</FenetreModale>
 */
import { useState } from 'react';

function useFenetre() {
  const [ouverte, setOuverte] = useState(false);

  const ouvrir = () => setOuverte(true);
  const fermer = () => setOuverte(false);

  return { ouverte, ouvrir, fermer };
}

export default useFenetre;
