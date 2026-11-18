// Responsabilité : des boutons radio affichés comme une barre (ex. 2 · 3 · 4).
// Utilisé dans : ChoixSegmente, PanneauJoueurs

import { useId } from 'react';
import { Segments, Segment } from './BarreChoix.styles.js';

// Affiche un bouton radio par option ; onChange reçoit l'option cochée.
// Props : options (textes des choix), valeurParDefaut, onChange (reçoit le choix), inactifs (choix grisés), + aria-label ou aria-labelledby.
function BarreChoix({ options, valeurParDefaut, onChange, inactifs = [], ...props }) {
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
            defaultChecked={option === valeurParDefaut}
            disabled={inactifs.includes(option)}
            onChange={() => onChange?.(option)}
          />
          <span>{option}</span>
        </Segment>
      ))}
    </Segments>
  );
}

export default BarreChoix;
