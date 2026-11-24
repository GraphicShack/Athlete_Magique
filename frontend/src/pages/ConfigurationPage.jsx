// Responsabilité : la salle d'attente (/configuration) ; connecte le salon aux panneaux.

import EnTetePage from '@/components/commun/ui/EnTetePage.jsx';
import EtapesPartie from '@/components/commun/jeu/EtapesPartie.jsx';
import Panneau from '@/components/commun/ui/Panneau.jsx';
import MessageVide from '@/components/commun/ui/MessageVide.jsx';
import TitreArcEnCiel from '@/components/commun/ui/TitreArcEnCiel.jsx';
import { Page, GrilleDeuxColonnes } from '@/components/commun/ui/MiseEnPage.js';
import PanneauJoueurs from '@/components/configuration/PanneauJoueurs.jsx';
import PanneauCode from '@/components/configuration/PanneauCode.jsx';
import PanneauRejoindre from '@/components/configuration/PanneauRejoindre.jsx';
import BoutonLancer from '@/components/configuration/BoutonLancer.jsx';
import { changerPlaces, ajouterBot, retirerJoueur, lancerPartie } from '@/services/serveur/salon.js';
import useSalon from '@/hooks/salon/useSalon.js';
import useSuivrePartie from '@/hooks/salon/useSuivrePartie.js';
import useDemande from '@/hooks/useDemande.js';
import { placesLibres, nombresImpossibles } from '@/utils/salon/placesSalon.js';
import { pageDuStatut } from '@/utils/salon/pageDuStatut.js';
import CHEMINS from '@/chemins.js';
import { ColonneDroite } from './ConfigurationPage.styles.js';

// Les nombres de places possibles.
const NOMBRES = [2, 3, 4];

// Va chercher le salon pis le donne aux panneaux ; chaque clic est envoyé au serveur.
function ConfigurationPage() {
  const salon = useSalon();
  const { erreur, faire } = useDemande();
  useSuivrePartie(); // amène à la sélection quand la partie est lancée

  return (
    <Page>
      <EnTetePage lien={{ libelle: "Retour à l'accueil", to: CHEMINS.accueil }} />
      <EtapesPartie etapeCourante={1} />
      <TitreArcEnCiel>Salle d'attente</TitreArcEnCiel>

      <GrilleDeuxColonnes>
        {salon ? (
          <PanneauJoueurs
            joueurs={salon.joueurs}
            placesMax={salon.placesMax}
            libres={placesLibres(salon.joueurs.length, salon.placesMax)}
            nombres={NOMBRES}
            impossibles={nombresImpossibles(NOMBRES, salon.joueurs.length)}
            estHote={salon.estHote}
            onChoisirPlaces={(nombre) => faire(() => changerPlaces(nombre))}
            onRetirer={(id) => faire(() => retirerJoueur(id))}
            onAjouterBot={() => faire(ajouterBot)}
          >
            <BoutonLancer
              page={pageDuStatut(salon.statut)}
              estHote={salon.estHote}
              assezDeJoueurs={salon.joueurs.length >= 2}
              onLancer={() => faire(lancerPartie)}
            />
            {erreur && <MessageVide role="alert">{erreur}</MessageVide>}
          </PanneauJoueurs>
        ) : (
          <Panneau titre="Les joueurs" teinte="joueurs" enEvidence>
            <MessageVide role="status">Aucun salon. Entre un code, ou retourne à l'accueil pour créer une partie.</MessageVide>
          </Panneau>
        )}
        <ColonneDroite>
          {salon && <PanneauCode code={salon.code} />}
          <PanneauRejoindre />
        </ColonneDroite>
      </GrilleDeuxColonnes>
    </Page>
  );
}

export default ConfigurationPage;
