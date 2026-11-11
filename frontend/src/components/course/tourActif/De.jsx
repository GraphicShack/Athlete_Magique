/*
 * De.jsx : la face d'un dé à 6 faces, posée sur un éclat de couleur comme dans le livret.
 *
 * Responsabilité : dessiner les points de la valeur reçue.
 *
 * Props :
 *   valeur : 1 à 6
 */
import styled from 'styled-components';

// Position des points pour chaque face, dans une grille 3 × 3 (cases numérotées 0 à 8).
const POINTS = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

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

function De({ valeur }) {
  return (
    <Eclat>
      {/* Lu « Dé : 4 » par les lecteurs d'écran, au lieu de 9 cases. */}
      <Face role="img" aria-label={`Dé : ${valeur}`}>
        {Array.from({ length: 9 }, (_, i) => (
          <Emplacement key={i}>{POINTS[valeur]?.includes(i) && <Point />}</Emplacement>
        ))}
      </Face>
    </Eclat>
  );
}

// L'éclat bleu, découpé en étoile par clip-path.
const Eclat = styled.div`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 6.5rem;
  height: 6.5rem;
  background: ${({ theme }) => theme.palette.bleu};
  clip-path: ${formeEclat()};
`;

// La face blanche du dé : une grille de 3 × 3 emplacements.
const Face = styled.div`
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
const Emplacement = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Un point noir du dé.
const Point = styled.span`
  width: 70%;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.rayons.rond};
  background: ${({ theme }) => theme.couleurs.encre};
`;

export default De;
