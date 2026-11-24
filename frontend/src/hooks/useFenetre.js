// Responsabilité : garde si une fenêtre est ouverte ou fermée.

import { useState } from 'react';

// Renvoie si la fenêtre est ouverte, pis ouvrir / fermer.
function useFenetre() {
  const [ouverte, setOuverte] = useState(false);

  // Ouvre la fenêtre.
  const ouvrir = () => setOuverte(true);
  // Ferme la fenêtre.
  const fermer = () => setOuverte(false);

  return { ouverte, ouvrir, fermer };
}

export default useFenetre;
