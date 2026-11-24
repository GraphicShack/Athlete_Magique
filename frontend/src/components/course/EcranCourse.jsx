// Responsabilité : place la piste, les joueurs, le tour pis le journal d'une course.

import { useOutletContext } from 'react-router-dom';
import EnTeteCourse from '@/components/course/EnTeteCourse.jsx';
import ListeJoueurs from '@/components/course/joueurs/ListeJoueurs.jsx';
import PanneauPiste from '@/components/course/piste/PanneauPiste.jsx';
import MonTour from '@/components/course/tourActif/MonTour.jsx';
import AttenteTour from '@/components/course/tourActif/AttenteTour.jsx';
import FenetreDuel from '@/components/course/duel/FenetreDuel.jsx';
import JournalEvenements from '@/components/course/JournalEvenements.jsx';
import usePartieAffichee from '@/hooks/course/usePartieAffichee.js';
import useJoueursCourse from '@/hooks/course/useJoueursCourse.js';
import { lignesJournal } from '@/utils/journal/lignesJournal.js';
import { Ecran, EnTete, Colonne, Bloc } from './EcranCourse.styles.js';

// Donne à chaque bloc ce qu'il affiche.
// Props : partie (reçue du serveur, voir README).
function EcranCourse({ partie }) {
  const { numerosVisibles } = useOutletContext(); // réglage gardé dans App

  const { vue, de } = usePartieAffichee(partie);
  const { joueurs, jetons, enMouvement } = useJoueursCourse(vue.joueurs, vue.idActif);
  const actif = joueurs.find((joueur) => joueur.id === vue.idActif);

  return (
    <Ecran>
      <EnTete>
        <EnTeteCourse />
      </EnTete>

      <Colonne $cote="gauche">
        <Bloc $taille="remplit">
          <PanneauPiste
            numeroCourse={vue.course.numero}
            nombreCourses={vue.course.nombreCourses}
            jetons={jetons}
            rochers={vue.rochers}
            numerosVisibles={numerosVisibles}
          />
        </Bloc>
        <Bloc $taille="contenu">
          <ListeJoueurs joueurs={joueurs} idActif={vue.idActif} />
        </Bloc>
      </Colonne>

      <Colonne $cote="droite">
        <Bloc $taille="contenu">
          {vue.idActif === vue.idMoi ? (
            <MonTour
              tour={vue.tour}
              joueur={actif}
              de={de}
              bloque={de.roule || enMouvement || Boolean(vue.duel)}
            />
          ) : (
            // key : un nouveau joueur = un nouveau panneau (pis un nouveau tirage de la blague).
            <AttenteTour key={actif.id} joueur={actif.nom} bot={actif.bot} personnage={actif.personnage} />
          )}
        </Bloc>
        <Bloc $taille="remplit">
          <JournalEvenements evenements={lignesJournal(vue.journal, joueurs)} />
        </Bloc>
      </Colonne>

      {/* Le duel attend que les pions soient rendus. key : un nouveau duel = une nouvelle fenêtre. */}
      {vue.duel && !enMouvement && <FenetreDuel key={vue.duel.id} duel={vue.duel} joueurs={joueurs} idMoi={vue.idMoi} />}
    </Ecran>
  );
}

export default EcranCourse;
