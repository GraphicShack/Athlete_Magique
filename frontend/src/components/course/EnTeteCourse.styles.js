/*
 * EnTeteCourse.styles.js : l'apparence de EnTeteCourse (EnTeteCourse.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * EnTeteCourse.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// L'en-tête de la course (le fil des étapes y est inclus, à droite).
export const Bloc = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};
`;
