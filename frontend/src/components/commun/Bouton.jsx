import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * Bouton de l'application.
 * variante : 'principal' (fond noir) | 'secondaire' (contour noir)
 * to       : adresse d'une page ; le bouton devient alors un lien de navigation.
 */
function Bouton({ variante = 'principal', type = 'button', to, children, ...props }) {
  const lien = to ? { as: Link, to } : { type };
  return (
    <Base $variante={variante} {...lien} {...props}>
      {children}
    </Base>
  );
}

const variantes = {
  principal: css`
    background: ${({ theme }) => theme.couleurs.encre};
    color: ${({ theme }) => theme.couleurs.surface};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.couleurs.encreDouce};
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
