// Responsabilité : connecte mon tour (reçu du serveur) au panneau qui l'affiche.

import useTour from '@/hooks/tour/useTour.js';
import ControleurDeTourActif from './ControleurDeTourActif.jsx';

// Props : tour, joueur (moi), de ({ valeur, roule, surArret }), bloque.
function MonTour({ tour, joueur, de, bloque }) {
  const { etape, titreEtape, message, actions, surAction } = useTour({ tour, joueur, roule: de.roule, bloque });
  const { nom, pouvoir } = joueur.personnage;

  return (
    <ControleurDeTourActif
      joueur={joueur.nom}
      personnage={joueur.personnage}
      etapeCourante={etape}
      de={de}
      message={message}
      pouvoir={tour.pouvoirActif ? { titre: `Pouvoir : ${nom}`, description: pouvoir } : null}
      titreEtape={titreEtape}
      actions={actions}
      onAction={surAction}
    />
  );
}

export default MonTour;
