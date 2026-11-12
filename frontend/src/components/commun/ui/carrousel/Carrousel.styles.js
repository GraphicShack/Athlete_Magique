/*
 * Carrousel.styles.js : l'apparence de Carrousel (Carrousel.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * Carrousel.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled, { css } from 'styled-components';
import { COURBE } from '@/styles/animations/animations.js';

// Flèche gauche, scène, flèche droite.
export const Cadre = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: ${({ theme }) => theme.espace(2)};
`;

// La scène donne la perspective ; les diapositives sont toutes posées au centre, puis décalées.
export const Scene = styled.div`
  position: relative;
  height: 30rem;
  perspective: 1400px;
  overflow: hidden;
  cursor: grab;
  touch-action: pan-y; /* sur téléphone, le glisser vertical fait défiler la page */
  overscroll-behavior-x: contain; /* le pavé tactile ne déclenche pas « page précédente » */
  user-select: none; /* le glisser ne sélectionne pas de texte */
  border-radius: ${({ theme }) => theme.rayons.lg};

  &:active {
    cursor: grabbing;
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.bordures.contour};
    outline-offset: 4px;
  }
`;

// Une carte : posée au centre de la scène, puis déplacée par « transform » (voir utils/placement.js).
export const Diapo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${({ $largeur }) => $largeur};
  max-width: 80%;
  height: 27rem;
  margin-top: -13.5rem;
  margin-left: calc(${({ $largeur }) => $largeur} / -2);
  transform-style: preserve-3d;
  /* Pendant un glisser, les cartes suivent sans délai ; sinon elles glissent en douceur. */
  transition: ${({ $enMouvement }) =>
    $enMouvement
      ? 'opacity 300ms ease, filter 300ms ease'
      : `transform 550ms ${COURBE}, opacity 300ms ease, filter 300ms ease`};
  cursor: ${({ $auCentre }) => ($auCentre ? 'default' : 'pointer')};

  /* La carte remplit la diapositive. */
  & > * {
    height: 100%;
    box-shadow: ${({ theme }) => theme.ombres.douce};
  }

  /* Les cartes de côté sont un peu plus sombres. */
  ${({ $auCentre }) =>
    !$auCentre &&
    css`
      filter: brightness(0.92);
    `}

  /* Les cartes trop loin du centre sont invisibles et ne réagissent pas au clic. */
  ${({ $cachee }) =>
    $cachee &&
    css`
      opacity: 0;
      pointer-events: none;
    `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// Boutons ronds ‹ et ›.
export const Fleche = styled.button`
  width: 2.75rem;
  height: 2.75rem;
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.rond};
  background: ${({ theme }) => theme.couleurs.surface};
  font-size: ${({ theme }) => theme.texte.xl};
  line-height: 1;

  &:hover {
    background: ${({ theme }) => theme.couleurs.gris100};
  }
`;
