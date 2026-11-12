/*
 * Interrupteur.jsx : un réglage oui / non, affiché comme un interrupteur (ex. « Musique »).
 *
 * Responsabilité : dessiner une case à cocher ordinaire sous la forme d'un interrupteur.
 * Comme c'est une vraie case à cocher, le navigateur gère le clic et le clavier.
 *
 * Props :
 *   etiquette   : nom du réglage
 *   description : petite phrase d'aide sous le nom (optionnelle)
 *   autres      : transmises à la case à cocher (defaultChecked, checked, onChange…)
 */
import { Ligne, Textes, Nom, Aide } from './LigneReglage.js';
import { Bascule } from './Interrupteur.styles.js';

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
