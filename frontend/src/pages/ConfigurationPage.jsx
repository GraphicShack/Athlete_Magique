/*
 * ConfigurationPage.jsx : la salle d'attente de la partie (adresse « /configuration »).
 *
 * C'est un fichier qui connecte : il ne calcule rien et n'affiche rien lui-même, il relie
 *   - services/salon.js         : le salon (code, joueurs, hôte) ;
 *   - hooks/salon/useJoueursSalon : la liste des joueurs (retirer, ajouter un bot) ;
 *   - hooks/salon/usePlacesSalon  : le nombre de places choisi ;
 *   - utils/salon/placesSalon     : les places libres et les choix impossibles ;
 *   - les panneaux, qui affichent.
 *
 *   ┌──────── en-tête, étapes, titre ────────┐
 *   ├──────────────────────┬─────────────────┤
 *   │ les joueurs          │ inviter (code)  │
 *   │ (arrivés + libres)   ├─────────────────┤
 *   │ [Lancer la partie]   │ rejoindre       │
 *   └──────────────────────┴─────────────────┘
 *
 * L'hôte peut régler la partie et la lancer ; les autres attendent.
 * Pour voir la page comme un invité : /configuration?invite
 */
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
import usePlacesSalon from '@/hooks/salon/usePlacesSalon.js';
import { placesLibres, nombresImpossibles } from '@/utils/salon/placesSalon.js';
import CHEMINS from '@/chemins.js';
import { ColonneDroite } from './ConfigurationPage.styles.js';

// Les nombres de places possibles.
const NOMBRES = ['2', '3', '4'];

function ConfigurationPage() {
  const [parametres] = useSearchParams();
  const salon = obtenirSalon(parametres.has('invite'));

  const { joueurs, retirer, ajouterBot } = useJoueursSalon(salon.joueurs);
  const { placesMax, choisirPlaces } = usePlacesSalon(salon.placesMax);

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
          onChoisirPlaces={choisirPlaces}
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
