// Responsabilité : une case à cocher affichée comme un interrupteur on/off.

import { Ligne, Textes, Nom, Aide } from './LigneReglage.js';
import { Bascule } from './Interrupteur.styles.js';

// Affiche le nom, l'aide pis l'interrupteur.
// Props : etiquette, description (petite aide), + le reste va à la case à cocher (checked, onChange…).
function Interrupteur({ etiquette, description, ...props }) {
  return (
    <Ligne>
      <Textes>
        <Nom>{etiquette}</Nom>
        {description && <Aide>{description}</Aide>}
      </Textes>
      <Bascule type="checkbox" role="switch" {...props} />
    </Ligne>
  );
}

export default Interrupteur;
