// Responsabilité : connecte mon tour (reçu du serveur) au panneau qui l'affiche, pis à la fenêtre de cible.

import useTour from '@/hooks/tour/useTour.js';
import useCible from '@/hooks/cible/useCible.js';
import { libelleAction } from '@/utils/tour/textesTour.js';
import { consigneCible } from '@/utils/cible/consigneCible.js';
import FenetreCible from '@/components/course/cible/FenetreCible.jsx';
import ControleurDeTourActif from './ControleurDeTourActif.jsx';

// Props : tour, joueur (moi), joueurs (tous), de ({ valeur, roule, surArret }), bloque.
function MonTour({ tour, joueur, joueurs, de, bloque }) {
  const { etape, titreEtape, message, actions, enCours, jouer } = useTour({ tour, joueur, roule: de.roule, bloque });
  const { enAttente, surAction, choisir, annuler } = useCible(tour.actions, jouer);
  const { nom, pouvoir } = joueur.personnage;

  return (
    <>
      <ControleurDeTourActif
        joueur={joueur.nom}
        personnage={joueur.personnage}
        etapeCourante={etape}
        de={de}
        message={message}
        pouvoir={tour.pouvoirActif ? { titre: `Pouvoir : ${nom}`, description: pouvoir } : null}
        titreEtape={titreEtape}
        actions={actions}
        onAction={({ id }) => surAction(id)}
      />

      {enAttente && (
        <FenetreCible
          titre={libelleAction(enAttente, tour)}
          consigne={consigneCible(enAttente.type)}
          cibles={joueurs.filter(({ id }) => enAttente.ciblesPossibles.includes(id))}
          inactif={bloque || enCours}
          onChoisir={choisir}
          onFermer={annuler}
        />
      )}
    </>
  );
}

export default MonTour;
