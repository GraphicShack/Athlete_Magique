/*
 * PanneauCode.jsx : le panneau « Inviter des amis » de la salle d'attente.
 *
 * Responsabilité : afficher le code de la partie en gros, et un bouton pour le copier.
 *
 * Props :
 *   code : le code de la partie, ex. « KZ4P7Q »
 */
import Panneau from '@/components/commun/ui/Panneau.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import useCopier from '@/hooks/useCopier.js';
import { Code, Lettre, Aide } from './PanneauCode.styles.js';

// Le texte du bouton selon le résultat de la copie.
const LIBELLES = { copie: 'Copié !', erreur: 'Copie impossible' };

function PanneauCode({ code }) {
  const { etat, copier } = useCopier();

  return (
    <Panneau titre="Inviter des amis" teinte="preparation">
      <Aide>Donne ce code à tes amis pour qu’ils rejoignent la partie.</Aide>

      {/* Une case par lettre, comme sur un ticket. Lu « Code : KZ4P7Q » par les lecteurs d'écran. */}
      <Code aria-label={`Code : ${code}`}>
        {[...code].map((lettre, i) => (
          <Lettre key={i} aria-hidden="true">
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
