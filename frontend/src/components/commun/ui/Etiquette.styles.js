/*
 * Etiquette.styles.js : l'apparence de Etiquette (Etiquette.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * Etiquette.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// Pilule blanche à contour noir ; le texte ne passe jamais à la ligne.
export const Pilule = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.espace(1)} ${({ theme }) => theme.espace(3)};
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.rond};
  background: ${({ theme }) => theme.couleurs.surface};
  color: ${({ theme }) => theme.couleurs.encre};
  font-size: ${({ theme }) => theme.texte.sm};
  font-weight: ${({ theme }) => theme.graisses.forte};
  white-space: nowrap;
`;
