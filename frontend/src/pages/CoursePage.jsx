/*
 * CoursePage.jsx : l'écran de course (adresse « /course »), « la piste au centre de la table ».
 *
 * Responsabilité : placer les blocs de la course, sans rien afficher elle-même.
 *
 *   ┌──────────────────── en-tête ────────────────────┐
 *   │ [joueur] [joueur] [joueur] [joueur]  ← scores   │
 *   ├─────────────────────────────────────────────────┤
 *   │ la piste, sur toute la largeur                  │
 *   ├────────────────────────────┬────────────────────┤
 *   │ tour actif                 │ journal            │  ← même hauteur
 *   └────────────────────────────┴────────────────────┘
 *
 * Sur téléphone, les blocs s'empilent dans le même ordre ; le bandeau des joueurs défile de côté.
 * Les blocs n'ont pas encore de données : ils affichent leur état « en attente ».
 */
import EnTeteCourse from '@/components/course/EnTeteCourse.jsx';
import BandeauJoueurs from '@/components/course/joueurs/BandeauJoueurs.jsx';
import PanneauPiste from '@/components/course/piste/PanneauPiste.jsx';
import ControleurDeTourActif from '@/components/course/tourActif/ControleurDeTourActif.jsx';
import JournalEvenements from '@/components/course/JournalEvenements.jsx';
import { Ecran, Zone } from './CoursePage.styles.js';

function CoursePage() {
  return (
    <Ecran>
      <Zone $zone="entete">
        <EnTeteCourse />
      </Zone>

      <Zone $zone="joueurs">
        <BandeauJoueurs />
      </Zone>

      <Zone $zone="piste">
        <PanneauPiste />
      </Zone>

      <Zone $zone="tour">
        <ControleurDeTourActif />
      </Zone>

      <Zone $zone="journal">
        <JournalEvenements />
      </Zone>
    </Ecran>
  );
}

export default CoursePage;
