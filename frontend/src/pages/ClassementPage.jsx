// Responsabilité : la page du tableau d'honneur (/classement).
// Utilisé dans : routes

import { useState } from 'react';
import EnTetePage from '@/components/commun/ui/EnTetePage.jsx';
import PluieConfettis from '@/components/commun/ui/PluieConfettis.jsx';
import TitreArcEnCiel from '@/components/commun/ui/TitreArcEnCiel.jsx';
import TableauHonneur from '@/components/classement/TableauHonneur.jsx';
import useScores from '@/hooks/classement/useScores.js';
import CHEMINS from '@/chemins.js';
import { Scene, SousTitre, Scores } from './ClassementPage.styles.js';

// Va chercher les scores, pis affiche l'en-tête, le titre, les meilleurs scores pis la pluie de confettis.
function ClassementPage() {
  const [filtre, setFiltre] = useState('tous');
  const { scores, etat, reessayer } = useScores(filtre);

  return (
    <Scene>
      <EnTetePage lien={{ libelle: "Retour à l'accueil", to: CHEMINS.accueil }} />

      <div>
        <TitreArcEnCiel>Tableau d'honneur</TitreArcEnCiel>
        <SousTitre>Les meilleurs scores finaux après les 3 courses, joueurs invités et comptes réunis.</SousTitre>
      </div>

      <Scores>
        <TableauHonneur
          scores={scores}
          etat={etat}
          filtre={filtre}
          onFiltrer={setFiltre}
          onReessayer={reessayer}
        />
      </Scores>

      <PluieConfettis nombre={70} />
    </Scene>
  );
}

export default ClassementPage;
