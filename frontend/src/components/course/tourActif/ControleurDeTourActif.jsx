// Responsabilité : affiche le panneau du tour (qui joue, étape, dé, message pis les boutons).

import Panneau from '@/components/commun/ui/Panneau.jsx';
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
  etapeCourante,
  de,
  message,
  pouvoir,
  titreEtape,
  actions,
  onAction,
}) {
  // On donne les mêmes props aux 2 cases ; chacune prend celles qu'elle a besoin.
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
              <De valeur={de.valeur} roule={de.roule} onArret={de.surArret} />
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
