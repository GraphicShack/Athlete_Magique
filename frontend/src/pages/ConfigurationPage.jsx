/*
 * ConfigurationPage.jsx : la page de configuration de la partie (adresse « /configuration »).
 *
 * Responsabilité : placer les blocs de la page, sans rien afficher elle-même
 * (disposition commune : voir MiseEnPage.js) :
 *   - en haut : le logo, le retour à l'accueil, le fil des étapes (étape 1) et le titre ;
 *   - à gauche : les joueurs (PanneauJoueurs) ;
 *   - à droite : le résumé de la partie et le bouton suivant (ResumePartie).
 */
import EnTetePage from '../components/commun/EnTetePage.jsx';
import EtapesPartie from '../components/commun/EtapesPartie.jsx';
import TitreArcEnCiel from '../components/commun/TitreArcEnCiel.jsx';
import { Page, GrilleDeuxColonnes } from '../components/commun/MiseEnPage.js';
import PanneauJoueurs from '../components/configuration/PanneauJoueurs.jsx';
import ResumePartie from '../components/configuration/ResumePartie.jsx';
import CHEMINS from '../chemins.js';

function ConfigurationPage() {
  return (
    <Page>
      <EnTetePage lien={{ libelle: "Retour à l'accueil", to: CHEMINS.accueil }} />
      <EtapesPartie etapeCourante={1} />
      <TitreArcEnCiel>Configuration de la partie</TitreArcEnCiel>

      <GrilleDeuxColonnes>
        <PanneauJoueurs />
        <ResumePartie />
      </GrilleDeuxColonnes>
    </Page>
  );
}

export default ConfigurationPage;
