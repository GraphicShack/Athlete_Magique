/*
 * Piste.jsx : le plateau de course, une boucle de 30 cases autour d'une bannière centrale,
 * avec le Départ, l'Arrivée et le podium.
 *
 * Responsabilités :
 *   - placer les 30 cases, le Départ, le podium, la bannière et l'Arrivée ;
 *   - poser chaque jeton sur sa case ;
 *   - rétrécir avec l'écran sans jamais déborder.
 * Affichage seulement : il reçoit l'état à montrer et ne calcule aucune règle.
 *
 * Props :
 *   jetons  : [{ id, position, couleur, initiales, tombe, actif }]
 *             position 0 = Départ, 1 à 30 = cases, plus de 30 = arrivé
 *   rochers : numéros des cases Rocher de la course
 *   etoiles : numéros des cases Étoile (10 et 20 par défaut)
 *   podium  : jetons arrivés, dans l'ordre (1er, 2e)
 */
import CasePiste from './CasePiste.jsx';
import Jeton from './Jeton.jsx';
import { obtenirPiste } from '@/services/regles.js';
import { Plateau, Depart, Jetons, Podium, Marche, Banniere, Titre, Arrivee } from './Piste.styles.js';

// Les chiffres de la piste, fournis par le service.
const PISTE = obtenirPiste();

// [1, 2, 3, …, 30]
const NUMEROS = Array.from({ length: PISTE.nombreCases }, (_, i) => i + 1);

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

  return (
    <Plateau>
      <Depart>
        <span>Départ</span>
        <Jetons>{jetonsSur(0)}</Jetons>
      </Depart>

      {NUMEROS.map((numero) => (
        <CasePiste key={numero} numero={numero} type={typeCase(numero)}>
          {jetonsSur(numero)}
        </CasePiste>
      ))}

      <Podium>
        {['1er', '2e'].map((place, i) => (
          <Marche key={place}>
            <small>{place}</small>
            {podium[i] && <Jeton {...podium[i]} />}
          </Marche>
        ))}
      </Podium>

      <Banniere>
        <Titre>Athlète Magique</Titre>
      </Banniere>

      <Arrivee aria-label="Ligne d'arrivée" />
    </Plateau>
  );
}

export default Piste;
