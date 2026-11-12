/*
 * De.styles.js : l'apparence de De (De.jsx, dans le même dossier).
 *
 * Responsabilité : définir le style de ce composant (styled-components).
 * De.jsx, lui, s'occupe seulement de ce qui est affiché et de son comportement.
 */
import styled from 'styled-components';

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

// L'éclat bleu, découpé en étoile par clip-path.
export const Eclat = styled.div`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 6.5rem;
  height: 6.5rem;
  background: ${({ theme }) => theme.palette.bleu};
  clip-path: ${formeEclat()};
`;

// La face blanche du dé : une grille de 3 × 3 emplacements.
export const Face = styled.div`
  flex-shrink: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 4.5rem;
  height: 4.5rem;
  padding: ${({ theme }) => theme.espace(2)};
  border: ${({ theme }) => theme.bordures.contour};
  border-radius: ${({ theme }) => theme.rayons.sm};
  background: ${({ theme }) => theme.couleurs.surface};
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
