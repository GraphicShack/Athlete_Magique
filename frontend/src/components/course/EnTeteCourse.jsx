// Responsabilité : l'en-tête de la course (fil d'étapes + « Quitter la partie »).

import EnTetePage from '@/components/commun/ui/EnTetePage.jsx';
import EtapesPartie from '@/components/commun/jeu/EtapesPartie.jsx';
import CHEMINS from '@/chemins.js';
import { Bloc } from './EnTeteCourse.styles.js';

// Affiche l'en-tête commun avec le fil d'étapes pis « Quitter la partie ».
function EnTeteCourse() {
  return (
    <Bloc>
      <EnTetePage lien={{ libelle: 'Quitter la partie', to: CHEMINS.accueil }} actions={<EtapesPartie etapeCourante={3} />} />
    </Bloc>
  );
}

export default EnTeteCourse;
