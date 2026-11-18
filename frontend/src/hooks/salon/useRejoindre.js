// Responsabilité : garde le code tapé pour rejoindre une partie pis le message à afficher.
// Utilisé dans : PanneauRejoindre

import { useState } from 'react';
import { nettoyerCode } from '@/utils/salon/nettoyerCode.js';
import { LONGUEUR_CODE } from '@/utils/salon/genererCode.js';

// Renvoie le code tapé, s'il est complet, le message, pis les fonctions changer / rejoindre.
function useRejoindre() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState(null);

  // Le joueur tape : on garde la version nettoyée, pis on efface l'ancien message.
  const changer = (texte) => {
    setCode(nettoyerCode(texte));
    setMessage(null);
  };

  // Placeholder : on montre seulement ce qui se passera plus tard.
  const rejoindre = () => setMessage(`Recherche de la partie ${code}… (bientôt disponible)`);

  return { code, changer, complet: code.length === LONGUEUR_CODE, message, rejoindre };
}

export default useRejoindre;
