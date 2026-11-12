/*
 * ReglesPage.jsx : la page des règles du jeu (adresse « /regles »).
 *
 * Responsabilités :
 *   - placer l'en-tête, l'introduction et toutes les sections des règles (ContenuRegles) ;
 *   - ajouter la mascotte en bas à droite, qui reste visible en bas de l'écran pendant le défilement.
 */
import EnTetePage from '@/components/commun/ui/EnTetePage.jsx';
import ContenuRegles from '@/components/regles/ContenuRegles.jsx';
import MascotteRegles from '@/components/regles/MascotteRegles.jsx';
import CHEMINS from '@/chemins.js';
import TitreArcEnCiel from '@/components/commun/ui/TitreArcEnCiel.jsx';
import { Page, Introduction, EmplacementMascotte, Mascotte } from './ReglesPage.styles.js';

function ReglesPage() {
  return (
    <Page>
      <EnTetePage lien={{ libelle: "Retour à l'accueil", to: CHEMINS.accueil }} />

      <Introduction>
        <TitreArcEnCiel>Règles du jeu</TitreArcEnCiel>
        <p>
          À son tour, chaque joueur lance un dé et fait avancer son personnage. Chaque personnage a un pouvoir
          qui change les règles. Celui qui a le plus de points après 3 courses gagne la partie.
        </p>
      </Introduction>

      <ContenuRegles>
        <EmplacementMascotte>
          <Mascotte>
            <MascotteRegles />
          </Mascotte>
        </EmplacementMascotte>
      </ContenuRegles>
    </Page>
  );
}

export default ReglesPage;
