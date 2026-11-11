/*
 * AccueilPage.jsx : la page d'accueil (adresse « / »).
 *
 * Responsabilité : placer les blocs de l'accueil, sans rien afficher elle-même :
 *   - en haut : le logo et le lien vers le tableau d'honneur ;
 *   - à gauche : la présentation du jeu (Accroche) ;
 *   - à droite : la carte pour commencer une partie (PanneauConnexion) ;
 *   - en bas, sur toute la largeur : les 10 personnages (ApercuPersonnages).
 * Sur téléphone, les blocs s'empilent dans cet ordre.
 */
import EnTetePage from '../components/commun/EnTetePage.jsx';
import Accroche from '../components/accueil/Accroche.jsx';
import ApercuPersonnages from '../components/accueil/ApercuPersonnages.jsx';
import PanneauConnexion from '../components/accueil/PanneauConnexion.jsx';
import CHEMINS from '../chemins.js';
import { Page, Grille, Zone } from '../styles/pages/AccueilPage.styles.js';

function AccueilPage() {
  return (
    <Page>
      <EnTetePage lien={{ libelle: "Tableau d'honneur", to: CHEMINS.classement }} />

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
