// Responsabilité : donne le salon aux pages, toujours à jour.

import useBoite from '@/hooks/useBoite.js';
import { salonRecu } from '@/services/serveur/salon.js';

// Renvoie le salon (null si aucun), pis estHote : true si l'hôte, c'est moi.
function useSalon() {
  const salon = useBoite(salonRecu);
  return salon && { ...salon, estHote: salon.idMoi === salon.idHote };
}

export default useSalon;
