// Responsabilité : le panneau affiché après la dernière course (gagnant pis bouton Classement).

import Panneau from '@/components/commun/ui/Panneau.jsx';
import ContenuPanneau from '@/components/commun/ui/ContenuPanneau.js';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import { textePoints } from '@/utils/textesJoueur.js';
import CHEMINS from '@/chemins.js';
import { Rangee, Boutons } from './Suite.styles.js';

// Affiche le ou les gagnants (rang 1).
// Props : joueurs.
function PartieTerminee({ joueurs }) {
  const gagnants = joueurs.filter((joueur) => joueur.rang === 1);
  const noms = gagnants.map((joueur) => joueur.nom).join(' et ');
  const verbe = gagnants.length > 1 ? 'se partagent la victoire' : 'gagne la partie';

  return (
    <Panneau titre="Partie terminée" teinte="preparation" enEvidence>
      <Rangee>
        <ContenuPanneau>
          <p>
            Les 3 courses sont terminées. <strong>{noms}</strong> {verbe} avec {textePoints(gagnants[0].total)} !
          </p>
        </ContenuPanneau>
        <Boutons>
          <Bouton to={CHEMINS.classement}>Classement</Bouton>
        </Boutons>
      </Rangee>
    </Panneau>
  );
}

export default PartieTerminee;
