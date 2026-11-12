/*
 * EtapesPartie.jsx : le fil des étapes avant une partie
 * (1 Configuration → 2 Personnages → 3 Course), affiché en haut des pages.
 *
 * Responsabilité : montrer au joueur où il en est ; l'étape en cours est blanche et en gras,
 * les autres sont en gris, entourées.
 *
 * Props :
 *   etapeCourante : 1 à 3
 */
import { ListeEtapes, Etape, Pastille } from './EtapesPartie.styles.js';

const ETAPES = ['Configuration', 'Personnages', 'Course'];

function EtapesPartie({ etapeCourante }) {
  return (
    <ListeEtapes aria-label="Étapes de la partie">
      {ETAPES.map((libelle, i) => {
        const numero = i + 1;
        const courante = numero === etapeCourante;
        return (
          // aria-current : les lecteurs d'écran annoncent l'étape en cours.
          <Etape key={libelle} $courante={courante} aria-current={courante ? 'step' : undefined}>
            <Pastille $courante={courante}>{numero}</Pastille>
            {libelle}
          </Etape>
        );
      })}
    </ListeEtapes>
  );
}

export default EtapesPartie;
