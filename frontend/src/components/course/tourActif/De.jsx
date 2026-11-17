/*
 * De.jsx : un dé à 6 faces en 3D, posé sur un éclat de couleur comme dans le livret.
 *
 * Responsabilités :
 *   - dessiner un cube avec ses 6 faces (points dans une grille 3 × 3) ;
 *   - le tourner pour montrer la face de la valeur reçue ;
 *   - le faire rouler (animation) chaque fois que « lancer » change ;
 *   - prévenir le parent quand il s'arrête, en lui renvoyant la valeur obtenue (onArret).
 *
 * L'animation elle-même est dans styles/animations/roulementDe.js.
 *
 * Inspiration : CodePen « 3D Dice with CSS » de jico (https://codepen.io/jico/pen/wvMpgog),
 * pour l'idée d'un cube CSS en 3D qui roule. Le code a été réécrit pour le projet
 * (nos couleurs, nos faces, notre animation).
 *
 * Props :
 *   valeur : 1 à 6, la face à montrer
 *   lancer : un nombre qui augmente à chaque lancer (0 : pas d'animation, le dé est déjà posé)
 *   onArret : appelé avec la valeur quand le dé a fini de rouler (optionnel)
 */
import { Eclat, Scene, Cube, Face, Emplacement, Point } from './De.styles.js';

// Position des points pour chaque face, dans une grille 3 × 3 (cases numérotées 0 à 8).
const POINTS = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

// Où se trouve chaque face sur le cube (1 devant, 6 derrière, 3 à droite…),
// et comment tourner le cube pour l'amener devant (rx, ry en degrés).
// Deux faces opposées font toujours 7, comme sur un vrai dé.
const FACES = [
  { valeur: 1, place: 'rotateY(0deg)', rx: 0, ry: 0 },
  { valeur: 6, place: 'rotateY(180deg)', rx: 0, ry: 180 },
  { valeur: 3, place: 'rotateY(90deg)', rx: 0, ry: -90 },
  { valeur: 4, place: 'rotateY(-90deg)', rx: 0, ry: 90 },
  { valeur: 2, place: 'rotateX(90deg)', rx: -90, ry: 0 },
  { valeur: 5, place: 'rotateX(-90deg)', rx: 90, ry: 0 },
];

function De({ valeur, lancer = 0, onArret }) {
  const visee = FACES.find((face) => face.valeur === valeur) ?? FACES[0];

  return (
    <Eclat>
      {/* Lu « Dé : 4 » par les lecteurs d'écran, au lieu des 6 faces. */}
      <Scene role="img" aria-label={`Dé : ${valeur}`}>
        {/* key : à chaque nouveau lancer, React recrée le cube, ce qui relance l'animation. */}
        {/* onAnimationEnd : le dé vient de s'arrêter, on renvoie sa valeur au parent. */}
        <Cube
          key={lancer}
          $roule={lancer > 0}
          style={{ '--rx': `${visee.rx}deg`, '--ry': `${visee.ry}deg` }}
          onAnimationEnd={() => onArret?.(valeur)}
        >
          {FACES.map(({ valeur: v, place }) => (
            <Face key={v} style={{ '--place': place }} aria-hidden="true">
              {Array.from({ length: 9 }, (_, i) => (
                <Emplacement key={i}>{POINTS[v].includes(i) && <Point />}</Emplacement>
              ))}
            </Face>
          ))}
        </Cube>
      </Scene>
    </Eclat>
  );
}

export default De;
