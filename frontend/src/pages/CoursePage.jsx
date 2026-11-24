// Responsabilité : l'écran de course (/course) ; place la piste, les joueurs, le tour pis le journal.

import { useOutletContext, useSearchParams } from 'react-router-dom';
import EnTeteCourse from '@/components/course/EnTeteCourse.jsx';
import ListeJoueurs from '@/components/course/joueurs/ListeJoueurs.jsx';
import PanneauPiste from '@/components/course/piste/PanneauPiste.jsx';
import ControleurDeTourActif from '@/components/course/tourActif/ControleurDeTourActif.jsx';
import AttenteTour from '@/components/course/tourActif/AttenteTour.jsx';
import JournalEvenements from '@/components/course/JournalEvenements.jsx';
import { obtenirPartie } from '@/services/partie.js';
import useJoueursCourse from '@/hooks/useJoueursCourse.js';
import useTourDemo from '@/hooks/tour/useTourDemo.aRemplacer.js';
import useSuivreFinCourse from '@/hooks/finCourse/useSuivreFinCourse.js';
import useJournal from '@/hooks/journal/useJournal.js';
import { Ecran, EnTete, Colonne, Bloc } from './CoursePage.styles.js';

// Va chercher la partie pis donne à chaque bloc ce qu'il affiche.
function CoursePage() {
  // Pour essayer : /course?personnage=scientifique (ou flipflop, lievre…), ou /course?attente (tour d'un autre), /course?attente=bot (tour d'un bot).
  const [parametres] = useSearchParams();
  const { course, rochers, joueurs, idActif, monTour, tour } = obtenirPartie(
    parametres.get('personnage'),
    parametres.get('attente')
  );

  const { numerosVisibles } = useOutletContext(); // réglage gardé dans App
  useSuivreFinCourse(); // amène à l'écran de fin quand la course est finie

  // Démo du tour : dé, message, boutons pis choix du joueur (voir hooks/tour/useTourDemo.aRemplacer.js).
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
            numerosVisibles={numerosVisibles}
          />
        </Bloc>
        <Bloc $taille="contenu">
          <ListeJoueurs joueurs={joueursColores} idActif={idActif} />
        </Bloc>
      </Colonne>

      <Colonne $cote="droite">
        <Bloc $taille="contenu">
          {monTour ? (
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
          ) : (
            // key : un nouveau joueur = un nouveau panneau (pis un nouveau tirage de la blague).
            <AttenteTour key={tour.idJoueur} joueur={tour.joueur} bot={tour.bot} personnage={tour.personnage} />
          )}
        </Bloc>
        <Bloc $taille="remplit">
          <JournalEvenements evenements={evenements} />
        </Bloc>
      </Colonne>
    </Ecran>
  );
}

export default CoursePage;
