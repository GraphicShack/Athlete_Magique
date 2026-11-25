// Responsabilité : le plateau : 30 cases en serpentin sur 4 rangées, du Départ à l'Arrivée.
// Inspiration : le jeu de société « Magical Athlete » (règles, persos, plateau), manuel : https://gamers-hq.de/media/pdf/g0/6d/14/How-to-play-MAGICAL-ATHLETE.pdf

import CasePiste from './CasePiste.jsx';
import Jeton from '@/components/commun/jeu/Jeton.jsx';
import Gains from '@/components/commun/jeu/Gains.jsx';
import { obtenirPiste } from '@/services/regles.js';
import { gainsSurPiste } from '@/utils/piste/gainsSurPiste.js';
import { positionSurPiste, RANG_DEPART, RANG_ARRIVEE } from '@/utils/piste/dispositionPiste.js';
import { Plateau, Depart, Arrivee, Nom, Jetons, PlaceGains } from './Piste.styles.js';

// Les chiffres de la piste, fournis par le service.
const PISTE = obtenirPiste();

// [1, 2, 3, …, 30]
const NUMEROS = Array.from({ length: PISTE.nombreCases }, (_, i) => i + 1);

// Les props de grille ($colonne, $rangee) d'une place du parcours, pour le Départ pis l'Arrivée.
const placeDans = (rang) => {
  const { colonne, rangee } = positionSurPiste(rang);
  return { $colonne: colonne, $rangee: rangee };
};

// Affiche le Départ, les 30 cases pis l'Arrivée, avec les jetons sur leur case pis les points gagnés par-dessus.
function Piste({ jetons = [], rochers = [], gains = [], numerosVisibles = true }) {
  const placesGains = gainsSurPiste(gains, jetons);
  // Une case brille quand on y gagne des points.
  const brille = (numero) => placesGains.some(({ rang }) => rang === numero);

  // Les jetons posés sur une case (ou null s'il n'y en a aucun).
  const jetonsSur = (position) => {
    const presents = jetons.filter((j) => j.position === position);
    return presents.length > 0 ? presents.map((j) => <Jeton key={j.id} {...j} />) : null;
  };

  // Type d'une case selon son numéro.
  const typeCase = (numero) => {
    if (PISTE.casesEtoile.includes(numero)) return 'etoile';
    if (rochers.includes(numero)) return 'rocher';
    return 'normale';
  };

  // Les jetons arrivés : ceux qui ont dépassé la dernière case.
  const arrives = jetons.filter((j) => j.position > PISTE.nombreCases);

  return (
    <Plateau>
      <Depart {...placeDans(RANG_DEPART)}>
        <Nom>Départ</Nom>
        <Jetons>{jetonsSur(0)}</Jetons>
      </Depart>

      {NUMEROS.map((numero) => (
        <CasePiste key={numero} numero={numero} type={typeCase(numero)} numeroVisible={numerosVisibles} brille={brille(numero)}>
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

      {placesGains.map((place) => (
        <PlaceGains key={place.rang} $colonne={place.colonne} $rangee={place.rangee}>
          <Gains gains={place.gains} />
        </PlaceGains>
      ))}
    </Plateau>
  );
}

export default Piste;
