// Responsabilité : le panneau du résultat de la course (une carte par joueur, dans l'ordre d'arrivée).
// Utilisé dans : FinCoursePage

import { useTheme } from 'styled-components';
import Panneau from '@/components/commun/ui/Panneau.jsx';
import CarteJoueur from '@/components/course/joueurs/CarteJoueur.jsx';
import { texteNom, textePlace, textePoints } from '@/utils/textesJoueur.js';
import { Resultats } from './ResultatCourse.styles.js';

// Ceux qui n'ont pas franchi la ligne (place null) vont à la fin.
const parPlace = (a, b) => (a.place ?? 99) - (b.place ?? 99);

// Affiche les cartes ; le gagnant est en évidence.
// Props : joueurs.
function ResultatCourse({ joueurs }) {
  const theme = useTheme();

  return (
    <Panneau titre="Résultat de la course" teinte="joueurs">
      <Resultats>
        {[...joueurs].sort(parPlace).map((joueur) => (
          <CarteJoueur
            key={joueur.id}
            rang={joueur.place ?? '–'}
            nom={`${texteNom(joueur)} · ${joueur.personnage.nom}`}
            detail={textePlace(joueur.place)}
            points={(joueur.pointsCourse > 0 ? '+' : '') + textePoints(joueur.pointsCourse)}
            couleur={theme.joueurs[joueur.numero - 1]}
            personnage={joueur.personnage}
            actif={joueur.place === 1}
          />
        ))}
      </Resultats>
    </Panneau>
  );
}

export default ResultatCourse;
