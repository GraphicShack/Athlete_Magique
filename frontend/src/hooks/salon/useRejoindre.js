// Responsabilité : garde le code tapé pour rejoindre une partie pis le message à afficher.
// Utilisé dans : PanneauRejoindre

import { useState } from 'react';
import useDemande from '@/hooks/useDemande.js';
import { rejoindreSalon } from '@/services/serveur/salon.js';
import { nettoyerCode } from '@/utils/salon/nettoyerCode.js';
import { LONGUEUR_CODE } from '@/utils/salon/genererCode.js';

// Renvoie le code tapé, si on peut l'envoyer, le message, pis les fonctions changer / rejoindre.
function useRejoindre() {
  const [code, setCode] = useState('');
  const { enCours, erreur, faire } = useDemande();

  return {
    code,
    changer: (texte) => setCode(nettoyerCode(texte)),
    pret: code.length === LONGUEUR_CODE && !enCours,
    message: enCours ? `Recherche de la partie ${code}…` : erreur,
    rejoindre: () => faire(() => rejoindreSalon(code)),
  };
}

export default useRejoindre;
