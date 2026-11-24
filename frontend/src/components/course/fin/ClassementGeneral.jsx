// Responsabilité : le panneau du classement général de la partie.

import Panneau from '@/components/commun/ui/Panneau.jsx';
import { Titre, Ligne, Chiffre, Joueur } from '@/components/commun/ui/Tableau.styles.js';
import { texteNom } from '@/utils/textesJoueur.js';
import { Contenu, TableauPlein, Detail, Points, Explication } from './ClassementGeneral.styles.js';

// « 0 victoire », « 2 victoires ».
const texteVictoires = (nombre) => `${nombre} ${nombre > 1 ? 'victoires' : 'victoire'}`;

// Affiche une ligne par joueur, dans l'ordre du classement.
// Props : numero (de la course finie), joueurs.
function ClassementGeneral({ numero, joueurs }) {
  return (
    <Panneau titre="Classement général" teinte="pointage">
      <Contenu>
        <TableauPlein>
          <thead>
            <tr>
              <Titre $largeur="3.25rem">Rang</Titre>
              <Titre>Joueur</Titre>
              <Titre $largeur="5.25rem" $droite $cacheSurCell>Course {numero}</Titre>
              <Titre $largeur="4.25rem" $droite $cacheSurCell>Étoiles</Titre>
              <Titre $largeur="3.75rem" $droite>Total</Titre>
            </tr>
          </thead>
          <tbody>
            {joueurs.map((joueur) => (
              <Ligne key={joueur.id} $enEvidence={joueur.rang === 1}>
                <Chiffre>{joueur.rang}</Chiffre>
                <Joueur scope="row">
                  {texteNom(joueur)}
                  <Detail>
                    {joueur.personnage.nom} · {texteVictoires(joueur.victoires)}
                  </Detail>
                </Joueur>
                <Points>+{joueur.pointsCourse}</Points>
                <Points>+{joueur.etoiles}</Points>
                <Chiffre $droite>{joueur.total}</Chiffre>
              </Ligne>
            ))}
          </tbody>
        </TableauPlein>

        <Explication>
          Le classement final est la somme de tous les points. En cas d'égalité, le joueur avec le plus de
          premières places gagne ; s'il y a encore égalité, la victoire est partagée.
        </Explication>
      </Contenu>
    </Panneau>
  );
}

export default ClassementGeneral;
