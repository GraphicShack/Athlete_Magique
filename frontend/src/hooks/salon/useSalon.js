// Responsabilité : donne le salon aux pages, toujours à jour.

import { useSyncExternalStore } from 'react';
import { salonRecu } from '@/services/serveur/salon.js';

// Renvoie le salon (null si aucun), pis estHote : true si l'hôte, c'est moi.
function useSalon() {
  // React relit la boîte pis redessine la page chaque fois qu'elle change.
  const salon = useSyncExternalStore(salonRecu.abonner, salonRecu.lire);
  return salon && { ...salon, estHote: salon.idMoi === salon.idHote };
}

export default useSalon;
