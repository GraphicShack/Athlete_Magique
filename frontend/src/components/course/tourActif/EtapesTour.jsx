/*
 * EtapesTour.jsx : la liste des 4 étapes d'un tour, avec l'étape en cours mise en évidence.
 *
 * Responsabilité : montrer où en est le tour (étapes passées en gris foncé,
 * étape en cours en noir et en gras, étapes à venir en gris clair).
 *
 * Props :
 *   etapeCourante : 1 à 4
 */
import { ListeEtapes, Etape, Pastille } from './EtapesTour.styles.js';

const ETAPES_TOUR = ['Début du tour', 'Lancer du dé', 'Déplacement principal', 'Fin du déplacement'];

// Statut d'une étape par rapport à l'étape en cours : 'passee', 'courante' ou 'avenir'.
function statutEtape(numero, etapeCourante) {
  if (numero === etapeCourante) return 'courante';
  if (numero < etapeCourante) return 'passee';
  return 'avenir';
}

function EtapesTour({ etapeCourante }) {
  return (
    <ListeEtapes>
      {ETAPES_TOUR.map((libelle, i) => {
        const numero = i + 1;
        const statut = statutEtape(numero, etapeCourante);
        return (
          // aria-current : les lecteurs d'écran annoncent l'étape en cours.
          <Etape key={libelle} $statut={statut} aria-current={statut === 'courante' ? 'step' : undefined}>
            <Pastille $statut={statut}>{numero}</Pastille>
            {libelle}
          </Etape>
        );
      })}
    </ListeEtapes>
  );
}

export default EtapesTour;
