// Responsabilité : garde le nb de places du salon (2, 3 ou 4).
// Utilisé dans : ConfigurationPage

import { useState } from 'react';

// Renvoie le nb de places pis la fonction pour le changer.
function usePlacesSalon(placesDepart) {
  const [placesMax, setPlacesMax] = useState(placesDepart);

  // Change le nb de places.
  const choisirPlaces = (nombre) => setPlacesMax(nombre);

  return { placesMax, choisirPlaces };
}

export default usePlacesSalon;
