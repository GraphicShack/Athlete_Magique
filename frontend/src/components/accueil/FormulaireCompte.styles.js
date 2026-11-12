/*
 * FormulaireCompte.styles.js : l'apparence de FormulaireCompte (FormulaireCompte.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * FormulaireCompte.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// Les éléments l'un sous l'autre.
export const Bloc = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(3)};
`;

// Bouton qui ressemble à un lien (pas encore de page de création de compte).
export const LienCreer = styled.button`
  align-self: center;
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.couleurs.encre};
  font-size: ${({ theme }) => theme.texte.sm};
  text-decoration: underline;
  text-underline-offset: 3px;
`;
