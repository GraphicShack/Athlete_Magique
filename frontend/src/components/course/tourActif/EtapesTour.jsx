// Responsabilité : les 4 étapes du tour en pastilles, l'étape en cours en évidence.
// Utilisé dans : ControleurDeTourActif

import { ListeEtapes, Etape, Pastille, Libelle } from './EtapesTour.styles.js';

const ETAPES_TOUR = ['Début du tour', 'Lancer du dé', 'Déplacement principal', 'Fin du tour'];

// Statut d'une étape par rapport à l'étape en cours : 'passee', 'courante' ou 'avenir'.
function statutEtape(numero, etapeCourante) {
  if (numero === etapeCourante) return 'courante';
  if (numero < etapeCourante) return 'passee';
  return 'avenir';
}

// Affiche les 4 pastilles ; seul le nom de l'étape en cours est visible.
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
            <Libelle $cache={statut !== 'courante'}>{libelle}</Libelle>
          </Etape>
        );
      })}
    </ListeEtapes>
  );
}

export default EtapesTour;
