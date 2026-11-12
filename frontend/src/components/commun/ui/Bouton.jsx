/*
 * Bouton.jsx : le bouton de l'application.
 *
 * Responsabilités :
 *   - donner le même style à tous les boutons, en deux variantes (principal ou secondaire) ;
 *   - s'enfoncer au clic, comme un bouton en carton qu'on presse sur la table ;
 *   - devenir un lien vers une page quand on lui donne une adresse (to), avec le rideau
 *     de couleur entre les pages (voir styles/animations/rideau.js).
 *
 * Props :
 *   variante : 'principal' (fond rouge, par défaut) ou 'secondaire' (fond blanc)
 *   to       : adresse d'une page (optionnel) ; le bouton devient alors un lien
 *   autres   : transmises au bouton (onClick, disabled…)
 */
import { Link } from 'react-router-dom';
import { Base } from './Bouton.styles.js';

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
