/*
 * De.styles.js : l'apparence de De (De.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * De.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';
import { roulement } from '@/styles/animations/roulementDe.js';

// Côté du cube.
const COTE = '3.5rem';

/*
 * Forme d'éclat (étoile à 20 branches) posée derrière le dé, comme dans le livret.
 * On calcule les points d'un polygone : un point loin du centre, puis un point plus proche,
 * et ainsi de suite tout autour du cercle.
 */
function formeEclat(branches = 20) {
  const points = [];
  for (let i = 0; i < branches * 2; i += 1) {
    const angle = (Math.PI * i) / branches;
    const rayon = i % 2 === 0 ? 50 : 42; // en % : pointe, puis creux
    points.push(`${50 + rayon * Math.cos(angle)}% ${50 + rayon * Math.sin(angle)}%`);
  }
  return `polygon(${points.join(', ')})`;
}

// L'éclat bleu derrière le dé. L'étoile est dessinée sur un calque à part (::before) :
// ainsi le cube qui roule n'est pas coupé par la forme de l'étoile.
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
  position: relative; /* au-dessus de l'étoile */
  width: ${COTE};
  height: ${COTE};
  perspective: 18rem;
`;

// Le cube : ses 6 faces gardent leur position en 3D (preserve-3d).
// Il est tourné pour montrer la bonne face (--rx, --ry), et roule si $roule est vrai.
export const Cube = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(var(--rx)) rotateY(var(--ry));
  ${({ $roule }) => $roule && roulement}
`;

// Une face blanche du dé : une grille de 3 × 3 emplacements, placée sur un côté du cube
// (--place), puis avancée d'un demi-côté pour former le cube.
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
  backface-visibility: hidden; /* on ne voit pas une face par l'arrière */
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
