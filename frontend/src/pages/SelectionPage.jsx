/*
 * SelectionPage.jsx : la page de sélection du personnage (adresse « /selection »),
 * entre la configuration et la course.
 *
 * Responsabilités :
 *   - montrer les personnages dans le carrousel, la carte du centre flottant doucement ;
 *   - relier le choix du personnage (hooks/useChoixPersonnage.js) aux blocs de la page ;
 *   - n'autoriser « Lancer la course » qu'une fois un personnage choisi.
 *
 * Provisoire : on propose ici les 10 personnages et le choix reste dans la page.
 * Plus tard, le serveur fournira les personnages tirés au hasard (joueurs + 2)
 * et l'ordre de choix, et recevra le personnage choisi.
 */
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

// Les personnages, fournis par le service (plus tard : par le serveur).
const PERSONNAGES = obtenirPersonnages();

function SelectionPage() {
  // Le choix du personnage (carte au centre, personnage choisi) : voir hooks/useChoixPersonnage.js.
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

      {/* Le carrousel reçoit la façon d'afficher chaque carte (rendu) et son nom (libelle). */}
      <Carrousel
        elements={PERSONNAGES}
        indexActif={indexActif}
        onChange={changerIndex}
        libelle={(personnage) => personnage.nom}
        rendu={(personnage) => (
          // Seule la carte du centre flotte.
          <CarteFlottante personnage={personnage} format="portrait" $flotte={personnage.id === personnageActif.id}>
            {/* La carte choisie : l'étiquette « Choisi » et une explosion de confettis. */}
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

      {/* Barre du bas : le personnage choisi, et les boutons. */}
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

          {/* Sans personnage choisi, le bouton est grisé et ne mène nulle part. */}
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
