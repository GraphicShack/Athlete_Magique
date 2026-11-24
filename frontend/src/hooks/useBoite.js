// Responsabilité : donne le contenu d'une boîte à un composant, toujours à jour.

import { useSyncExternalStore } from 'react';

// React relit la boîte pis redessine le composant chaque fois qu'elle change.
function useBoite(boite) {
  return useSyncExternalStore(boite.abonner, boite.lire);
}

export default useBoite;
