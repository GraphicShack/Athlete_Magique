/*
 * Curseur.jsx : un réglage d'une valeur entre un minimum et un maximum (ex. « Volume »).
 *
 * Responsabilité : afficher un curseur du navigateur (input range) aux couleurs du thème,
 * avec son nom à gauche.
 *
 * Props :
 *   etiquette   : nom du réglage
 *   description : petite phrase d'aide sous le nom (optionnelle)
 *   autres      : transmises au curseur (min, max, defaultValue, onChange…)
 */
import { Ligne, Textes, Nom, Aide } from './LigneReglage.js';
import { Glissiere } from './Curseur.styles.js';

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
