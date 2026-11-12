/*
 * ResumePartie.jsx : le panneau « Résumé » de la page Configuration, qui rappelle en bref
 * comment se déroule une partie, et le bouton pour passer au choix des personnages.
 *
 * Responsabilité : afficher le résumé. Les chiffres (courses, cases, étoiles) viennent
 * des fichiers de données : changer une règle là-bas met ce texte à jour.
 */
import Panneau from '@/components/commun/ui/Panneau.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import { obtenirPointage, obtenirPiste } from '@/services/regles.js';
import { PointsResume, ActionsResume } from '@/components/commun/ui/MiseEnPage.js';
import CHEMINS from '@/chemins.js';

// Les chiffres des règles, fournis par le service.
const POINTAGE = obtenirPointage();
const PISTE = obtenirPiste();

// Un point du résumé : un titre et une explication.
const POINTS_RESUME = [
  {
    titre: `${POINTAGE.length} courses`,
    texte: "Les points de chaque course s'additionnent.",
  },
  {
    titre: '1 personnage par joueur',
    texte: 'À 2 joueurs : 2 personnages chacun, donc 4 pions sur la piste.',
  },
  {
    titre: `Piste de ${PISTE.nombreCases} cases`,
    texte: `Étoiles aux cases ${PISTE.casesEtoile.join(' et ')} (+1 pt). Trois rochers placés au hasard entre les cases 5 et 25.`,
  },
  {
    titre: 'Ordre de jeu',
    texte: 'Tiré au sort avant la première course, puis le joueur qui a le moins de points commence.',
  },
];

function ResumePartie() {
  return (
    <Panneau titre="Résumé" teinte="apercu">
      <PointsResume>
        {POINTS_RESUME.map(({ titre, texte }) => (
          <div key={titre}>
            <dt>{titre}</dt>
            <dd>{texte}</dd>
          </div>
        ))}
      </PointsResume>

      <ActionsResume>
        <Bouton to={CHEMINS.selection}>Choisir les personnages</Bouton>
      </ActionsResume>
    </Panneau>
  );
}

export default ResumePartie;
