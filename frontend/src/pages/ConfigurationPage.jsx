// Responsabilité : la salle d'attente (/configuration) ; connecte le salon aux panneaux.
// Utilisé dans : routes

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EnTetePage from '@/components/commun/ui/EnTetePage.jsx';
import EtapesPartie from '@/components/commun/jeu/EtapesPartie.jsx';
import TitreArcEnCiel from '@/components/commun/ui/TitreArcEnCiel.jsx';
import { Page, GrilleDeuxColonnes } from '@/components/commun/ui/MiseEnPage.js';
import PanneauJoueurs from '@/components/configuration/PanneauJoueurs.jsx';
import PanneauCode from '@/components/configuration/PanneauCode.jsx';
import PanneauRejoindre from '@/components/configuration/PanneauRejoindre.jsx';
import BoutonLancer from '@/components/configuration/BoutonLancer.jsx';
import { obtenirSalon } from '@/services/salon.js';
import useJoueursSalon from '@/hooks/salon/useJoueursSalon.js';
import { placesLibres, nombresImpossibles } from '@/utils/salon/placesSalon.js';
import CHEMINS from '@/chemins.js';
import { ColonneDroite } from './ConfigurationPage.styles.js';

// Les nombres de places possibles.
const NOMBRES = [2, 3, 4];

// Va chercher le salon, garde les joueurs pis les places, pis les donne aux panneaux.
function ConfigurationPage() {
  const [parametres] = useSearchParams();
  const salon = obtenirSalon(parametres.has('invite'));

  const { joueurs, retirer, ajouterBot } = useJoueursSalon(salon.joueurs);
  const [placesMax, setPlacesMax] = useState(salon.placesMax); // nb de places choisi par l'hôte

  return (
    <Page>
      <EnTetePage lien={{ libelle: "Retour à l'accueil", to: CHEMINS.accueil }} />
      <EtapesPartie etapeCourante={1} />
      <TitreArcEnCiel>Salle d'attente</TitreArcEnCiel>

      <GrilleDeuxColonnes>
        <PanneauJoueurs
          joueurs={joueurs}
          placesMax={placesMax}
          libres={placesLibres(joueurs.length, placesMax)}
          nombres={NOMBRES}
          impossibles={nombresImpossibles(NOMBRES, joueurs.length)}
          estHote={salon.estHote}
          onChoisirPlaces={setPlacesMax}
          onRetirer={retirer}
          onAjouterBot={ajouterBot}
        >
          <BoutonLancer estHote={salon.estHote} assezDeJoueurs={joueurs.length >= 2} />
        </PanneauJoueurs>
        <ColonneDroite>
          <PanneauCode code={salon.code} />
          <PanneauRejoindre />
        </ColonneDroite>
      </GrilleDeuxColonnes>
    </Page>
  );
}

export default ConfigurationPage;
