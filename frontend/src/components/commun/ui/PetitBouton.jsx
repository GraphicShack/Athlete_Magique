/*
 * PetitBouton.jsx : un petit bouton secondaire, pour une action discrète dans une ligne
 * (ex. « Retirer », « Ajouter un bot »).
 *
 * Responsabilité : donner le même style à ces petits boutons.
 *
 * Props : transmises au bouton (onClick, aria-label…), et le texte en enfant.
 */
import { Base } from './PetitBouton.styles.js';

function PetitBouton({ children, ...props }) {
  return (
    <Base type="button" {...props}>
      {children}
    </Base>
  );
}

export default PetitBouton;
