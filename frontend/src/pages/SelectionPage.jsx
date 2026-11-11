/*
 * SelectionPage.jsx : la page de sélection du personnage (adresse « /selection »),
 * entre la configuration et la course.
 *
 * Responsabilités :
 *   - montrer les personnages dans le carrousel, la carte du centre flottant doucement ;
 *   - retenir la carte au centre et le personnage choisi ;
 *   - n'autoriser « Lancer la course » qu'une fois un personnage choisi.
 *
 * Provisoire : on propose ici les 10 personnages et le choix reste dans la page.
 * Plus tard, le serveur fournira les personnages tirés au hasard (joueurs + 2)
 * et l'ordre de choix, et recevra le personnage choisi.
 */
import { useState } from 'react';
import EnTetePage from '../components/commun/EnTetePage.jsx';
import EtapesPartie from '../components/commun/EtapesPartie.jsx';
import Carrousel from '../components/commun/carrousel/Carrousel.jsx';
import Etiquette from '../components/commun/Etiquette.jsx';
import Bouton from '../components/commun/Bouton.jsx';
import PERSONNAGES from '../donnees/personnages.js';
import CHEMINS from '../chemins.js';
import TitreArcEnCiel from '../components/commun/TitreArcEnCiel.jsx';
import { Page, CarteFlottante, Consigne, Barre, Resume, Actions } from '../styles/pages/SelectionPage.styles.js';

function SelectionPage() {
  const [indexActif, setIndexActif] = useState(0); // rang de la carte au centre du carrousel
  const [idChoisi, setIdChoisi] = useState(null); // id du personnage choisi (null : aucun)

  // Valeurs déduites de l'état, recalculées à chaque affichage.
  const personnageActif = PERSONNAGES[indexActif];
  const choisi = PERSONNAGES.find((personnage) => personnage.id === idChoisi);
  const actifEstChoisi = personnageActif.id === idChoisi;

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
        onChange={setIndexActif}
        libelle={(personnage) => personnage.nom}
        rendu={(personnage) => (
          // Seule la carte du centre flotte.
          <CarteFlottante personnage={personnage} format="portrait" $flotte={personnage.id === personnageActif.id}>
            {personnage.id === idChoisi && (
              <div>
                <Etiquette>Choisi</Etiquette>
              </div>
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
            onClick={() => setIdChoisi(personnageActif.id)}
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
