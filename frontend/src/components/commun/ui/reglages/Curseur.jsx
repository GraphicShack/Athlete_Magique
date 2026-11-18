// Responsabilité : un curseur (input range) aux couleurs du thème (ex. le volume).
// Utilisé dans : ContenuParametres

import { Ligne, Textes, Nom, Aide } from './LigneReglage.js';
import { Glissiere } from './Curseur.styles.js';

// Affiche le nom, l'aide pis le curseur.
// Props : etiquette, description (petite aide), + le reste va à l'<input type="range"> (min, max, value, onChange…).
function Curseur({ etiquette, description, ...props }) {
  return (
    <Ligne>
      <Textes>
        <Nom>{etiquette}</Nom>
        {description && <Aide>{description}</Aide>}
      </Textes>
      <Glissiere type="range" {...props} />
    </Ligne>
  );
}

export default Curseur;
