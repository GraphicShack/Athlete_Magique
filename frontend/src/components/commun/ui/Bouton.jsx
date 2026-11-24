// Responsabilité : le bouton de l'app (rouge ou blanc), qui peut aussi être un lien vers une page.

import { Link } from 'react-router-dom';
import { Base } from './Bouton.styles.js';

// Affiche un bouton, ou un lien qui a l'air d'un bouton si on lui donne « to ».
// Props : variante ('principal' rouge | 'secondaire' blanc), to (adresse d'une page, optionnel), children (le texte), + le reste va au <button> (onClick, disabled…).
function Bouton({ variante = 'principal', type = 'button', to, children, ...props }) {
  // Avec une adresse : on affiche un <Link> qui a l'apparence du bouton. Sinon : un vrai <button>.
  const lien = to ? { as: Link, to, viewTransition: true } : { type };
  return (
    <Base $variante={variante} {...lien} {...props}>
      {children}
    </Base>
  );
}

export default Bouton;
