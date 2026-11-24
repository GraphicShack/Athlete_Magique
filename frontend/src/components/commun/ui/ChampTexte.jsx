// Responsabilité : un champ texte avec son étiquette en haut.

import { useId } from 'react';
import { Groupe, Etiquette, Champ } from './ChampTexte.styles.js';

// Affiche l'étiquette pis le champ, reliés ensemble.
// Props : etiquette (le texte au-dessus), etiquetteCachee (true = cachée mais lue par les lecteurs d'écran), + le reste va au <input>.
function ChampTexte({ etiquette, etiquetteCachee = false, ...props }) {
  // Identifiant unique, généré par React, qui relie l'étiquette (htmlFor) au champ (id).
  const id = useId();

  return (
    <Groupe>
      <Etiquette htmlFor={id} $cachee={etiquetteCachee}>
        {etiquette}
      </Etiquette>
      <Champ id={id} type="text" {...props} />
    </Groupe>
  );
}

export default ChampTexte;
