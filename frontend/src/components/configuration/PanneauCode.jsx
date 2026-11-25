// Responsabilité : affiche le code de la partie en gros avec un bouton pour le copier.

import Panneau from '@/components/commun/ui/Panneau.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import useCopier from '@/hooks/useCopier.js';
import { rythmeFlottement } from '@/styles/animations/flottement.js';
import { Code, Lettre, Aide } from './PanneauCode.styles.js';

// Le texte du bouton selon le résultat de la copie.
const LIBELLES = { copie: 'Copié !', erreur: 'Copie impossible' };

// Affiche le code lettre par lettre pis le bouton Copier.
function PanneauCode({ code }) {
  const { etat, copier } = useCopier();

  return (
    <Panneau titre="Inviter des amis" teinte="preparation">
      <Aide>Donne ce code à tes amis pour qu’ils rejoignent la partie.</Aide>

      <Code aria-label={`Code : ${code}`}>
        {[...code].map((lettre, i) => (
          <Lettre key={i} style={rythmeFlottement(i)} aria-hidden="true">
            {lettre}
          </Lettre>
        ))}
      </Code>

      <Bouton variante="secondaire" onClick={() => copier(code)}>
        {LIBELLES[etat] ?? 'Copier le code'}
      </Bouton>
    </Panneau>
  );
}

export default PanneauCode;
