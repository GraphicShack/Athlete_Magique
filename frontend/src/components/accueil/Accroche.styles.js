/*
 * Accroche.styles.js : l'apparence de Accroche (Accroche.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * Accroche.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

// Les éléments l'un sous l'autre.
export const Bloc = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(5)};
`;

// Grand slogan en italique très gras ; sa taille suit la largeur de l'écran.
export const Slogan = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(2.5rem, 6vw, 4.25rem);
  font-style: italic;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
`;

// Une ligne du slogan, dans une couleur de la palette (ex. $couleur="jaune").
export const Ligne = styled.span`
  display: block;
  color: ${({ theme, $couleur }) => theme.palette[$couleur]};
`;

// Court texte en gris clair, sur une largeur limitée pour rester lisible.
export const Texte = styled.p`
  margin: 0;
  max-width: 36rem;
  font-size: ${({ theme }) => theme.texte.lg};
  color: ${({ theme }) => theme.couleurs.texteSurPageDoux};
`;
