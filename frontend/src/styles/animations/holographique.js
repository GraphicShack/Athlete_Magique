// Responsabilité : le reflet holographique qui traverse un bouton au survol.
// Inspiration : l'effet « Holographic card » de Prismic, https://prismic.io/blog/css-hover-effects (code refait pour le projet).

import { css } from 'styled-components';

// Une couleur de la palette, à moitié transparente (le texte reste lisible).
const voile = (couleur) => css`color-mix(in srgb, ${({ theme }) => theme.palette[couleur]} 60%, transparent)`;

// Le style à mettre dans un bouton.
// isolation + z-index : -1 : le reflet passe par-dessus le fond, mais en dessous du texte.
export const holographique = css`
  position: relative;
  isolation: isolate;
  overflow: hidden;

  /* Le reflet : un carré plus grand que le bouton, incliné, caché au départ. */
  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    left: -25%;
    top: 50%;
    width: 150%;
    aspect-ratio: 1;
    background: linear-gradient(transparent 22%, ${voile('jaune')}, ${voile('cyan')}, ${voile('rose')}, transparent 78%);
    opacity: 0;
    transform: translateY(-50%) rotate(-45deg) translateY(-60%);
    transition:
      transform 700ms ease,
      opacity 300ms ease;
  }

  /* hover: hover : seulement avec une souris (sur cell, le survol resterait collé). */
  @media (hover: hover) {
    &:hover:not(:disabled) {
      scale: 1.02;
      box-shadow: ${({ theme }) => theme.ombres.blocPetit}, 0 0 20px ${voile('cyan')};
    }

    &:hover:not(:disabled)::before {
      opacity: 1;
      transform: translateY(-50%) rotate(-45deg) translateY(0);
    }
  }
`;
