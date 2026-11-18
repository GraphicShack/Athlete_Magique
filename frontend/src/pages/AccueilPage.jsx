// Responsabilité : place les blocs de l'accueil (accroche + connexion).
// Utilisé dans : routes

import EnTetePage from '@/components/commun/ui/EnTetePage.jsx';
import Accroche from '@/components/accueil/Accroche.jsx';
import ApercuPersonnages from '@/components/accueil/ApercuPersonnages.jsx';
import PanneauConnexion from '@/components/accueil/PanneauConnexion.jsx';
import CHEMINS from '@/chemins.js';
import { Page, Grille, Zone } from './AccueilPage.styles.js';

// Place l'en-tête, l'accroche pis le panneau de connexion.
function AccueilPage() {
  return (
    <Page>
      <EnTetePage logo={false} lien={{ libelle: "Tableau d'honneur", to: CHEMINS.classement }} />

      <Grille>
        <Zone $zone="accroche">
          <Accroche />
        </Zone>
        <Zone $zone="connexion">
          <PanneauConnexion />
        </Zone>
        <Zone $zone="personnages">
          <ApercuPersonnages />
        </Zone>
      </Grille>
    </Page>
  );
}

export default AccueilPage;
