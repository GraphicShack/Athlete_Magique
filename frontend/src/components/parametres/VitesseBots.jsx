// Responsabilité : le réglage « Vitesse des bots », branché au salon (la vitesse est la même pour tout le monde).

import ChoixSegmente from '@/components/commun/ui/reglages/ChoixSegmente.jsx';
import useSalon from '@/hooks/salon/useSalon.js';
import useDemande from '@/hooks/useDemande.js';
import { changerVitesse } from '@/services/serveur/salon.js';

// Les vitesses (écrites comme le serveur les attend) pis leur nom affiché.
const VITESSES = { lente: 'Lente', normale: 'Normale', rapide: 'Rapide' };
const OPTIONS = Object.keys(VITESSES);

// Seul l'hôte peut la changer.
function VitesseBots() {
  const salon = useSalon();
  const { erreur, faire } = useDemande();

  return (
    <ChoixSegmente
      etiquette="Vitesse des bots"
      description={erreur ?? (salon?.estHote ? 'Pour toute la partie' : 'C’est l’hôte qui choisit')}
      options={OPTIONS}
      libelle={(option) => VITESSES[option]}
      valeur={salon?.vitesseBots ?? 'normale'}
      inactifs={salon?.estHote ? [] : OPTIONS}
      onChange={(vitesse) => faire(() => changerVitesse(vitesse))}
    />
  );
}

export default VitesseBots;
