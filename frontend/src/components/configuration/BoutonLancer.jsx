// Responsabilité : choisit le bouton du bas du salon (Lancer, il manque du monde, ou en attente de l'hôte).

import Bouton from '@/components/commun/ui/Bouton.jsx';

// Renvoie le bon bouton ; « Lancer » appelle onLancer.
// Props : estHote, assezDeJoueurs, onLancer.
function BoutonLancer({ estHote, assezDeJoueurs, onLancer }) {
  if (!estHote) return <Bouton disabled>En attente de l’hôte…</Bouton>;
  if (!assezDeJoueurs) return <Bouton disabled>Il faut au moins 2 joueurs</Bouton>;
  return <Bouton onClick={onLancer}>Lancer la partie</Bouton>;
}

export default BoutonLancer;
