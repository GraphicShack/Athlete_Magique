// Responsabilité : une ligne du tableau d'honneur (rang, joueur, type, score, date).
// Utilisé dans : TableauHonneur

import Etiquette from '@/components/commun/ui/Etiquette.jsx';
import { texteDate } from '@/utils/classement/texteDate.js';
import { Ligne, Chiffre, Joueur } from '@/components/commun/ui/Tableau.styles.js';
import { Type, Score, DateScore } from './LigneScore.styles.js';

// Le nom affiché de chaque type de joueur.
const TYPES = { compte: 'Compte', invite: 'Invité' };

// Affiche le score d'un joueur ; ma ligne est encadrée.
// Props : rang, pseudo, type ('compte' ou 'invite'), score, date, vous (true = ma ligne).
function LigneScore({ rang, pseudo, type, score, date, vous = false }) {
  return (
    <Ligne $enEvidence={vous}>
      <Chiffre>{rang}</Chiffre>
      <Joueur scope="row">
        {pseudo}
        {vous && ' (vous)'}
      </Joueur>
      <Type>
        <Etiquette>{TYPES[type] ?? type}</Etiquette>
      </Type>
      <Score $droite>{score}</Score>
      <DateScore>{texteDate(date)}</DateScore>
    </Ligne>
  );
}

export default LigneScore;
