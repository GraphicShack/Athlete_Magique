/*
 * EtapesTour.jsx : les 4 étapes d'un tour, sur une seule ligne, avec l'étape en cours mise en évidence.
 *
 * Responsabilité : montrer où en est le tour (pastilles passées en gris foncé, étape en cours
 * en noir avec son nom, étapes à venir en gris clair). Pour gagner de la place, seule l'étape
 * en cours affiche son nom ; les autres l'ont en bulle d'aide (survol) et pour les lecteurs d'écran.
 *
 * Props :
 *   etapeCourante : 1 à 4
 */
import { ListeEtapes, Etape, Pastille, Libelle } from './EtapesTour.styles.js';

const ETAPES_TOUR = ['Début du tour', 'Lancer du dé', 'Déplacement principal', 'Fin du tour'];

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
          <Etape
            key={libelle}
            $statut={statut}
            title={libelle}
            aria-current={statut === 'courante' ? 'step' : undefined}
          >
            <Pastille $statut={statut}>{numero}</Pastille>
            {/* Le nom est caché à l'écran, sauf pour l'étape en cours (toujours lu par les lecteurs d'écran). */}
            <Libelle $cache={statut !== 'courante'}>{libelle}</Libelle>
          </Etape>
        );
      })}
    </ListeEtapes>
  );
}

export default EtapesTour;
