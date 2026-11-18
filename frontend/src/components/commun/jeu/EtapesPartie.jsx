// Responsabilité : le fil des étapes de la partie (Configuration, Personnages, Course).
// Utilisé dans : ConfigurationPage, EnTeteCourse, SelectionPage

import { ListeEtapes, Etape, Pastille } from './EtapesPartie.styles.js';

const ETAPES = ['Configuration', 'Personnages', 'Course'];

// Affiche les 3 étapes, celle en cours en évidence.
// Props : etapeCourante (1, 2 ou 3).
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
