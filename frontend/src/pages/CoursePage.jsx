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
 * Pour l'instant, la partie est un exemple (data/partieExemple.js) : les boutons du tour
 * ne font rien, l'écran sert à essayer l'affichage.
 */
import { useTheme } from 'styled-components';
import EnTeteCourse from '@/components/course/EnTeteCourse.jsx';
import ListeJoueurs from '@/components/course/joueurs/ListeJoueurs.jsx';
import PanneauPiste from '@/components/course/piste/PanneauPiste.jsx';
import ControleurDeTourActif from '@/components/course/tourActif/ControleurDeTourActif.jsx';
import JournalEvenements from '@/components/course/JournalEvenements.jsx';
import { obtenirPartie } from '@/services/partie.js';
import { jetonsDesJoueurs } from '@/utils/jetons.js';
import { Ecran, EnTete, Colonne, Bloc } from './CoursePage.styles.js';

function CoursePage() {
  const theme = useTheme();
  const { course, rochers, joueurs, idActif, tour, evenements } = obtenirPartie();

  // Chaque joueur reçoit la couleur de son pion, selon sa place dans l'ordre de jeu.
  // La même couleur sert à sa carte et à son jeton sur la piste.
  const joueursColores = joueurs.map((joueur, rang) => ({ ...joueur, couleur: theme.joueurs[rang] }));

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
          {/* onAction absent : les boutons ne font rien pour l'instant (affichage seulement). */}
          <ControleurDeTourActif
            joueur={tour.joueur}
            personnage={tour.personnage}
            etapeCourante={tour.etape}
            resultatDe={tour.resultatDe}
            message={tour.message}
            pouvoir={tour.pouvoir}
            actions={tour.actions}
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
