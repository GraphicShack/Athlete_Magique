// Responsabilité : choisit le bouton du bas du salon (Lancer, il manque du monde, ou en attente de l'hôte).
// Utilisé dans : ConfigurationPage

import Bouton from '@/components/commun/ui/Bouton.jsx';
import CHEMINS from '@/chemins.js';

// Renvoie le bon bouton selon si on est l'hôte pis s'il y a assez de joueurs.
function BoutonLancer({ estHote, assezDeJoueurs }) {
  if (!estHote) return <Bouton disabled>En attente de l’hôte…</Bouton>;
  if (!assezDeJoueurs) return <Bouton disabled>Il faut au moins 2 joueurs</Bouton>;
  return <Bouton to={CHEMINS.selection}>Lancer la partie</Bouton>;
}

export default BoutonLancer;
