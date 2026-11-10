import EnTetePage from '../commun/EnTetePage.jsx';
import Etiquette from '../commun/Etiquette.jsx';
import CHEMINS from '../../chemins.js';

/**
 * Bandeau de l'écran de course : logo, numéro de la course, lien pour quitter.
 * numeroCourse : 1 à 3, ou null avant le début de la partie.
 */
function EnTeteCourse({ numeroCourse = null, nombreCourses = 3 }) {
  return (
    <EnTetePage lien={{ libelle: 'Quitter la partie', to: CHEMINS.accueil }}>
      {numeroCourse && (
        <Etiquette>
          Course {numeroCourse} sur {nombreCourses}
        </Etiquette>
      )}
    </EnTetePage>
  );
}

export default EnTeteCourse;
