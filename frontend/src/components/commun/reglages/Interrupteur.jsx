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
import styled from 'styled-components';
import { Ligne, Textes, Nom, Aide } from './LigneReglage.js';

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

// La case à cocher, redessinée : on retire son apparence (appearance: none) et on dessine un rail.
const Bascule = styled.input`
  appearance: none;
  position: relative;
  flex-shrink: 0;
  width: 3.25rem;
  height: 1.75rem;
  margin: 0;
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.rond};
  background: ${({ theme }) => theme.couleurs.gris100};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition};

  /* Le bouton rond qui glisse de gauche (non) à droite (oui). */
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: ${({ theme }) => theme.rayons.rond};
    background: ${({ theme }) => theme.couleurs.encre};
    transition: translate ${({ theme }) => theme.transition};
  }

  /* Activé : le rail prend la teinte du panneau et le rond glisse à droite. */
  &:checked {
    background: var(--teinte);
  }

  &:checked::before {
    translate: 1.5rem 0;
  }
`;

export default Interrupteur;
