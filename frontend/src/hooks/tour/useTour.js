// Responsabilité : prépare mon tour pour l'affichage (étape, message, boutons) pis envoie mes choix.

import { useEffect } from 'react';
import useDemande from '@/hooks/useDemande.js';
import { faireAction } from '@/services/serveur/partie.js';
import { infosEtape, libelleAction, messageTour } from '@/utils/tour/textesTour.js';

// tour : reçu du serveur. joueur : celui qui joue. bloque : true pendant une anim (boutons grisés).
function useTour({ tour, joueur, roule, bloque }) {
  const { enCours, erreur, faire, effacer } = useDemande();
  const { numero, titre } = infosEtape(tour.etape);

  // Le tour a changé (ou le dé roule) : l'ancien refus est plus bon.
  useEffect(effacer, [tour, roule]);

  return {
    etape: numero,
    titreEtape: titre,
    message: erreur ?? messageTour({ tour, joueur, roule }),
    // Le premier bouton est le principal (rouge).
    actions: tour.actions.map((action, rang) => ({
      id: action.type,
      libelle: libelleAction(action, tour),
      principal: rang === 0,
      inactif: bloque || enCours,
    })),
    surAction: ({ id }) => faire(() => faireAction(id)),
  };
}

export default useTour;
