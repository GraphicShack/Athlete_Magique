// Responsabilité : pendant que mon dé roule, garde l'ancien écran (sinon on dévoile le résultat).

import { useEffect, useState } from 'react';

// Renvoie vue (la partie à montrer) pis de : { valeur (sa face), roule, surArret (à appeler quand il s'arrête) }.
function usePartieAffichee(partie) {
  const [avant, setAvant] = useState(partie); // la dernière partie montrée au complet

  const monTour = partie.idActif === partie.idMoi;
  const memeTour = partie.tour.numero === avant.tour.numero;
  const roule = monTour && memeTour && partie.tour.de.lancers > avant.tour.de.lancers;

  useEffect(() => {
    if (!roule) setAvant(partie);
  }, [partie, roule]);

  return {
    vue: roule ? avant : partie,
    de: { valeur: partie.tour.de.valeur, roule, surArret: () => setAvant(partie) },
  };
}

export default usePartieAffichee;
