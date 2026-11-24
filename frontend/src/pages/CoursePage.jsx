// Responsabilité : la page de course (/course) ; attend la course pis la donne à l'écran.

import EnTeteCourse from '@/components/course/EnTeteCourse.jsx';
import EcranCourse from '@/components/course/EcranCourse.jsx';
import Panneau from '@/components/commun/ui/Panneau.jsx';
import MessageVide from '@/components/commun/ui/MessageVide.jsx';
import { Page } from '@/components/commun/ui/MiseEnPage.js';
import useBoite from '@/hooks/useBoite.js';
import useSuivrePartie from '@/hooks/salon/useSuivrePartie.js';
import { partieRecue } from '@/services/serveur/partie.js';

function CoursePage() {
  const partie = useBoite(partieRecue);
  useSuivrePartie(); // amène à l'écran de fin quand la course est finie

  if (!partie) {
    return (
      <Page>
        <EnTeteCourse />
        <Panneau titre="Tour en cours" teinte="tour">
          <MessageVide role="status">En attente du début de la course.</MessageVide>
        </Panneau>
      </Page>
    );
  }

  // key : une nouvelle course = un nouvel écran (les pions repartent de leur case).
  return <EcranCourse key={partie.course.numero} partie={partie} />;
}

export default CoursePage;
