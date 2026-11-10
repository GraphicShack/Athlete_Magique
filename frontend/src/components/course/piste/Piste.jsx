import styled from 'styled-components';
import CasePiste from './CasePiste.jsx';
import Jeton from './Jeton.jsx';
import { NOMBRE_CASES, COLONNES, RANGEES } from './dispositionPiste.js';

const NUMEROS = Array.from({ length: NOMBRE_CASES }, (_, i) => i + 1);

/**
 * Le plateau de course : une boucle de 30 cases autour d'une bannière centrale.
 * Composant d'affichage uniquement : il reçoit l'état à montrer et ne calcule aucune règle.
 *
 * jetons : [{ id, position, couleur, initiales, tombe, actif }]
 *          position 0 = Départ, 1 à 30 = cases, plus de 30 = arrivé
 * rochers : numéros des cases Rocher de la course
 * etoiles : numéros des cases Étoile
 * podium  : jetons arrivés, dans l'ordre (1er, 2e)
 */
function Piste({ jetons = [], rochers = [], etoiles = [10, 20], podium = [] }) {
  const jetonsSur = (position) => {
    const presents = jetons.filter((j) => j.position === position);
    return presents.length > 0 ? presents.map((j) => <Jeton key={j.id} {...j} />) : null;
  };

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

// La bordure blanche est tracée à 6 px du bord ; les cases commencent à 14 px,
// et les cases de coin reprennent l'arrondi du plateau moins cet écart (--coin-piste).
const BORDURE_DEBUT = 6;
const BORDURE_EPAISSEUR = 2;
const MARGE_INTERIEURE = 14;

// Le plateau rétrécit avec l'écran au lieu de déborder : les textes et les jetons
// sont dimensionnés en « cqw » (pourcentage de la largeur du plateau).
const Plateau = styled.div`
  /* L'arrondi du plateau diminue sur les petits écrans pour rester proportionnel aux cases. */
  --rayon-piste: clamp(1rem, 3.2vw, ${({ theme }) => theme.rayons.piste});
  --coin-piste: max(calc(var(--rayon-piste) - ${MARGE_INTERIEURE}px), 2px);
  container-type: inline-size;
  display: grid;
  /* minmax(0, 1fr) : toutes les colonnes ont exactement la même largeur,
     même si un contenu (texte « Départ », jetons) voudrait les élargir. */
  grid-template-columns: repeat(${COLONNES}, minmax(0, 1fr));
  grid-template-rows: repeat(${RANGEES}, auto);
  gap: clamp(2px, 0.4vw, 4px);
  padding: ${MARGE_INTERIEURE}px;
  background: ${({ theme }) => theme.piste.fond};
  border-radius: var(--rayon-piste);
  box-shadow: inset 0 0 0 ${BORDURE_DEBUT}px ${({ theme }) => theme.piste.fond},
    inset 0 0 0 ${BORDURE_DEBUT + BORDURE_EPAISSEUR}px ${({ theme }) => theme.piste.contour};
`;

const Depart = styled.div`
  grid-column: 1 / span 3;
  grid-row: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.piste.depart};
  color: ${({ theme }) => theme.piste.departTexte};
  border-radius: var(--coin-piste) ${({ theme }) => theme.rayons.sm}
    ${({ theme }) => theme.rayons.sm} ${({ theme }) => theme.rayons.sm};
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(0.55rem, 2.8cqw, 2.2rem);
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  font-style: italic;
  text-transform: uppercase;
`;

const Jetons = styled.div`
  position: absolute;
  bottom: 4px;
  display: flex;
  gap: 2px;
`;

const Podium = styled.div`
  grid-column: 1 / span 2;
  grid-row: 2 / span 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8%;
  padding: 6%;
`;

const Marche = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  max-height: 3rem;
  padding: 0 8%;
  font-size: clamp(0.5rem, 1.4cqw, 1rem);
  background: ${({ theme }) => theme.piste.etoile};
  border: ${({ theme }) => theme.bordures.lisere};
  border-radius: ${({ theme }) => theme.rayons.md};
  font-family: ${({ theme }) => theme.polices.titre};
  font-weight: ${({ theme }) => theme.graisses.tresForte};
`;

const Banniere = styled.div`
  grid-column: 3 / span 13;
  grid-row: 2 / span 2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4%;
  border: ${({ theme }) => theme.bordures.lisere};
  border-radius: ${({ theme }) => theme.rayons.md};
`;

const Titre = styled.span`
  color: ${({ theme }) => theme.piste.contour};
  font-family: ${({ theme }) => theme.polices.titre};
  font-size: clamp(0.8rem, 5cqw, 3.5rem);
  font-weight: ${({ theme }) => theme.graisses.tresForte};
  letter-spacing: 0.02em;
`;

// Damier noir et blanc, comme une ligne d'arrivée.
const Arrivee = styled.div`
  grid-column: 1;
  grid-row: ${RANGEES};
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.rayons.sm} ${({ theme }) => theme.rayons.sm}
    ${({ theme }) => theme.rayons.sm} var(--coin-piste);
  background: repeating-conic-gradient(
      ${({ theme }) => theme.piste.arrivee} 0% 25%,
      ${({ theme }) => theme.piste.arriveeDamier} 0% 50%
    )
    0 0 / 50% 50%;
`;

export default Piste;
