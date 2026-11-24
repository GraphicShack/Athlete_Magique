// Responsabilité : remplace le panneau du tour quand c'est pas à moi de jouer.

import Panneau from '@/components/commun/ui/Panneau.jsx';
import Chargement from '@/components/commun/ui/Chargement.js';
import useBlague from '@/hooks/tour/useBlague.js';
import { texteAttente } from '@/utils/tour/texteAttente.js';
import EnTeteTour from './EnTeteTour.jsx';
import { Contenu, Titre } from './AttenteTour.styles.js';

// Affiche qui joue, pis un chargement en attendant.
// Props : joueur (son nom), bot (true = c'est un bot), personnage (le sien).
function AttenteTour({ joueur, bot, personnage }) {
  const blague = useBlague(); // petit troll : rare, pis ça dure 10 secondes

  return (
    <Panneau
      teinte="tour"
      aria-label="Tour en cours"
      entete={<EnTeteTour personnage={personnage} surTitre={`Au tour de ${joueur}`} />}
      enEvidence
    >
      <Contenu role="status">
        <Titre>Patience !</Titre>
        <p>{texteAttente({ joueur, bot, blague })}</p>
        <Chargement />
      </Contenu>
    </Panneau>
  );
}

export default AttenteTour;
