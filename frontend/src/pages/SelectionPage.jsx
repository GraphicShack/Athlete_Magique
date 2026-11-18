// Responsabilité : la page de choix du perso (/selection), entre la config pis la course.
// Utilisé dans : routes

import EnTetePage from '@/components/commun/ui/EnTetePage.jsx';
import EtapesPartie from '@/components/commun/jeu/EtapesPartie.jsx';
import Carrousel from '@/components/commun/ui/carrousel/Carrousel.jsx';
import Etiquette from '@/components/commun/ui/Etiquette.jsx';
import Confettis from '@/components/commun/ui/Confettis.jsx';
import Bouton from '@/components/commun/ui/Bouton.jsx';
import { obtenirPersonnages } from '@/services/personnages.js';
import useChoixPersonnage from '@/hooks/useChoixPersonnage.js';
import CHEMINS from '@/chemins.js';
import TitreArcEnCiel from '@/components/commun/ui/TitreArcEnCiel.jsx';
import { Page, CarteFlottante, Consigne, Barre, Resume, Actions } from './SelectionPage.styles.js';

// Les persos, fournis par le service (plus tard : par le serveur).
const PERSONNAGES = obtenirPersonnages();

// Affiche le carrousel des persos pis les boutons Choisir / Lancer la course.
function SelectionPage() {
  // Le choix du perso (carte au centre, perso choisi) : voir hooks/useChoixPersonnage.js.
  const { indexActif, changerIndex, idChoisi, personnageActif, choisi, actifEstChoisi, choisirActif } =
    useChoixPersonnage(PERSONNAGES);

  return (
    <Page>
      <EnTetePage lien={{ libelle: 'Retour à la configuration', to: CHEMINS.configuration }} />
      <EtapesPartie etapeCourante={2} />

      <div>
        <TitreArcEnCiel>Choisissez votre personnage</TitreArcEnCiel>
        <Consigne>Glissez, cliquez sur une carte ou utilisez les flèches pour parcourir les personnages.</Consigne>
      </div>

      <Carrousel
        elements={PERSONNAGES}
        indexActif={indexActif}
        onChange={changerIndex}
        libelle={(personnage) => personnage.nom}
        rendu={(personnage) => (
          // Seule la carte du centre flotte.
          <CarteFlottante personnage={personnage} format="portrait" $flotte={personnage.id === personnageActif.id}>
            {personnage.id === idChoisi && (
              <>
                <div>
                  <Etiquette>Choisi</Etiquette>
                </div>
                <Confettis declencheur={idChoisi} />
              </>
            )}
          </CarteFlottante>
        )}
      />

      <Barre>
        <Resume aria-live="polite">
          {choisi ? (
            <>
              Votre personnage : <strong>{choisi.nom}</strong>
            </>
          ) : (
            'Aucun personnage choisi.'
          )}
        </Resume>

        <Actions>
          <Bouton
            variante={actifEstChoisi ? 'secondaire' : 'principal'}
            onClick={choisirActif}
            disabled={actifEstChoisi}
          >
            {actifEstChoisi ? `${personnageActif.nom} choisi` : `Choisir ${personnageActif.nom}`}
          </Bouton>

          {choisi ? (
            <Bouton to={CHEMINS.course}>Lancer la course</Bouton>
          ) : (
            <Bouton variante="secondaire" disabled>
              Lancer la course
            </Bouton>
          )}
        </Actions>
      </Barre>
    </Page>
  );
}

export default SelectionPage;
