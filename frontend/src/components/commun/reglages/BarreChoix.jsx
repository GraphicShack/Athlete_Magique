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
import styled from 'styled-components';

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

// La barre : une pilule à contour noir qui contient les choix.
const Segments = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  width: fit-content; /* juste la largeur de ses choix, même dans une colonne */
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.rond};
  overflow: hidden;
`;

// Un choix : son bouton radio caché, et son texte.
const Segment = styled.label`
  position: relative;
  cursor: pointer;

  & + & {
    border-left: ${({ theme }) => theme.bordures.contour};
  }

  /* Le rond du bouton radio est caché ; c'est le texte qui montre le choix. */
  input {
    position: absolute;
    opacity: 0;
  }

  span {
    display: block;
    padding: ${({ theme }) => theme.espace(1.5)} ${({ theme }) => theme.espace(3)};
    background: ${({ theme }) => theme.couleurs.surface};
    font-size: ${({ theme }) => theme.texte.sm};
    transition: background ${({ theme }) => theme.transition};
  }

  /* Le choix coché prend la teinte du panneau. */
  input:checked + span {
    background: var(--teinte);
    font-weight: ${({ theme }) => theme.graisses.tresForte};
  }

  /* Choix atteint au clavier : contour à l'intérieur du segment. */
  input:focus-visible + span {
    outline: 2px solid ${({ theme }) => theme.couleurs.encre};
    outline-offset: -4px;
  }
`;

export default BarreChoix;
