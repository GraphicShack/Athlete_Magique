import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * Bouton de l'application.
 * variante : 'principal' (fond rouge) | 'secondaire' (contour noir)
 * to       : adresse d'une page ; le bouton devient alors un lien de navigation,
 *            avec la transition « rideau » entre les pages (voir styles/animations.js).
 */
function Bouton({ variante = 'principal', type = 'button', to, children, ...props }) {
  const lien = to ? { as: Link, to, viewTransition: true } : { type };
  return (
    <Base $variante={variante} {...lien} {...props}>
      {children}
    </Base>
  );
}

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

const Base = styled.button`
  display: inline-block;
  text-align: center;
  text-decoration: none;
  padding: ${({ theme }) => theme.espace(3)} ${({ theme }) => theme.espace(4)};
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.sm};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  transition: background ${({ theme }) => theme.transition};
  ${({ $variante }) => variantes[$variante]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Bouton;
