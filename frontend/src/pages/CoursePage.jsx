// Responsabilité : l'écran de course (/course) ; place la piste, les joueurs, le tour pis le journal.
// Utilisé dans : routes

import { useSearchParams } from 'react-router-dom';
import EnTeteCourse from '@/components/course/EnTeteCourse.jsx';
import ListeJoueurs from '@/components/course/joueurs/ListeJoueurs.jsx';
import PanneauPiste from '@/components/course/piste/PanneauPiste.jsx';
import ControleurDeTourActif from '@/components/course/tourActif/ControleurDeTourActif.jsx';
import JournalEvenements from '@/components/course/JournalEvenements.jsx';
import { obtenirPartie } from '@/services/partie.js';
import useJoueursCourse from '@/hooks/useJoueursCourse.js';
import useTourDemo from '@/hooks/tour/useTourDemo.js';
import useJournal from '@/hooks/journal/useJournal.js';
import { Ecran, EnTete, Colonne, Bloc } from './CoursePage.styles.js';

// Va chercher la partie pis donne à chaque bloc ce qu'il affiche.
function CoursePage() {
  // Pour essayer un autre perso : /course?perso=scientifique (ou flipflop, lievre…).
  const [parametres] = useSearchParams();
  const { course, rochers, joueurs, idActif, tour } = obtenirPartie(parametres.get('personnage'));

  // Démo du tour : dé, message, boutons pis choix du joueur (voir hooks/tour/useTourDemo.js).
  const tourDemo = useTourDemo(tour);

  // Les joueurs (positions à jour, couleurs) pis leurs jetons (voir hooks/useJoueursCourse.js).
  const { joueurs: joueursColores, jetons } = useJoueursCourse(joueurs, idActif, tourDemo.pion);

  // Le journal se remplit au fil des événements reçus (voir hooks/journal/useJournal.js).
  const evenements = useJournal(joueurs);

  return (
    <Ecran>
      <EnTete>
        <EnTeteCourse />
      </EnTete>

      <Colonne $cote="gauche">
        <Bloc $taille="remplit">
          <PanneauPiste
            numeroCourse={course.numero}
            nombreCourses={course.nombreCourses}
            jetons={jetons}
            rochers={rochers}
          />
        </Bloc>
        <Bloc $taille="contenu">
          <ListeJoueurs joueurs={joueursColores} idActif={idActif} />
        </Bloc>
      </Colonne>

      <Colonne $cote="droite">
        <Bloc $taille="contenu">
          <ControleurDeTourActif
            joueur={tour.joueur}
            personnage={tour.personnage}
            etapeCourante={tourDemo.etape}
            de={tourDemo.de}
            message={tourDemo.message}
            pouvoir={tourDemo.pouvoir}
            titreEtape={tourDemo.titreEtape}
            actions={tourDemo.actions}
            onAction={tourDemo.surAction}
          />
        </Bloc>
        <Bloc $taille="remplit">
          <JournalEvenements evenements={evenements} />
        </Bloc>
      </Colonne>
    </Ecran>
  );
}

export default CoursePage;
