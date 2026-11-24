// Responsabilité : la page de choix du perso (/selection) ; attend la sélection pis la donne à l'écran.

import EnTetePage from '@/components/commun/ui/EnTetePage.jsx';
import EtapesPartie from '@/components/commun/jeu/EtapesPartie.jsx';
import Panneau from '@/components/commun/ui/Panneau.jsx';
import MessageVide from '@/components/commun/ui/MessageVide.jsx';
import TitreArcEnCiel from '@/components/commun/ui/TitreArcEnCiel.jsx';
import { Page } from '@/components/commun/ui/MiseEnPage.js';
import EcranSelection from '@/components/selection/EcranSelection.jsx';
import useBoite from '@/hooks/useBoite.js';
import useSuivrePartie from '@/hooks/salon/useSuivrePartie.js';
import { selectionRecue } from '@/services/serveur/selection.js';
import CHEMINS from '@/chemins.js';

function SelectionPage() {
  const selection = useBoite(selectionRecue);
  useSuivrePartie(); // amène à la course quand tout le monde a choisi

  return (
    <Page>
      <EnTetePage lien={{ libelle: 'Quitter la partie', to: CHEMINS.accueil }} />
      <EtapesPartie etapeCourante={2} />
      <TitreArcEnCiel>Choisissez votre personnage</TitreArcEnCiel>

      {selection ? (
        // key : une nouvelle course = un nouvel écran (le carrousel repart du début).
        <EcranSelection key={selection.course.numero} selection={selection} />
      ) : (
        <Panneau titre="Les personnages" teinte="personnages">
          <MessageVide role="status">En attente de la sélection.</MessageVide>
        </Panneau>
      )}
    </Page>
  );
}

export default SelectionPage;
