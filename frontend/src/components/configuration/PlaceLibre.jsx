/*
 * PlaceLibre.jsx : une place vide dans la salle d'attente (personne ne l'occupe encore).
 *
 * Responsabilité : montrer qu'on attend un joueur, et proposer « Ajouter un bot » à l'hôte.
 *
 * Props :
 *   numero      : 1 à 4
 *   peutAjouter : true pour afficher « Ajouter un bot » (seul l'hôte peut en ajouter)
 *   onAjouter   : appelé au clic sur « Ajouter un bot »
 */
import { Carte, Texte } from './PlaceLibre.styles.js';
import PetitBouton from '@/components/commun/ui/PetitBouton.jsx';

function PlaceLibre({ numero, peutAjouter = false, onAjouter }) {
  return (
    <Carte>
      <Texte>Place {numero} : en attente d’un joueur…</Texte>
      {peutAjouter && (
        <PetitBouton onClick={onAjouter}>
          Ajouter un bot
        </PetitBouton>
      )}
    </Carte>
  );
}

export default PlaceLibre;
