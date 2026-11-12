/*
 * Curseur.styles.js : l'apparence de Curseur (Curseur.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * Curseur.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// Le curseur, au plus 12rem de large.
export const Glissiere = styled.input`
  width: min(12rem, 100%);
  accent-color: ${({ theme }) => theme.couleurs.encre}; /* couleur de la partie remplie et du bouton */
  cursor: pointer;
`;
