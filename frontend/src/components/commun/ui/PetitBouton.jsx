// Responsabilité : un petit bouton discret (ex. « Retirer », « Ajouter un bot »).

import { Base } from './PetitBouton.styles.js';

// Affiche un petit bouton.
// Props : children (le texte), + le reste va au <button> (onClick, aria-label…).
function PetitBouton({ children, ...props }) {
  return (
    <Base type="button" {...props}>
      {children}
    </Base>
  );
}

export default PetitBouton;
