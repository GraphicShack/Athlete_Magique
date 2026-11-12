/*
 * PanneauConnexion.styles.js : l'apparence de PanneauConnexion (PanneauConnexion.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * PanneauConnexion.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// Trait horizontal avec le mot « ou » au milieu.
export const Separateur = styled.p`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espace(3)};
  margin: ${({ theme }) => theme.espace(5)} 0;
  color: ${({ theme }) => theme.couleurs.gris700};
  font-size: ${({ theme }) => theme.texte.sm};

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top: ${({ theme }) => theme.bordures.fine};
  }
`;
