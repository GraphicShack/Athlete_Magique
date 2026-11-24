// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// Petit bouton blanc à contour noir, avec une petite ombre.
export const Base = styled.button`
  padding: ${({ theme }) => theme.espace(1)} ${({ theme }) => theme.espace(3)};
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: ${({ theme }) => theme.couleurs.surface};
  font-size: ${({ theme }) => theme.texte.xs};
  font-weight: ${({ theme }) => theme.graisses.forte};
  box-shadow: ${({ theme }) => theme.ombres.blocPetit};
`;
