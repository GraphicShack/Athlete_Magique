// Responsabilité : choisit le bouton du bas du salon (Lancer, il manque du monde, ou en attente de l'hôte).
// Utilisé dans : ConfigurationPage

import Bouton from '@/components/commun/ui/Bouton.jsx';
import CHEMINS from '@/chemins.js';

// Renvoie le bon bouton ; « Lancer » appelle onLancer.
// Props : lancee (true = partie déjà lancée), estHote, assezDeJoueurs, onLancer.
function BoutonLancer({ lancee, estHote, assezDeJoueurs, onLancer }) {
  if (lancee) return <Bouton to={CHEMINS.selection}>Continuer la partie</Bouton>;
  if (!estHote) return <Bouton disabled>En attente de l’hôte…</Bouton>;
  if (!assezDeJoueurs) return <Bouton disabled>Il faut au moins 2 joueurs</Bouton>;
  return <Bouton onClick={onLancer}>Lancer la partie</Bouton>;
}

export default BoutonLancer;
