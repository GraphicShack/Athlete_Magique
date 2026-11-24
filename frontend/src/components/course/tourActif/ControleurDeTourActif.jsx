// Responsabilité : affiche le panneau du tour (qui joue, étape, dé, message pis les boutons).

import Panneau from '@/components/commun/ui/Panneau.jsx';
import MessageVide from '@/components/commun/ui/MessageVide.jsx';
import De from '@/components/commun/jeu/de/De.jsx';
import EnTeteTour from './EnTeteTour.jsx';
import EtapesTour from './EtapesTour.jsx';
import CasePouvoir from './CasePouvoir.jsx';
import CaseSansPouvoir from './CaseSansPouvoir.jsx';
import { Colonnes, Resultat, PlaceDe } from './ControleurDeTourActif.styles.js';

// Affiche le tour en cours ; un clic sur un bouton est juste renvoyé avec onAction(bouton).
function ControleurDeTourActif({
  joueur,
  personnage,
  etapeCourante = 1,
  de = { valeur: null, lancers: 0 },
  message,
  pouvoir = null,
  titreEtape,
  actions = [],
  onAction = () => {},
}) {
  // Pas encore de perso = la course a pas commencé.
  if (!personnage) {
    return (
      <Panneau enEvidence teinte="tour" titre="Tour en cours">
        <MessageVide>En attente du début de la course.</MessageVide>
      </Panneau>
    );
  }

  // Les 2 cases ont les mêmes props, faque on peut prendre l'une ou l'autre.
  const CaseDuTour = pouvoir ? CasePouvoir : CaseSansPouvoir;

  return (
    <Panneau
      enEvidence
      teinte="tour"
      aria-label="Tour en cours"
      entete={<EnTeteTour personnage={personnage} surTitre={`À toi de jouer, ${joueur}`} />}
    >
      <Colonnes>
        <div>
          <EtapesTour etapeCourante={etapeCourante} />

          <Resultat>
            {de.valeur ? (
              <De valeur={de.valeur} lancer={de.lancers} onArret={de.surArret} />
            ) : (
              <PlaceDe aria-hidden="true" />
            )}
            {message && <p>{message}</p>}
          </Resultat>
        </div>

        <CaseDuTour pouvoir={pouvoir} titre={titreEtape} actions={actions} onAction={onAction} />
      </Colonnes>
    </Panneau>
  );
}

export default ControleurDeTourActif;
