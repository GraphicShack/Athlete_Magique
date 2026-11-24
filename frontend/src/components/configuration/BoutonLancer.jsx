// Responsabilité : choisit le bouton du bas du salon (Lancer, il manque du monde, ou en attente de l'hôte).

import Bouton from '@/components/commun/ui/Bouton.jsx';

// Renvoie le bon bouton ; « Lancer » appelle onLancer.
// Props : page (où continuer si la partie est déjà lancée), estHote, assezDeJoueurs, onLancer.
function BoutonLancer({ page, estHote, assezDeJoueurs, onLancer }) {
  if (page) return <Bouton to={page}>Continuer la partie</Bouton>;
  if (!estHote) return <Bouton disabled>En attente de l’hôte…</Bouton>;
  if (!assezDeJoueurs) return <Bouton disabled>Il faut au moins 2 joueurs</Bouton>;
  return <Bouton onClick={onLancer}>Lancer la partie</Bouton>;
}

export default BoutonLancer;
