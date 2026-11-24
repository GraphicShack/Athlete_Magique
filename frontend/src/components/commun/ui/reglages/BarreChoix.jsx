// Responsabilité : des boutons radio affichés comme une barre (ex. 2 · 3 · 4).
// Utilisé dans : ChoixSegmente, PanneauJoueurs, TableauHonneur

import { useId } from 'react';
import { Segments, Segment } from './BarreChoix.styles.js';

// Affiche un bouton radio par option ; onChange reçoit l'option cochée.
// Props : options (les choix : textes ou nombres), valeur (le choix coché), onChange (reçoit le choix), inactifs (choix grisés),
// libelle (fonction : le texte d'un choix, sinon le choix lui-même), + aria-label ou aria-labelledby.
function BarreChoix({ options, valeur, onChange, inactifs = [], libelle = (option) => option, ...props }) {
  // Les boutons radio d'un même groupe doivent partager un nom unique.
  const nom = useId();

  return (
    <Segments role="radiogroup" {...props}>
      {options.map((option) => (
        <Segment key={option}>
          <input
            type="radio"
            name={nom}
            value={option}
            checked={option === valeur}
            disabled={inactifs.includes(option)}
            onChange={() => onChange(option)}
          />
          <span>{libelle(option)}</span>
        </Segment>
      ))}
    </Segments>
  );
}

export default BarreChoix;
