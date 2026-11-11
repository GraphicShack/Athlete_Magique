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
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

function Bouton({ variante = 'principal', type = 'button', to, children, ...props }) {
  // Avec une adresse : on affiche un <Link> qui a l'apparence du bouton. Sinon : un vrai <button>.
  const lien = to ? { as: Link, to, viewTransition: true } : { type };
  return (
    <Base $variante={variante} {...lien} {...props}>
      {children}
    </Base>
  );
}

// Couleurs de chaque variante (normale et au survol).
const variantes = {
  principal: css`
    background: ${({ theme }) => theme.couleurs.accent};
    color: ${({ theme }) => theme.couleurs.encre};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.couleurs.accentFonce};
    }
  `,
  secondaire: css`
    background: ${({ theme }) => theme.couleurs.surface};
    color: ${({ theme }) => theme.couleurs.encre};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.couleurs.gris100};
    }
  `,
};

// Forme commune : contour noir, ombre « carton », texte gras, puis les couleurs de la variante.
const Base = styled.button`
  display: inline-block;
  text-align: center;
  text-decoration: none;
  padding: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(4)};
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.sm};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  box-shadow: ${({ theme }) => theme.ombres.blocPetit}; /* ombre noire décalée de 2 px, sans flou */
  transition:
    background ${({ theme }) => theme.transition},
    translate ${({ theme }) => theme.transition},
    box-shadow ${({ theme }) => theme.transition};
  ${({ $variante }) => variantes[$variante]}

  /* Pendant le clic : le bouton glisse de 2 px vers son ombre, et l'ombre disparaît.
     On dirait qu'il s'enfonce dans la table. */
  &:active:not(:disabled) {
    translate: 2px 2px;
    box-shadow: ${({ theme }) => theme.ombres.blocEnfonce};
  }

  /* Bouton désactivé : à moitié transparent. */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Bouton;
