// Responsabilité : l'écran entre les courses, pis après la dernière (/fin-course).

import EnTetePage from '@/components/commun/ui/EnTetePage.jsx';
import Etiquette from '@/components/commun/ui/Etiquette.jsx';
import Panneau from '@/components/commun/ui/Panneau.jsx';
import MessageVide from '@/components/commun/ui/MessageVide.jsx';
import TitreArcEnCiel from '@/components/commun/ui/TitreArcEnCiel.jsx';
import ResultatCourse from '@/components/course/fin/ResultatCourse.jsx';
import ClassementGeneral from '@/components/course/fin/ClassementGeneral.jsx';
import ProchaineCourse from '@/components/course/fin/ProchaineCourse.jsx';
import PartieTerminee from '@/components/course/fin/PartieTerminee.jsx';
import { Page } from '@/components/commun/ui/MiseEnPage.js';
import useFinCourse from '@/hooks/finCourse/useFinCourse.js';
import useSuivrePartie from '@/hooks/salon/useSuivrePartie.js';
import CHEMINS from '@/chemins.js';
import { Ecran, SousTitre, Grille, Suite } from './FinCoursePage.styles.js';

// Va chercher la fin de course pis la donne aux panneaux.
// Pour essayer sans jouer : /fin-course?course=1 (ou 2, 3).
function FinCoursePage() {
  const fin = useFinCourse();
  useSuivrePartie(); // amène à la sélection quand l'hôte continue

  if (!fin) {
    return (
      <Page>
        <EnTetePage lien={{ libelle: "Retour à l'accueil", to: CHEMINS.accueil }} />
        <Panneau titre="Fin de la course">
          <MessageVide role="status">Aucune course terminée pour l'instant.</MessageVide>
        </Panneau>
      </Page>
    );
  }

  const { numero, nombreCourses, joueurs, ordreChoix } = fin;

  return (
    <Ecran>
      <EnTetePage actions={<Etiquette>Course {numero} sur {nombreCourses} terminée</Etiquette>}>
        <TitreArcEnCiel>{`Fin de la course ${numero}`}</TitreArcEnCiel>
      </EnTetePage>

      <SousTitre>
        La course s'arrête dès que 2 personnages ont franchi la ligne d'arrivée. Tous les personnages sont retirés de
        la piste.
      </SousTitre>

      <Grille>
        <ResultatCourse joueurs={joueurs} />
        <ClassementGeneral numero={numero} joueurs={joueurs} />

        <Suite>
          {numero < nombreCourses ? (
            <ProchaineCourse numero={numero} nombreCourses={nombreCourses} ordreChoix={ordreChoix} />
          ) : (
            <PartieTerminee joueurs={joueurs} />
          )}
        </Suite>
      </Grille>
    </Ecran>
  );
}

export default FinCoursePage;
