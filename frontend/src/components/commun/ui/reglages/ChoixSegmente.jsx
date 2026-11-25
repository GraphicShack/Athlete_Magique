// Responsabilité : une ligne de réglage avec son nom à gauche pis une BarreChoix à droite.

import { useId } from 'react';
import { Ligne, Textes, Nom, Aide } from './LigneReglage.js';
import BarreChoix from './BarreChoix.jsx';

// Affiche le nom du réglage, l'aide pis la barre de choix.
// Props : etiquette (nom du réglage), description (petite aide), + le reste va à BarreChoix (options, valeur, onChange…).
function ChoixSegmente({ etiquette, description, ...props }) {
  // Relie la barre à son nom, pour les lecteurs d'écran.
  const idEtiquette = useId();

  return (
    // Ici la ligne est une <div> : une <label> ne peut pas contenir plusieurs boutons radio.
    <Ligne as="div">
      <Textes>
        <Nom id={idEtiquette}>{etiquette}</Nom>
        {description && <Aide>{description}</Aide>}
      </Textes>
      <BarreChoix {...props} aria-labelledby={idEtiquette} />
    </Ligne>
  );
}

export default ChoixSegmente;
