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
import styled from 'styled-components';
import EnTetePage from '../commun/EnTetePage.jsx';
import EtapesPartie from '../commun/EtapesPartie.jsx';
import Etiquette from '../commun/Etiquette.jsx';
import CHEMINS from '../../chemins.js';

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

// L'en-tête, puis le fil des étapes dessous (même écart que sur les autres pages).
const Bloc = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espace(6)};
`;

export default EnTeteCourse;
