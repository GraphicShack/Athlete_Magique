// Responsabilité : définir le style de ce composant (styled-components).
// Inspiration : CodePen « 3D Dice with CSS » de jico, https://codepen.io/jico/pen/wvMpgog (code refait pour le projet).

import styled from 'styled-components';
import { roulement } from '@/styles/animations/roulementDe.js';

// Côté du cube.
const COTE = '3.5rem';

// Forme d'éclat (étoile à 20 branches) posée derrière le dé, comme dans le livret.
function formeEclat(branches = 20) {
  const points = [];
  for (let i = 0; i < branches * 2; i += 1) {
    const angle = (Math.PI * i) / branches;
    const rayon = i % 2 === 0 ? 50 : 42; // en % : pointe, puis creux
    points.push(`${50 + rayon * Math.cos(angle)}% ${50 + rayon * Math.sin(angle)}%`);
  }
  return `polygon(${points.join(', ')})`;
}

// L'éclat bleu derrière le dé.
export const Eclat = styled.div`
  position: relative;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 5rem;
  height: 5rem;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.palette.bleu};
    clip-path: ${formeEclat()};
  }
`;

// La « scène » 3D : la perspective donne de la profondeur au cube.
export const Scene = styled.div`
  position: relative;
  width: ${COTE};
  height: ${COTE};
  perspective: 18rem;
`;

// Le cube : ses 6 faces gardent leur position en 3D (preserve-3d).
export const Cube = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(var(--rx)) rotateY(var(--ry));
  ${({ $roule }) => $roule && roulement}
`;

// Une face blanche du dé : une grille de 3 × 3 emplacements, placée sur un côté du cube (--place), puis avancée d'un demi-côté pour former le cube.
export const Face = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  padding: ${({ theme }) => theme.espace(1.5)};
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: ${({ theme }) => theme.couleurs.surface};
  transform: var(--place) translateZ(calc(${COTE} / 2));
  backface-visibility: hidden;
`;

// Un des 9 emplacements, qui contient un point ou reste vide.
export const Emplacement = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Un point noir du dé.
export const Point = styled.span`
  width: 70%;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.rayons.rond};
  background: ${({ theme }) => theme.couleurs.encre};
`;

// La place du dé avant le premier lancer : un rond pointillé de la taille de l'éclat (5rem).
export const PlaceDe = styled.div`
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  border: 0.125rem dashed color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 50%;
`;
