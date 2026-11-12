/*
 * De.jsx : la face d'un dé à 6 faces, posée sur un éclat de couleur comme dans le livret.
 *
 * Responsabilité : dessiner les points de la valeur reçue.
 *
 * Props :
 *   valeur : 1 à 6
 */
import { Eclat, Face, Emplacement, Point } from './De.styles.js';

// Position des points pour chaque face, dans une grille 3 × 3 (cases numérotées 0 à 8).
const POINTS = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

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

export default De;
