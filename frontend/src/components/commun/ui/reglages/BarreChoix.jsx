/*
 * BarreChoix.jsx : une barre de quelques choix côte à côte (ex. « 2 · 3 · 4 », « Humain · Bot »).
 *
 * Responsabilité : dessiner des boutons radio ordinaires comme une barre de boutons.
 * Comme ce sont de vrais boutons radio, un seul choix est possible et le clavier fonctionne.
 * Elle n'a pas de nom affiché : c'est le parent qui la nomme (ChoixSegmente, une ligne de joueur…).
 *
 * Props :
 *   options         : textes des choix, ex. ['Humain', 'Bot']
 *   valeurParDefaut : le choix coché au départ
 *   autres          : transmises au groupe (aria-label ou aria-labelledby, pour lui donner un nom)
 */
import { useId } from 'react';
import { Segments, Segment } from './BarreChoix.styles.js';

function BarreChoix({ options, valeurParDefaut, ...props }) {
  // Les boutons radio d'un même groupe doivent partager un nom unique.
  const nom = useId();

  return (
    <Segments role="radiogroup" {...props}>
      {options.map((option) => (
        <Segment key={option}>
          <input type="radio" name={nom} value={option} defaultChecked={option === valeurParDefaut} />
          <span>{option}</span>
        </Segment>
      ))}
    </Segments>
  );
}

export default BarreChoix;
