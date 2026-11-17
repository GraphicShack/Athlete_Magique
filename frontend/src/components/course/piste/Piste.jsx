/*
 * Piste.jsx : le plateau de course, 30 cases qui serpentent sur 4 rangées de 8,
 * du Départ (en haut à gauche) à l'Arrivée (en bas à gauche).
 *
 * Responsabilités :
 *   - placer le Départ, les 30 cases et l'Arrivée (géométrie : utils/piste/dispositionPiste.js) ;
 *   - poser chaque jeton sur sa case, et les jetons arrivés sur l'Arrivée ;
 *   - rétrécir avec l'écran sans jamais déborder.
 * Affichage seulement : il reçoit l'état à montrer et ne calcule aucune règle.
 *
 * Props :
 *   jetons  : [{ id, position, couleur, initiales, image, tombe, actif }]
 *             position 0 = Départ, 1 à 30 = cases, plus de 30 = arrivé
 *   rochers : numéros des cases Rocher de la course
 *   etoiles : numéros des cases Étoile (10 et 20 par défaut)
 *   podium  : jetons arrivés, dans l'ordre (1er, 2e) ; sinon, les jetons au-delà de la case 30
 */
import CasePiste from './CasePiste.jsx';
import Jeton from '@/components/commun/jeu/Jeton.jsx';
import { obtenirPiste } from '@/services/regles.js';
import { positionSurPiste, RANG_DEPART, RANG_ARRIVEE } from '@/utils/piste/dispositionPiste.js';
import { Plateau, Depart, Arrivee, Nom, Jetons } from './Piste.styles.js';

// Les chiffres de la piste, fournis par le service.
const PISTE = obtenirPiste();

// [1, 2, 3, …, 30]
const NUMEROS = Array.from({ length: PISTE.nombreCases }, (_, i) => i + 1);

// Les props de grille ($colonne, $rangee) d'une place du parcours, pour le Départ et l'Arrivée.
const placeDans = (rang) => {
  const { colonne, rangee } = positionSurPiste(rang);
  return { $colonne: colonne, $rangee: rangee };
};

function Piste({ jetons = [], rochers = [], etoiles = PISTE.casesEtoile, podium = [] }) {
  // Les jetons posés sur une case (ou null s'il n'y en a aucun).
  const jetonsSur = (position) => {
    const presents = jetons.filter((j) => j.position === position);
    return presents.length > 0 ? presents.map((j) => <Jeton key={j.id} {...j} />) : null;
  };

  // Type d'une case selon son numéro.
  const typeCase = (numero) => {
    if (etoiles.includes(numero)) return 'etoile';
    if (rochers.includes(numero)) return 'rocher';
    return 'normale';
  };

  // Les jetons arrivés : le podium s'il est donné, sinon ceux qui ont dépassé la dernière case.
  const arrives = podium.length > 0 ? podium : jetons.filter((j) => j.position > PISTE.nombreCases);

  return (
    <Plateau>
      <Depart {...placeDans(RANG_DEPART)}>
        <Nom>Départ</Nom>
        <Jetons>{jetonsSur(0)}</Jetons>
      </Depart>

      {NUMEROS.map((numero) => (
        <CasePiste key={numero} numero={numero} type={typeCase(numero)}>
          {jetonsSur(numero)}
        </CasePiste>
      ))}

      <Arrivee {...placeDans(RANG_ARRIVEE)} aria-label="Ligne d'arrivée">
        <Nom>Arrivée</Nom>
        {arrives.length > 0 && (
          <Jetons>
            {arrives.map((j) => (
              <Jeton key={j.id} {...j} />
            ))}
          </Jetons>
        )}
      </Arrivee>
    </Plateau>
  );
}

export default Piste;
