/*
 * useRejoindre.js : hook qui retient le code tapé pour rejoindre une partie.
 *
 * Une seule chose : retenir le code (déjà nettoyé) et le message à afficher après « Rejoindre ».
 * Placeholder : aucune partie n'est vraiment rejointe (il faudra le serveur).
 *
 * Utilisation :
 *   const { code, changer, complet, message, rejoindre } = useRejoindre();
 *   <input value={code} onChange={(e) => changer(e.target.value)} />
 */
import { useState } from 'react';
import { nettoyerCode } from '@/utils/salon/nettoyerCode.js';
import { LONGUEUR_CODE } from '@/utils/salon/genererCode.js';

function useRejoindre() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState(null);

  // Le joueur tape : on garde la version nettoyée, et on efface l'ancien message.
  const changer = (texte) => {
    setCode(nettoyerCode(texte));
    setMessage(null);
  };

  // Placeholder : on montre seulement ce qui se passera plus tard.
  const rejoindre = () => setMessage(`Recherche de la partie ${code}… (bientôt disponible)`);

  return { code, changer, complet: code.length === LONGUEUR_CODE, message, rejoindre };
}

export default useRejoindre;
