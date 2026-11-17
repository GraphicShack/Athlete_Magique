/*
 * PanneauCode.styles.js : l'apparence de PanneauCode (PanneauCode.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 */
import styled from 'styled-components';

export const Aide = styled.p`
  margin: 0 0 ${({ theme }) => theme.espace(4)};
  font-size: ${({ theme }) => theme.texte.sm};
  color: ${({ theme }) => theme.couleurs.gris700};
`;

// Les lettres côte à côte, centrées.
export const Code = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.espace(2)};
  margin-bottom: ${({ theme }) => theme.espace(4)};
`;

// Une lettre du code dans sa case, en gros caractères.
export const Lettre = styled.span`
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 3rem;
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: ${({ theme }) => theme.couleurs.gris100};
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: ${({ theme }) => theme.texte.xl};
  box-shadow: ${({ theme }) => theme.ombres.blocPetit};
`;
