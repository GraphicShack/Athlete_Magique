/*
 * EnTeteCourse.jsx : le bandeau en haut de l'écran de course.
 *
 * Responsabilité : réutiliser l'en-tête commun (EnTetePage) avec ce qui est propre à la course :
 * le lien « Quitter la partie » et le fil des étapes de la partie (étape 3), comme sur les pages
 * Configuration et Sélection. (Le numéro de la course, lui, est dans le bandeau de la piste.)
 */
import EnTetePage from '@/components/commun/ui/EnTetePage.jsx';
import EtapesPartie from '@/components/commun/jeu/EtapesPartie.jsx';
import CHEMINS from '@/chemins.js';
import { Bloc } from './EnTeteCourse.styles.js';

function EnTeteCourse() {
  return (
    <Bloc>
      {/* Le fil des étapes est sur la même ligne que le logo, à droite, pour gagner de la hauteur. */}
      <EnTetePage lien={{ libelle: 'Quitter la partie', to: CHEMINS.accueil }} actions={<EtapesPartie etapeCourante={3} />} />
    </Bloc>
  );
}

export default EnTeteCourse;
