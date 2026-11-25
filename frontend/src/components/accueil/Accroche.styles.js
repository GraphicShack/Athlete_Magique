// Responsabilité : définir le style de ce composant (styled-components).

import styled from 'styled-components';

// Les éléments l'un sous l'autre.
export const Bloc = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(4)};

  @media ${({ theme }) => theme.medias.ordi} {
    gap: ${({ theme }) => theme.espace(3)};
  }
`;

// Le logo du jeu, en haut de l'accroche : plus grand que dans l'en-tête des autres pages, mais à l'échelle du slogan.
export const GrandLogo = styled.img`
  display: block;
  width: clamp(11rem, 20vw, 15rem);
  height: auto;
`;

// Gros slogan en italique très gras ; sa taille suit la largeur de l'écran (max 3,25rem).
export const Slogan = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(2.25rem, 4.2vw, 3.25rem);
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
