/*
 * EnTeteCourse.jsx : le bandeau en haut de l'écran de course.
 *
 * Responsabilité : réutiliser l'en-tête commun (EnTetePage) avec ce qui est propre à la course :
 * le numéro de la course à côté du logo, le lien « Quitter la partie »,
 * et le fil des étapes de la partie (étape 3), comme sur les pages Configuration et Sélection.
 *
 * Props :
 *   numeroCourse  : 1 à 3, ou null avant le début de la partie (rien n'est affiché)
 *   nombreCourses : 3 par défaut
 */
import EnTetePage from '@/components/commun/ui/EnTetePage.jsx';
import EtapesPartie from '@/components/commun/jeu/EtapesPartie.jsx';
import Etiquette from '@/components/commun/ui/Etiquette.jsx';
import CHEMINS from '@/chemins.js';
import { Bloc } from './EnTeteCourse.styles.js';

function EnTeteCourse({ numeroCourse = null, nombreCourses = 3 }) {
  return (
    <Bloc>
      <EnTetePage lien={{ libelle: 'Quitter la partie', to: CHEMINS.accueil }}>
        {numeroCourse && (
          <Etiquette>
            Course {numeroCourse} sur {nombreCourses}
          </Etiquette>
        )}
      </EnTetePage>
      <EtapesPartie etapeCourante={3} />
    </Bloc>
  );
}

export default EnTeteCourse;
