/*
 * BoutonLancer.jsx : le bouton du bas de la salle d'attente.
 *
 * Responsabilité : choisir quel bouton montrer :
 *   - l'hôte, avec au moins 2 joueurs : « Lancer la partie » (vers le choix des personnages) ;
 *   - l'hôte, avec moins de 2 joueurs : « Il faut au moins 2 joueurs », grisé ;
 *   - les autres : « En attente de l'hôte… », grisé.
 *
 * Props :
 *   estHote        : true si c'est moi l'hôte
 *   assezDeJoueurs : true s'il y a au moins 2 joueurs
 */
import Bouton from '@/components/commun/ui/Bouton.jsx';
import CHEMINS from '@/chemins.js';

function BoutonLancer({ estHote, assezDeJoueurs }) {
  if (!estHote) return <Bouton disabled>En attente de l’hôte…</Bouton>;
  if (!assezDeJoueurs) return <Bouton disabled>Il faut au moins 2 joueurs</Bouton>;
  return <Bouton to={CHEMINS.selection}>Lancer la partie</Bouton>;
}

export default BoutonLancer;
