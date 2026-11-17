/*
 * usePlacesSalon.js : hook qui garde le nombre de places de la salle d'attente (2, 3 ou 4).
 *
 * Une seule chose : retenir le nombre choisi par l'hôte, et le changer.
 *
 * Utilisation :
 *   const { placesMax, choisirPlaces } = usePlacesSalon(salon.placesMax);
 *   choisirPlaces(3);
 */
import { useState } from 'react';

function usePlacesSalon(placesDepart) {
  const [placesMax, setPlacesMax] = useState(placesDepart);

  const choisirPlaces = (nombre) => setPlacesMax(nombre);

  return { placesMax, choisirPlaces };
}

export default usePlacesSalon;
