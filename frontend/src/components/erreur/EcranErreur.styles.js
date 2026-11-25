// Responsabilité : définir le style de ce composant (styled-components).

import styled, { keyframes } from 'styled-components';

// Tout est centré, au milieu de l'écran.
// Pourquoi 3rem : les marges du cadre (App) ; min-height sert si le cadre lui-même a planté.
export const Ecran = styled.div`
  flex: 1;
  min-height: calc(var(--hauteur-ecran) - 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.espace(5)};
  text-align: center;

  h1 {
    font-size: clamp(5rem, 18vw, 11rem);
  }
`;

// Le perso se balance, couché comme un pion tombé.
const balancer = keyframes`
  from { rotate: 78deg; }
  to { rotate: 100deg; }
`;

export const Tombe = styled.img`
  width: clamp(7rem, 22vh, 11rem);
  aspect-ratio: 1;
  object-fit: cover;
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.ombres.cadre};
  rotate: 90deg; /* couché, même sans animation */
  animation: ${balancer} 1.4s ease-in-out infinite alternate;
`;

export const SousTitre = styled.h2`
  margin: ${({ theme }) => theme.espace(3)} 0 0;
  color: ${({ theme }) => theme.couleurs.texteSurPage};
  font-size: ${({ theme }) => theme.texte.xl};
  font-style: italic;
  font-weight: 900;
`;

export const Message = styled.p`
  max-width: 34rem;
  margin: 0;
  color: ${({ theme }) => theme.couleurs.texteSurPageDoux};
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.espace(3)};
`;
