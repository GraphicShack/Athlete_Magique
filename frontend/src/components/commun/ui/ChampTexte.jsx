/*
 * ChampTexte.jsx : un champ de saisie avec son étiquette au-dessus (pseudo, courriel, mot de passe…).
 *
 * Responsabilités :
 *   - donner le même style à tous les champs de formulaire ;
 *   - relier l'étiquette au champ : cliquer sur l'étiquette place le curseur dans le champ.
 *
 * Props :
 *   etiquette       : texte affiché au-dessus du champ
 *   etiquetteCachee : true pour ne pas afficher l'étiquette (elle reste lue par les lecteurs d'écran)
 *   autres          : transmises au champ <input> (type, placeholder, autoComplete…)
 */
import { useId } from 'react';
import { Groupe, Etiquette, Champ } from './ChampTexte.styles.js';

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
