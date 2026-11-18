// Responsabilité : le dé 3D qui roule pis qui renvoie sa valeur quand il s'arrête.
// Utilisé dans : ControleurDeTourActif
// Inspiration : CodePen « 3D Dice with CSS » de jico, https://codepen.io/jico/pen/wvMpgog (code refait pour le projet).

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

// Où se trouve chaque face sur le cube (1 devant, 6 derrière, 3 à droite…), pis comment tourner le cube pour l'amener devant (rx, ry en degrés).
const FACES = [
  { valeur: 1, place: 'rotateY(0deg)', rx: 0, ry: 0 },
  { valeur: 6, place: 'rotateY(180deg)', rx: 0, ry: 180 },
  { valeur: 3, place: 'rotateY(90deg)', rx: 0, ry: -90 },
  { valeur: 4, place: 'rotateY(-90deg)', rx: 0, ry: 90 },
  { valeur: 2, place: 'rotateX(90deg)', rx: -90, ry: 0 },
  { valeur: 5, place: 'rotateX(-90deg)', rx: 90, ry: 0 },
];

// Affiche le dé ; à chaque nouveau lancer, il roule pis appelle onArret(valeur) à la fin.
// Props : valeur (face à montrer, 1 à 6), lancer (augmente à chaque lancer pour relancer l'anim), onArret (reçoit la valeur à la fin).
function De({ valeur, lancer = 0, onArret }) {
  const visee = FACES.find((face) => face.valeur === valeur) ?? FACES[0];

  return (
    <Eclat>
      <Scene role="img" aria-label={`Dé : ${valeur}`}>
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
