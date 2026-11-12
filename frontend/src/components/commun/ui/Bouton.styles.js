/*
 * Bouton.styles.js : l'apparence de Bouton (Bouton.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * Bouton.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled, { css } from 'styled-components';

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
export const Base = styled.button`
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
