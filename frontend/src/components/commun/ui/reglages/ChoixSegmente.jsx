// Responsabilité : une ligne de réglage avec son nom à gauche pis une BarreChoix à droite.
// Utilisé dans : ContenuParametres

import { useId } from 'react';
import { Ligne, Nom } from './LigneReglage.js';
import BarreChoix from './BarreChoix.jsx';

// Affiche le nom du réglage pis sa barre de choix.
// Props : etiquette (nom du réglage), options, valeurParDefaut.
function ChoixSegmente({ etiquette, options, valeurParDefaut }) {
  // Relie la barre à son nom, pour les lecteurs d'écran.
  const idEtiquette = useId();

  return (
    // Ici la ligne est une <div> : une <label> ne peut pas contenir plusieurs boutons radio.
    <Ligne as="div">
      <Nom id={idEtiquette}>{etiquette}</Nom>
      <BarreChoix options={options} valeurParDefaut={valeurParDefaut} aria-labelledby={idEtiquette} />
    </Ligne>
  );
}

export default ChoixSegmente;
