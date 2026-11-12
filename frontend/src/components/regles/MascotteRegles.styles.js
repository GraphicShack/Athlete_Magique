/*
 * MascotteRegles.styles.js : l'apparence de MascotteRegles (MascotteRegles.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * MascotteRegles.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// Arrondie en haut seulement : elle « sort » du bas de la page.
export const Image = styled.img`
  display: block;
  width: clamp(36rem, 66vw, 54rem);
  max-width: 100%; /* ne dépasse jamais la colonne qui la contient */
  height: auto;
  border-radius: ${({ theme }) => theme.rayons.md} ${({ theme }) => theme.rayons.md} 0 0;
`;
