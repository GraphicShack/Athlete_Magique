// Responsabilité : le panneau qui annonce la prochaine course pis permet d'y aller.
// Utilisé dans : FinCoursePage

import { useNavigate } from 'react-router-dom';
import Panneau from '@/components/commun/ui/Panneau.jsx';
import ContenuPanneau from '@/components/commun/ui/ContenuPanneau.js';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import useDemande from '@/hooks/useDemande.js';
import { obtenirPointage } from '@/services/regles.js';
import { courseSuivante } from '@/services/serveur/finCourse.js';
import { textePoints } from '@/utils/textesJoueur.js';
import CHEMINS from '@/chemins.js';
import { Rangee, Boutons } from './Suite.styles.js';

// « Course suivante » le demande au serveur, pis va à la sélection si c'est accepté.
// Props : numero (de la course finie), nombreCourses, ordreChoix (les noms).
function ProchaineCourse({ numero, nombreCourses, ordreChoix }) {
  const { enCours, erreur, faire } = useDemande();
  const naviguer = useNavigate();

  const prochaine = numero + 1;
  const { premiere, deuxieme } = obtenirPointage().find(({ course }) => course === prochaine);

  const continuer = async () => {
    const reussi = await faire(courseSuivante);
    if (reussi) naviguer(CHEMINS.selection, { viewTransition: true });
  };

  return (
    <Panneau titre="Prochaine course" teinte="preparation" enEvidence>
      <Rangee>
        <ContenuPanneau>
          <p>
            Course {prochaine} sur {nombreCourses} : {textePoints(premiere)} pour la 1re place, {textePoints(deuxieme)} pour
            la 2e. De nouveaux personnages sont tirés au sort. Le moins bien classé choisit en premier :{' '}
            {ordreChoix.join(', ')}. Le joueur avec le moins de points joue en premier.
          </p>
          {erreur && <p role="alert">{erreur}</p>}
        </ContenuPanneau>
        <Boutons>
          <Bouton onClick={continuer} disabled={enCours}>
            Course suivante
          </Bouton>
          <Bouton to={CHEMINS.classement} variante="secondaire">
            Voir le tableau d'honneur
          </Bouton>
        </Boutons>
      </Rangee>
    </Panneau>
  );
}

export default ProchaineCourse;
