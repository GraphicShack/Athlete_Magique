/*
 * CoursePage.jsx : l'écran de course (adresse « /course »), « la piste au centre de la table ».
 *
 * Responsabilités :
 *   - placer les blocs de la course, sans rien afficher elle-même ;
 *   - aller chercher l'état de la partie (service partie.js) et le donner à chaque bloc.
 *
 *   ┌──────────────────── en-tête ────────────────────┐
 *   ├────────────────────────────────┬────────────────┤
 *   │ la piste                       │ tour en cours  │
 *   │                                │                │
 *   ├────────────────────────────────┤                │
 *   │ joueurs (2 × 2)                ├────────────────┤
 *   │                                │ journal        │  ← défile à l'intérieur
 *   └────────────────────────────────┴────────────────┘
 *
 * Sur ordinateur, tout tient dans l'écran, sans défilement de la page : les deux colonnes
 * se partagent la hauteur chacune de leur côté. Les joueurs sont toujours tous visibles ;
 * seul le journal (un historique) défile à l'intérieur de son panneau.
 * Sur téléphone, les blocs s'empilent dans l'ordre : en-tête, piste, joueurs, tour, journal.
 * Pour l'instant, la partie est un exemple (data/exemples/partieExemple.js) et l'écran sert à essayer
 * l'affichage. Démo du tour (hook useTourDemo) : les 4 étapes du tour, chacune avec un bouton,
 * ou avec le pouvoir du personnage s'il s'utilise à ce moment.
 * Pour essayer un autre personnage, ajouter ?personnage=… à l'adresse (ex. hypnotiste,
 * scientifique, lievre). Voir data/exemples/deroulementTour.js.
 */
import { useTheme } from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import EnTeteCourse from '@/components/course/EnTeteCourse.jsx';
import ListeJoueurs from '@/components/course/joueurs/ListeJoueurs.jsx';
import PanneauPiste from '@/components/course/piste/PanneauPiste.jsx';
import ControleurDeTourActif from '@/components/course/tourActif/ControleurDeTourActif.jsx';
import JournalEvenements from '@/components/course/JournalEvenements.jsx';
import { obtenirPartie } from '@/services/partie.js';
import { jetonsDesJoueurs } from '@/utils/piste/jetons.js';
import { deplacerJoueur } from '@/utils/piste/deplacerJoueur.js';
import useTourDemo from '@/hooks/tour/useTourDemo.js';
import useJournal from '@/hooks/journal/useJournal.js';
import { Ecran, EnTete, Colonne, Bloc } from './CoursePage.styles.js';

function CoursePage() {
  const theme = useTheme();
  // Pour essayer un autre personnage : /course?personnage=scientifique (ou flipflop, lievre…).
  const [parametres] = useSearchParams();
  const { course, rochers, joueurs, idActif, tour } = obtenirPartie(parametres.get('personnage'));

  // Démo du tour : dé, message, boutons et choix du joueur (voir hooks/tour/useTourDemo.js).
  const tourDemo = useTourDemo(tour);

  // Le joueur actif est posé sur sa case du moment (elle change quand il confirme son déplacement).
  const joueursAJour = deplacerJoueur(joueurs, idActif, tourDemo.position);

  // Chaque joueur reçoit la couleur de son pion, selon sa place dans l'ordre de jeu.
  // La même couleur sert à sa carte et à son jeton sur la piste.
  const joueursColores = joueursAJour.map((joueur, rang) => ({ ...joueur, couleur: theme.joueurs[rang] }));

  // Le journal se remplit au fil des événements reçus (voir hooks/journal/useJournal.js).
  const evenements = useJournal(joueurs);

  return (
    <Ecran>
      <EnTete>
        <EnTeteCourse />
      </EnTete>

      {/* Colonne de gauche : la piste prend la place, les joueurs gardent leur taille. */}
      <Colonne $cote="gauche">
        <Bloc $taille="remplit">
          <PanneauPiste
            numeroCourse={course.numero}
            nombreCourses={course.nombreCourses}
            jetons={jetonsDesJoueurs(joueursColores, idActif)}
            rochers={rochers}
          />
        </Bloc>
        <Bloc $taille="contenu">
          <ListeJoueurs joueurs={joueursColores} idActif={idActif} />
        </Bloc>
      </Colonne>

      {/* Colonne de droite : le tour à sa taille, le journal prend le reste. */}
      <Colonne $cote="droite">
        <Bloc $taille="contenu">
          <ControleurDeTourActif
            joueur={tour.joueur}
            personnage={tour.personnage}
            etapeCourante={tourDemo.etape}
            resultatDe={tourDemo.lancer.valeur}
            lancerDe={tourDemo.lancer.lancers}
            onArretDe={tourDemo.lancer.surArret}
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
